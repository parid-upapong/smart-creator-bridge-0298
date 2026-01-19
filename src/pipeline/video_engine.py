import cv2
from src.models.subject_detection import SubjectDetector
from src.core.framing_logic import SmartCutter

class AutoFramingEngine:
    """
    Orchestrates the process: 
    Video In -> Detection -> Smoothing -> Cropping -> Video Out
    """
    def __init__(self, model_path='yolov8n.pt', target_ratio=(9, 16)):
        self.detector = SubjectDetector(model_path)
        self.cutter = SmartCutter(target_ratio=target_ratio)

    def process_video(self, input_path, output_path):
        cap = cv2.VideoCapture(input_path)
        fps = cap.get(cv2.CAP_PROP_FPS)
        orig_w = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
        orig_h = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
        
        # Calculate output dimensions
        target_h = orig_h
        target_w = int(target_h * (self.cutter.target_ratio[0] / self.cutter.target_ratio[1]))

        fourcc = cv2.VideoWriter_fourcc(*'mp4v')
        out = cv2.VideoWriter(output_path, fourcc, fps, (target_w, target_h))

        print(f"Starting adaptation: {orig_w}x{orig_h} -> {target_w}x{target_h}")

        frame_count = 0
        while cap.isOpened():
            ret, frame = cap.read()
            if not ret:
                break
            
            # 1. Detect subject (Every N frames to save compute, or every frame for precision)
            # In this implementation, we do every frame for maximum smoothness
            box = self.detector.get_best_bounding_box(frame)
            
            # 2. Calculate smooth crop coordinates
            x1, y1, x2, y2 = self.cutter.get_transform_params(frame, box)
            
            # 3. Perform crop
            cropped_frame = frame[y1:y2, x1:x2]
            
            # 4. Resize to match target exactly (floating point corrections)
            final_frame = cv2.resize(cropped_frame, (target_w, target_h))
            
            out.write(final_frame)
            frame_count += 1
            if frame_count % 30 == 0:
                print(f"Processed {frame_count} frames...")

        cap.release()
        out.release()
        print(f"Adaptation complete: {output_path}")

if __name__ == "__main__":
    # Example Usage
    engine = AutoFramingEngine(target_ratio=(9, 16))
    engine.process_video("input_landscape.mp4", "output_tiktok.mp4")
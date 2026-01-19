import cv2
import numpy as np
from ultralytics import YOLO

class SubjectDetector:
    """
    Identifies the primary subject in a frame using YOLOv8.
    Prioritizes 'person' class for creative content, but can fallback
    to highest confidence objects.
    """
    def __init__(self, model_path='yolov8n.pt'):
        self.model = YOLO(model_path)
        # COCO Classes: 0 is person. We prioritize this for social media content.
        self.priority_class = 0 

    def get_best_bounding_box(self, frame):
        """
        Analyzes a frame and returns the [x1, y1, x2, y2] of the focal point.
        """
        results = self.model(frame, verbose=False)[0]
        boxes = results.boxes.data.cpu().numpy()

        if len(boxes) == 0:
            return None

        # Filter for priority class (person)
        priority_hits = boxes[boxes[:, 5] == self.priority_class]
        
        if len(priority_hits) > 0:
            # Return the largest/most central person
            best_box = priority_hits[0][:4]
        else:
            # Fallback to the most confident detection
            best_box = boxes[0][:4]

        return best_box

    def get_center_point(self, box):
        """Calculates the center (x, y) of a bounding box."""
        x1, y1, x2, y2 = box
        return (x1 + x2) / 2, (y1 + y2) / 2
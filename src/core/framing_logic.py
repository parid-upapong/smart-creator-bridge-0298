import numpy as np
from collections import deque

class SmartCutter:
    """
    Calculates the optimal crop window for a specific aspect ratio.
    Includes smoothing logic to prevent jittery camera movements.
    """
    def __init__(self, target_ratio=(9, 16), smoothing_window=15):
        self.target_ratio = target_ratio
        self.history = deque(maxlen=smoothing_window)

    def calculate_crop_window(self, frame_w, frame_h, focal_x):
        """
        Determines the x_start and x_end for the crop based on focal point.
        """
        target_w = int(frame_h * (self.target_ratio[0] / self.target_ratio[1]))
        
        # If the target width is wider than original (rare for vertical), cap it
        if target_w > frame_w:
            target_w = frame_w

        # Center the target window on the focal_x
        x_start = focal_x - (target_w / 2)
        
        # Constrain to frame boundaries
        if x_start < 0:
            x_start = 0
        if x_start + target_w > frame_w:
            x_start = frame_w - target_w

        return int(x_start), int(x_start + target_w)

    def smooth_focal_point(self, current_x):
        """Applies a moving average to smooth transitions."""
        self.history.append(current_x)
        return sum(self.history) / len(self.history)

    def get_transform_params(self, frame, focal_box):
        h, w = frame.shape[:2]
        
        if focal_box is not None:
            raw_x_center = (focal_box[0] + focal_box[2]) / 2
        else:
            raw_x_center = w / 2 # Default to center if nothing detected

        smoothed_x = self.smooth_focal_point(raw_x_center)
        x1, x2 = self.calculate_crop_window(w, h, smoothed_x)
        
        return x1, 0, x2, h # (x_start, y_start, x_end, y_end)
# Computer Vision Implementation: Auto-Framing & Resizing

## Overview
This module provides the "Brawn" of the Overlord system. It automates the conversion of landscape (16:9) cinematography into vertical (9:16) social-ready content by intelligently tracking subjects.

## Key Features
1. **Dynamic Subject Tracking:** Uses YOLOv8 to identify people and key objects.
2. **Inertial Smoothing:** Implements a rolling window average for the focal point to simulate professional camera panning rather than "robotic" jumps.
3. **Boundary Awareness:** Ensures the crop window never exceeds the physical pixels of the source media.

## Technical Workflow
1. **Detection:** Frame-by-frame inference to find the bounding box of the 'Hero'.
2. **Smoothing:** The `SmartCutter` maintains a history of the subject's X-coordinate.
3. **Geometric Transformation:** Calculates the crop offset relative to the target aspect ratio.
4. **Encoding:** Re-renders the stream using FFmpeg-compatible codecs for immediate platform upload.

## Future Optimization
- **Saliency Maps:** Integrate traditional computer vision saliency to detect "interesting" areas when no specific objects are present.
- **Shot Detection:** Automatically reset the smoothing window on scene cuts to prevent "panning through cuts."
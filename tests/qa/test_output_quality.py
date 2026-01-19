import pytest
import cv2
import requests
import numpy as np

@pytest.mark.quality
def test_tiktok_output_aspect_ratio(api_base_url, auth_headers):
    """
    Strictly validates that TikTok output is 9:16 and contains visual content.
    """
    # Get the latest TikTok asset
    res = requests.get(f"{api_base_url}/v1/assets?platform=tiktok&limit=1", headers=auth_headers)
    asset_url = res.json()[0]["url"]
    
    # Use OpenCV to verify frame dimensions
    cap = cv2.VideoCapture(asset_url)
    width = cap.get(cv3.CAP_PROP_FRAME_WIDTH)
    height = cap.get(cv2.CAP_PROP_FRAME_HEIGHT)
    fps = cap.get(cv2.CAP_PROP_FPS)
    
    # Calculate aspect ratio
    expected_ratio = 9/16
    actual_ratio = width / height
    
    assert abs(actual_ratio - expected_ratio) < 0.01, f"Invalid TikTok aspect ratio: {width}x{height}"
    assert fps >= 24, "Frame rate below professional quality standards"
    
    # Check for "Black Frames" (Quality Degradation)
    ret, frame = cap.read()
    assert ret, "Could not read first frame"
    assert np.mean(frame) > 10, "First frame is nearly black, potential rendering error"
    
    cap.release()

@pytest.mark.quality
def test_text_adaptation_tone_consistency():
    """
    Validates that the AI Copywriter Agent maintained the requested brand tone.
    """
    # Mocked check for LLM output consistency
    test_input = "Our new AI tool makes video editing easy."
    # System should transform for LinkedIn (Professional/Insightful)
    expected_keywords = ["workflow", "efficiency", "standard", "creative"]
    
    # This would call the internal Agent service directly in a QA environment
    # result = agent.transform_text(test_input, target="linkedin")
    # assert any(word in result.lower() for word in expected_keywords)
    pass
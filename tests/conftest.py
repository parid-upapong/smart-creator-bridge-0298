import pytest
import os
import requests
from typing import Generator

@pytest.fixture(scope="session")
def api_base_url():
    return os.getenv("API_URL", "http://localhost:8000")

@pytest.fixture(scope="session")
def auth_headers():
    # In a real scenario, this would perform a login or use a test token
    return {"Authorization": "Bearer test-automated-qa-token"}

@pytest.fixture(scope="function")
def sample_video_path():
    path = "tests/assets/sample_16_9.mp4"
    # Logic to ensure sample file exists or download it
    return path
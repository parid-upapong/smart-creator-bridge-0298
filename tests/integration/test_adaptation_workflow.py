import pytest
import requests
import time

@pytest.mark.integration
def test_end_to_end_adaptation_lifecycle(api_base_url, auth_headers):
    """
    Validates the full lifecycle: Upload -> Process -> Status Check.
    """
    # 1. Initiate Adaptation Request
    payload = {
        "source_url": "https://storage.googleapis.com/overlord-test-assets/master_4k.mp4",
        "targets": ["tiktok", "linkedin_post"],
        "options": {
            "auto_subtitle": True,
            "brand_kit_id": "bk_99"
        }
    }
    
    response = requests.post(f"{api_base_url}/v1/adaptations", json=payload, headers=auth_headers)
    assert response.status_code == 202
    job_id = response.json()["job_id"]

    # 2. Poll for completion (with timeout)
    max_retries = 30
    finished = False
    for _ in range(max_retries):
        status_res = requests.get(f"{api_base_url}/v1/adaptations/{job_id}", headers=auth_headers)
        state = status_res.json()["status"]
        
        if state == "COMPLETED":
            finished = True
            break
        elif state == "FAILED":
            pytest.fail(f"Adaptation job failed: {status_res.json().get('error')}")
        
        time.sleep(10) # Wait for AI processing

    assert finished, "Job timed out before completion"
    
    # 3. Verify Output Assets Metadata
    data = status_res.json()
    assert len(data["outputs"]) == 2
    platforms = [out["platform"] for out in data["outputs"]]
    assert "tiktok" in platforms
    assert "linkedin_post" in platforms
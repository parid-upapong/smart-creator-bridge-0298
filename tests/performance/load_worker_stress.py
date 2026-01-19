import time
from locust import HttpUser, task, between

class ProcessingWorkerStressTest(HttpUser):
    wait_time = between(1, 5)

    @task
    def simulate_heavy_upload(self):
        """
        Simulates multiple users hitting the adaptation endpoint to test 
        the Celery/Redis queue scaling and GPU worker allocation.
        """
        self.client.post("/v1/adaptations", json={
            "source_url": "https://storage.googleapis.com/overlord-test-assets/heavy_4k_test.mp4",
            "targets": ["tiktok", "youtube_shorts", "twitter_video"],
            "options": {"priority": "high"}
        })

    @task(3)
    def check_system_health(self):
        """
        Monitor API responsiveness while workers are busy rendering.
        """
        self.client.get("/health")
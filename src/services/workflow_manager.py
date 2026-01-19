import uuid
from typing import List
from .agents import StrategistAgent, VisionaryAgent

class WorkflowManager:
    """
    Coordinates the transition from raw upload to multi-platform assets.
    Acts as the entry point for the Orchestration Service.
    """
    def __init__(self, db_session, redis_client):
        self.db = db_session
        self.redis = redis_client

    async def initiate_adaptation(self, project_id: str, target_platforms: List[str]):
        # 1. Fetch project metadata
        project = self.db.query(Project).filter(Project.id == project_id).first()
        
        # 2. Invoke Strategist Agent to define the task graph
        strategist = StrategistAgent()
        plan = strategist.create_plan(project.source_url, target_platforms)
        
        # 3. Dispatch tasks to Celery Worker Pool
        job_ids = []
        for task in plan.tasks:
            job = self.redis.enqueue(
                "process_media_task",
                args=(project_id, task.type, task.params),
                retry_count=3
            )
            job_ids.append(job.id)
            
        return {"project_id": project_id, "jobs": job_ids}

    def get_workflow_status(self, job_ids: List[str]):
        # Aggregates status from Redis for the UI progress bar
        return [self.redis.get_status(jid) for jid in job_ids]
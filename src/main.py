from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from typing import List
import uuid

from .tasks.media_tasks import process_adaptation_workflow
from .database.models import JobStatus

app = FastAPI(title="OVERLORD Backend API", version="0.1.0")

# Schemas
class AdaptationRequest(BaseModel):
    project_id: int
    platforms: List[str] # ["TikTok", "YouTube_Shorts"]
    source_url: str

class JobResponse(BaseModel):
    job_id: str
    platform: str
    status: str

@app.get("/health")
def health_check():
    return {"status": "operational", "service": "overlord-core"}

@app.post("/adapt", response_model=List[JobResponse])
def create_adaptation_task(request: AdaptationRequest):
    """
    Main Entry Point: Accepts a source file and triggers multiple 
    asynchronous adaptation pipelines.
    """
    responses = []
    
    for platform in request.platforms:
        # Trigger Celery Task
        task = process_adaptation_workflow.delay(
            project_id=request.project_id,
            platform=platform,
            source_path=request.source_url
        )
        
        responses.append(JobResponse(
            job_id=task.id,
            platform=platform,
            status="PENDING"
        ))
    
    return responses

@app.get("/jobs/{job_id}")
def get_job_status(job_id: str):
    """
    Check the status of a specific adaptation task.
    """
    task_result = process_adaptation_workflow.AsyncResult(job_id)
    
    return {
        "job_id": job_id,
        "status": task_result.status,
        "result": task_result.result if task_result.ready() else None
    }

@app.post("/projects")
def create_project(title: str):
    # Logic to initialize project in DB
    project_id = 101 # Mock ID
    return {"project_id": project_id, "title": title}
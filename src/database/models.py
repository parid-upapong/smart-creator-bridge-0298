from sqlalchemy import Column, Integer, String, JSON, DateTime, ForeignKey, Enum
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.sql import func
import enum

Base = declarative_base()

class JobStatus(enum.Enum):
    PENDING = "pending"
    PROCESSING = "processing"
    COMPLETED = "completed"
    FAILED = "failed"

class Project(Base):
    __tablename__ = "projects"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    source_url = Column(String) # S3 Path
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class AdaptationJob(Base):
    __tablename__ = "adaptation_jobs"
    id = Column(String, primary_key=True) # Celery Task ID
    project_id = Column(Integer, ForeignKey("projects.id"))
    target_platform = Column(String) # e.g., "TikTok", "LinkedIn"
    status = Column(Enum(JobStatus), default=JobStatus.PENDING)
    output_url = Column(String, nullable=True)
    metadata_logs = Column(JSON, nullable=True) # Storage for AI reasoning steps
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
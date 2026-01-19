from pydantic import BaseModel, Field
from typing import List, Optional, Dict

class ContentState(BaseModel):
    """
    The Single Source of Truth for a content transformation job.
    Passed between agents to maintain context.
    """
    job_id: str
    source_url: str
    platforms: List[str]  # e.g., ["tiktok", "linkedin", "youtube_shorts"]
    
    # Analysis results
    transcript: Optional[str] = None
    focal_points: List[Dict[str, float]] = Field(default_factory=list)
    
    # Generated Assets
    assets: Dict[str, str] = Field(default_factory=dict) # platform -> final_url
    
    # Status
    current_step: str = "initiated"
    is_complete: bool = False

    def update_state(self, step_name: str, data: Dict):
        self.current_step = step_name
        for key, value in data.items():
            setattr(self, key, value)
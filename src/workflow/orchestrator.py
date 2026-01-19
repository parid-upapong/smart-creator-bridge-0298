import asyncio
from typing import List
from src.schemas.workflow_state import ContentState

class OverlordOrchestrator:
    """
    The Brain of the operation. Routes the ContentState through 
    various specialized agents.
    """
    def __init__(self, agents: Dict):
        self.agents = agents # Dict of Agent instances

    async def execute_workflow(self, source_url: str, platforms: List[str]):
        # Initialize State
        state = ContentState(
            job_id="job_" + str(hash(source_url)),
            source_url=source_url,
            platforms=platforms
        )

        print(f"[*] Starting Overlord Workflow for Job: {state.job_id}")

        # 1. Parallel Analysis
        analysis_tasks = [
            self.agents['visionary'].analyze(state),
            self.agents['wordsmith'].transcribe(state)
        ]
        await asyncio.gather(*analysis_tasks)

        # 2. Sequential Adaptation per platform
        adaptation_tasks = []
        for platform in platforms:
            adaptation_tasks.append(self.process_platform(state, platform))
        
        await asyncio.gather(*adaptation_tasks)

        state.is_complete = True
        print(f"[!] Workflow Complete. Assets generated: {list(state.assets.keys())}")
        return state

    async def process_platform(self, state: ContentState, platform: str):
        """
        Coordinates the rendering and copywriting for a specific platform.
        """
        print(f"[>] Adapting for {platform}...")
        
        # Call Copywriter for platform-specific text
        copy = await self.agents['wordsmith'].generate_caption(state, platform)
        
        # Call Video Agent for platform-specific crop and render
        asset_url = await self.agents['assembler'].render_variant(state, platform, copy)
        
        state.assets[platform] = asset_url
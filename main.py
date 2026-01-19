import asyncio
from src.workflow.orchestrator import OverlordOrchestrator
from src.agents.copywriter_agent import CopywriterAgent
from src.agents.assembler_agent import AssemblerAgent

# Note: Visionary agent would use the SubjectDetector from the previous step
class MockVisionary:
    async def analyze(self, state):
        state.focal_points = [{"x": 960, "y": 540, "label": "main_subject"}]
        print("[Visionary] Saliency mapping complete.")

async def main():
    # Initialize agents
    agents = {
        'visionary': MockVisionary(),
        'wordsmith': CopywriterAgent(api_key="sk-xxxx"),
        'assembler': AssemblerAgent()
    }

    # Initialize Orchestrator
    orchestrator = OverlordOrchestrator(agents)

    # Run a job
    await orchestrator.execute_workflow(
        source_url="s3://raw-media/master_001.mp4",
        platforms=["tiktok", "linkedin"]
    )

if __name__ == "__main__":
    asyncio.run(main())
# Contributing to OVERLORD

We welcome contributions to expand the capabilities of our AI Agents and platform support.

## Development Standards
1. **Agent Logic:** All new agents must inherit from the `BaseAgent` class and implement the `reason()` and `execute()` methods.
2. **Testing:** Any new media transformation logic must include a visual regression test in `tests/quality/`.
3. **Documentation:** Update the `SITEMAP.md` if adding new UI routes and `ARCHITECTURE_OVERVIEW.md` for infrastructure changes.

## Branching Strategy
- `main`: Production-ready code.
- `staging`: Integration testing for upcoming releases.
- `feature/*`: New platform adapters or agent enhancements.

## Adding a New Platform
To add a new platform (e.g., "Threads"):
1. Add dimensions to `src/config/platforms.json`.
2. Update `CopywriterAgent` with the platform's character limits and hashtag culture.
3. Update `Studio` UI to include the new preview aspect ratio.
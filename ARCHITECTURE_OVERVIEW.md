# OVERLORD: Scalable Media Processing & Workflow Architecture

## 1. Architectural Philosophy
The system follows a **Cloud-Native, Event-Driven Microservices** architecture. Given the heavy computational requirements of AI media processing, we decouple the API (Command) from the Processing (Execution) using a distributed task queue.

## 2. Core Components
- **Edge Gateway:** Handles authentication, rate limiting, and initial file uploads via S3 Presigned URLs.
- **Orchestration Service (The Brain):** Manages the state machine of a content transformation. It knows that a "TikTok Adaptation" requires: `Audio Extraction` -> `Transcription` -> `Subject Tracking` -> `Auto-Crop` -> `Subtitle Burn-in`.
- **Worker Pool (The Brawn):** Independent, auto-scaling GPU/CPU nodes that consume tasks from RabbitMQ/Redis. 
- **Vector Database:** Stores embeddings for "Brand Voice" and "Visual Style" to ensure consistency across adaptations.

## 3. Data Flow (The "Transmutation" Pipeline)
1. **Ingest:** User uploads source media to S3.
2. **Trigger:** S3 Event triggers the `Workflow-Manager`.
3. **Queue:** Tasks are fragmented (e.g., Task A: Extract Audio, Task B: Analyze Visuals).
4. **Execute:** AI Workers pick up tasks, utilizing models like Whisper (Speech-to-Text), SAM (Segment Anything), and GPT-4o (Context/Tone).
5. **Assemble:** A dedicated FFmpeg worker merges AI metadata with raw video.
6. **Deliver:** Final assets are versioned and notified via Webhooks/WebSockets.
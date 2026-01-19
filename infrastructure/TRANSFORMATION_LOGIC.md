# Transformation Logic: Smart-Crop & Tone-Shift

## Visual Adaptation (9:16 Reframe)
To convert 16:9 to 9:16 without losing context:
1. **Identify Saliency:** The AI worker calculates a "Center of Interest" (CoI) for every 10 frames.
2. **Smoothing:** Apply a Kalman filter to the CoI coordinates to prevent "jittery" camera movement.
3. **Crop Window:** Define a 1080x1920 window centered on the filtered CoI.

## Text Adaptation (The "Nuance" Layer)
When adapting a script from YouTube to LinkedIn:
1. **Extraction:** Get raw transcript from Whisper.
2. **Context Injection:** Pass transcript + Brand Guidelines to LLM.
3. **Prompt:** "Rewrite this video transcript as a professional LinkedIn thought-leadership post. Use bullet points. Tone: Authoritative but accessible. Max 1200 characters."
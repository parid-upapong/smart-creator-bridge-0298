/**
 * Temporal.io Workflow Definition
 * Defines the sequence of AI operations for a Video-to-Social adaptation
 */

import { proxyActivities } from '@temporalio/workflow';
import type * as activities from './activities';

const { 
  extractAudio, 
  generateSubtitles, 
  detectVisualSaliency, 
  renderFinalVideo 
} = proxyActivities<typeof activities>({
  startToCloseTimeout: '30 minutes',
});

export async function adaptationWorkflow(sourceUri: string, targetPlatform: 'TIKTOK' | 'LINKEDIN'): Promise<string> {
  // 1. Parallel Processing: Audio and Visual Analysis
  const [audioPath, visualMetadata] = await Promise.all([
    extractAudio(sourceUri),
    detectVisualSaliency(sourceUri)
  ]);

  // 2. Intelligence Layer
  const transcript = await generateSubtitles(audioPath);

  // 3. Platform-Specific Assembly
  const finalAssetUri = await renderFinalVideo({
    sourceUri,
    transcript,
    visualMetadata,
    aspectRatio: targetPlatform === 'TIKTOK' ? '9:16' : '16:9',
    brandKitId: 'default-brand-kit'
  });

  return finalAssetUri;
}
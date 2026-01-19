'use client';

import { useState } from 'react';
import MediaIngestion from '@/components/studio/MediaIngestion';
import AdaptationPanel from '@/components/studio/AdaptationPanel';
import MultiPlatformPreview from '@/components/studio/MultiPlatformPreview';
import { Share2, Save, Play } from 'lucide-react';

export default function StudioPage() {
  const [hasMedia, setHasMedia] = useState(false);
  const [processingStatus, setProcessingStatus] = useState('idle'); // idle, processing, ready

  return (
    <div className="flex flex-col h-full">
      {/* Studio Header */}
      <header className="h-16 border-b border-zinc-800 flex items-center justify-between px-6 bg-zinc-950/50 backdrop-blur-sm z-10">
        <div className="flex items-center gap-4">
          <h1 className="text-sm font-medium text-zinc-400">Project /</h1>
          <span className="font-semibold text-zinc-100">Product Launch Reveal 2024</span>
          {processingStatus === 'processing' && (
            <div className="ml-4 px-2 py-0.5 rounded bg-violet-500/10 text-violet-400 text-[10px] uppercase tracking-widest font-bold ai-processing border border-violet-500/20">
              AI Transmuting...
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 text-zinc-400 hover:text-zinc-200 text-sm font-medium transition-colors">
            <Save size={16} /> Save Draft
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white text-sm font-bold rounded-lg transition-all shadow-lg shadow-violet-600/20">
            <Share2 size={16} /> Export Assets
          </button>
        </div>
      </header>

      {/* Main Studio Workspace */}
      <div className="flex-1 studio-grid h-full overflow-hidden">
        {/* Left: Adaptation Controls */}
        <div className="border-r border-zinc-800 p-6 overflow-y-auto">
          <AdaptationPanel 
            onStartProcess={() => setProcessingStatus('processing')} 
            isActive={hasMedia} 
          />
        </div>

        {/* Center: Live Multi-View Preview */}
        <div className="bg-black/40 relative overflow-hidden">
          {!hasMedia ? (
            <MediaIngestion onUpload={() => {
              setHasMedia(true);
              setProcessingStatus('ready');
            }} />
          ) : (
            <MultiPlatformPreview status={processingStatus} />
          )}
        </div>

        {/* Right: AI Timeline & Context */}
        <div className="border-l border-zinc-800 p-6 overflow-y-auto bg-zinc-950/30">
          <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-6">AI Agent Insights</h3>
          
          <div className="space-y-6">
            <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800">
              <div className="flex items-center gap-2 text-sm font-medium text-violet-400 mb-2">
                <Play size={14} fill="currentColor" /> Focal Point Detection
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Subject detected: "Tech Speaker". Auto-crop tracking active with 94% confidence.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800">
              <div className="flex items-center gap-2 text-sm font-medium text-emerald-400 mb-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500" /> Sentiment Analysis
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Tone: Inspirational/Professional. Suggested TikTok Music: "Ambient Tech Corporate".
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
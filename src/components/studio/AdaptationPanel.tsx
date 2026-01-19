'use client';

import { Checkbox, Smartphone, Send, Twitter, Linkedin, Instagram } from 'lucide-react';

const platforms = [
  { id: 'tiktok', name: 'TikTok', icon: Smartphone, size: '9:16' },
  { id: 'instagram', name: 'Reels', icon: Instagram, size: '9:16' },
  { id: 'linkedin', name: 'LinkedIn', icon: Linkedin, size: '4:5' },
  { id: 'twitter', name: 'Twitter (X)', icon: Send, size: '16:9' },
];

export default function AdaptationPanel({ isActive, onStartProcess }: { isActive: boolean, onStartProcess: () => void }) {
  return (
    <div className={`space-y-8 ${!isActive ? 'opacity-40 pointer-events-none' : ''}`}>
      <div>
        <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest block mb-4">Target Platforms</label>
        <div className="space-y-2">
          {platforms.map((p) => (
            <div key={p.id} className="flex items-center justify-between p-3 rounded-xl bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 cursor-pointer transition-colors group">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-zinc-800 text-zinc-400 group-hover:text-violet-400">
                  <p.icon size={18} />
                </div>
                <div>
                  <div className="text-sm font-medium">{p.name}</div>
                  <div className="text-[10px] text-zinc-500">{p.size} Aspect Ratio</div>
                </div>
              </div>
              <input type="checkbox" defaultChecked className="rounded border-zinc-700 bg-zinc-800 text-violet-600 focus:ring-violet-500" />
            </div>
          ))}
        </div>
      </div>

      <div>
        <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest block mb-4">AI Features</label>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-5 bg-violet-600 rounded-full relative">
              <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full" />
            </div>
            <span className="text-sm font-medium">Smart Auto-Reframe</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-5 bg-violet-600 rounded-full relative">
              <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full" />
            </div>
            <span className="text-sm font-medium">AI Subtitles (Multi-lang)</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-5 bg-zinc-800 rounded-full relative">
              <div className="absolute left-1 top-1 w-3 h-3 bg-zinc-600 rounded-full" />
            </div>
            <span className="text-sm font-medium text-zinc-500">Auto-Broll Injections</span>
          </div>
        </div>
      </div>

      <button 
        onClick={onStartProcess}
        className="w-full py-4 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white rounded-xl font-bold shadow-xl shadow-violet-900/20 transition-all flex items-center justify-center gap-2"
      >
        Run Adaptation Engine
      </button>
    </div>
  );
}
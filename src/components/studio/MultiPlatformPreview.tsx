'use client';

import { Smartphone, Monitor, Instagram, Youtube } from 'lucide-react';
import { motion } from 'framer-motion';

export default function MultiPlatformPreview({ status }: { status: string }) {
  return (
    <div className="h-full flex flex-col p-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex gap-2 p-1 bg-zinc-900 rounded-lg border border-zinc-800">
          <button className="px-3 py-1.5 bg-zinc-800 rounded-md text-xs font-bold shadow-sm">Multi-View</button>
          <button className="px-3 py-1.5 text-zinc-500 text-xs font-bold">Focus Mode</button>
        </div>
        <div className="flex items-center gap-4 text-zinc-500">
          <div className="flex items-center gap-2 text-xs">
            <div className="w-2 h-2 rounded-full bg-emerald-500" /> Platform Sync: Active
          </div>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-8 items-center justify-items-center overflow-y-auto pb-10">
        {/* TikTok/Reels Preview */}
        <div className="flex flex-col items-center gap-4">
          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">TikTok / Reels (9:16)</span>
          <div className="w-[220px] h-[390px] bg-zinc-900 rounded-[2.5rem] border-[6px] border-zinc-800 relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-60">
              {status === 'processing' && <div className="absolute inset-0 bg-violet-900/20 backdrop-blur-[2px] ai-processing" />}
            </div>
            {/* Mock Subtitles */}
            <div className="absolute bottom-16 left-4 right-4 text-center">
              <span className="bg-yellow-400 text-black px-1 font-black text-sm uppercase italic">This is the new future</span>
            </div>
          </div>
        </div>

        {/* Instagram/LinkedIn Square Preview */}
        <div className="flex flex-col items-center gap-4">
          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Post (1:1 / 4:5)</span>
          <div className="w-[300px] h-[300px] bg-zinc-900 rounded-2xl border border-zinc-800 relative overflow-hidden shadow-2xl">
             <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-80" />
             {status === 'processing' && <div className="absolute inset-0 bg-violet-900/20 backdrop-blur-[2px] ai-processing" />}
          </div>
        </div>

        {/* YouTube / Twitter Preview */}
        <div className="flex flex-col items-center gap-4">
          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">YouTube / X (16:9)</span>
          <div className="w-[320px] h-[180px] bg-zinc-900 rounded-xl border border-zinc-800 relative overflow-hidden shadow-2xl">
             <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center" />
             {status === 'processing' && <div className="absolute inset-0 bg-violet-900/20 backdrop-blur-[2px] ai-processing" />}
          </div>
        </div>
      </div>
    </div>
  );
}
'use client';

import { Upload, Cloud, Link as LinkIcon, Youtube } from 'lucide-react';
import { motion } from 'framer-motion';

export default function MediaIngestion({ onUpload }: { onUpload: () => void }) {
  return (
    <div className="h-full flex flex-col items-center justify-center p-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-xl w-full text-center"
      >
        <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-white to-zinc-500 bg-clip-text text-transparent">
          Start your transformation.
        </h2>
        <p className="text-zinc-500 mb-10">
          Upload your high-fidelity source content. Our AI agents will deconstruct and adapt it for every platform.
        </p>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <button 
            onClick={onUpload}
            className="group p-8 rounded-2xl border-2 border-dashed border-zinc-800 hover:border-violet-500/50 hover:bg-violet-500/5 transition-all flex flex-col items-center gap-4"
          >
            <div className="p-4 rounded-full bg-zinc-900 group-hover:bg-violet-500/20 text-zinc-400 group-hover:text-violet-400 transition-colors">
              <Upload size={32} />
            </div>
            <span className="font-semibold text-sm">Local Upload</span>
          </button>

          <button className="group p-8 rounded-2xl border-2 border-dashed border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900 transition-all flex flex-col items-center gap-4">
            <div className="p-4 rounded-full bg-zinc-900 text-zinc-400 group-hover:text-white transition-colors">
              <Cloud size={32} />
            </div>
            <span className="font-semibold text-sm">Cloud Import</span>
          </button>
        </div>

        <div className="relative flex items-center gap-4">
          <div className="flex-1 h-[1px] bg-zinc-800" />
          <span className="text-xs font-bold text-zinc-600 uppercase tracking-widest">or paste url</span>
          <div className="flex-1 h-[1px] bg-zinc-800" />
        </div>

        <div className="mt-8 flex gap-2 p-2 bg-zinc-900 rounded-xl border border-zinc-800">
          <div className="pl-3 flex items-center text-zinc-500">
            <LinkIcon size={18} />
          </div>
          <input 
            type="text" 
            placeholder="YouTube, Vimeo, or Google Drive link..."
            className="flex-1 bg-transparent border-none focus:ring-0 text-sm text-zinc-200 py-3"
          />
          <button className="px-6 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-lg text-sm font-bold transition-colors">
            Fetch
          </button>
        </div>
      </motion.div>
    </div>
  );
}
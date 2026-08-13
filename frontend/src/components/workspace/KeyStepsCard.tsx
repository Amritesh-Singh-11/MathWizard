import React from 'react';
import { CheckCircle2, ListTree } from 'lucide-react';

interface KeyStepsCardProps {
  steps: string[];
}

export const KeyStepsCard: React.FC<KeyStepsCardProps> = ({ steps }) => {
  if (!steps || steps.length === 0) return null;

  return (
    <div className="glass-panel rounded-2xl p-6 shadow-xl border border-slate-800/80 space-y-4">
      <div className="flex items-center space-x-2 border-b border-slate-800/80 pb-3">
        <div className="p-1 rounded bg-violet-500/10 text-violet-400">
          <ListTree className="w-4 h-4" />
        </div>
        <h3 className="text-sm font-bold uppercase tracking-wider text-violet-300">
          Key Steps Section
        </h3>
      </div>

      <div className="space-y-2.5">
        {steps.map((step, idx) => (
          <div
            key={idx}
            className="flex items-start space-x-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-slate-700/80 transition-all"
          >
            <div className="mt-0.5 p-0.5 rounded-full bg-emerald-500/10 text-emerald-400 flex-shrink-0">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div className="text-xs font-mono text-slate-200 leading-relaxed">
              {step}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

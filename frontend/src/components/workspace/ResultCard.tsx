import React from 'react';
import { MathRender } from '../common/MathRender';
import { CheckCircle, Copy } from 'lucide-react';

interface ResultCardProps {
  topicName: string;
  inputExpression: string;
  answer: string;
  latexAnswer?: string;
}

export const ResultCard: React.FC<ResultCardProps> = ({
  topicName,
  inputExpression,
  answer,
  latexAnswer,
}) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(answer);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="glass-panel rounded-2xl p-6 shadow-xl border border-cyan-500/30 bg-gradient-to-b from-cyan-950/20 to-slate-900/60 space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
        <div className="flex items-center space-x-2">
          <div className="p-1 rounded bg-cyan-500/10 text-cyan-400">
            <CheckCircle className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-cyan-300">
            Result Section
          </h3>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center space-x-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition-colors"
        >
          <Copy className="w-3 h-3 text-cyan-400" />
          <span>{copied ? 'Copied!' : 'Copy Result'}</span>
        </button>
      </div>

      <div className="space-y-3">
        {/* Solve Summary */}
        <div className="text-xs text-slate-400 font-mono">
          <span className="text-slate-500 font-semibold uppercase mr-2">Solve:</span>
          <span className="text-slate-200 bg-slate-900/80 px-2.5 py-1 rounded border border-slate-800">
            {topicName}: {inputExpression || 'x^2 + 5*x'}
          </span>
        </div>

        {/* Result Box */}
        <div className="p-4 rounded-xl bg-slate-950/90 border border-cyan-500/40 shadow-inner space-y-2">
          <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-widest block">
            Result:
          </span>

          {latexAnswer ? (
            <div className="text-lg md:text-xl font-mono text-cyan-300 overflow-x-auto py-1">
              <MathRender latex={latexAnswer} displayMode={true} />
            </div>
          ) : (
            <pre className="text-sm md:text-base font-mono text-cyan-300 whitespace-pre-wrap">
              {answer}
            </pre>
          )}
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import Plot from 'react-plotly.js';

interface TaylorSeriesGraphProps {
  data: {
    x: number[];
    yExact: number[];
    approximations?: Array<{ termCount: number; y: number[]; formula: string }>;
    exprStr?: string;
  };
  title?: string;
}

export const TaylorSeriesGraph: React.FC<TaylorSeriesGraphProps> = ({ data, title = 'Taylor Series Polynomial Convergence' }) => {
  const { x, yExact, approximations = [], exprStr = 'f(x)' } = data;
  const [termIndex, setTermIndex] = useState<number>(approximations.length > 0 ? approximations.length - 1 : 0);

  const currentApprox = approximations[termIndex] || {
    termCount: 4,
    y: yExact,
    formula: 'P_4(x)',
  };

  return (
    <div className="w-full flex flex-col space-y-3 bg-slate-950/90 p-4 rounded-xl border border-slate-800">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold font-mono text-cyan-300">
          {title} | Terms n = {currentApprox.termCount}
        </span>
        <span className="text-xs font-mono text-violet-400 bg-violet-500/10 px-2.5 py-1 rounded border border-violet-500/20">
          {currentApprox.formula}
        </span>
      </div>

      <div className="w-full h-72 rounded-lg overflow-hidden bg-slate-900 border border-slate-800">
        <Plot
          data={[
            {
              x: x,
              y: yExact,
              type: 'scatter',
              mode: 'lines',
              name: `Exact f(x) = ${exprStr}`,
              line: { color: '#00f2fe', width: 2.5 },
            },
            {
              x: x,
              y: currentApprox.y,
              type: 'scatter',
              mode: 'lines',
              name: `Taylor P_${currentApprox.termCount}(x)`,
              line: { color: '#a855f7', width: 2.5, dash: 'dash' },
            },
          ]}
          layout={{
            paper_bgcolor: 'rgba(0,0,0,0)',
            plot_bgcolor: 'rgba(15, 23, 42, 0.6)',
            font: { color: '#94a3b8', family: 'Inter, sans-serif' },
            margin: { l: 40, r: 20, t: 30, b: 40 },
            xaxis: { title: 'x', gridcolor: 'rgba(255,255,255,0.06)' },
            yaxis: { title: 'y', gridcolor: 'rgba(255,255,255,0.06)' },
            autosize: true,
          }}
          useResizeHandler={true}
          className="w-full h-full"
          config={{ responsive: true, displayModeBar: false }}
        />
      </div>

      {/* Term Count Slider */}
      <div className="flex items-center justify-between bg-slate-900/80 px-4 py-2.5 rounded-lg border border-slate-800 text-xs">
        <span className="text-slate-300 font-mono">Number of Terms (n):</span>
        <div className="flex items-center space-x-3 w-2/3">
          <input
            type="range"
            min="0"
            max={Math.max(0, approximations.length - 1)}
            value={termIndex}
            onChange={(e) => setTermIndex(parseInt(e.target.value))}
            className="w-full accent-violet-400"
          />
          <span className="text-violet-300 font-mono font-bold w-12 text-right">n = {currentApprox.termCount}</span>
        </div>
      </div>
    </div>
  );
};

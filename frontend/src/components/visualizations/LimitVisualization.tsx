import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import { Play, Pause, RotateCcw, SkipForward, SkipBack } from 'lucide-react';

interface LimitVisualizationProps {
  data?: {
    x?: number[];
    y?: number[];
    limitPoint?: number;
    limitValue?: number;
    exprStr?: string;
  };
  title?: string;
}

export const LimitVisualization: React.FC<LimitVisualizationProps> = ({ data = {}, title = 'Limit Approach Animation' }) => {
  const x = Array.isArray(data.x) && data.x.length > 0 ? data.x : [-3, -2, -1, 0, 1, 2, 3];
  const y = Array.isArray(data.y) && data.y.length > 0 ? data.y : [-1, 0, 1, 2, 3, 4, 5];
  const limitPoint = data.limitPoint ?? 2;
  const limitValue = data.limitValue ?? 4;
  const exprStr = data.exprStr || 'f(x)';

  const [delta, setDelta] = useState<number>(1.5);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  useEffect(() => {
    let timer: any;
    if (isPlaying) {
      timer = setInterval(() => {
        setDelta((prev) => (prev <= 0.05 ? 1.5 : prev - 0.03));
      }, 50);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  const xl = limitPoint - delta;
  const xr = limitPoint + delta;

  const fEval = (val: number) => {
    if (!x || !y || x.length === 0 || y.length === 0) return limitValue;
    const idx = x.findIndex((v) => v >= val);
    if (idx !== -1 && y[idx] !== undefined && !isNaN(y[idx])) {
      return y[idx];
    }
    return limitValue;
  };

  const yl = fEval(xl);
  const yr = fEval(xr);

  return (
    <div className="w-full flex flex-col space-y-3 bg-slate-950/90 p-4 rounded-xl border border-slate-800">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold font-mono text-cyan-300">
          {title}: lim (x → {limitPoint}) {exprStr} = {limitValue}
        </span>
        <span className="text-[11px] font-mono text-slate-400">
          δ = {delta.toFixed(3)} | x_L = {xl.toFixed(3)}, x_R = {xr.toFixed(3)}
        </span>
      </div>

      <div className="w-full h-72 rounded-lg overflow-hidden bg-slate-900 border border-slate-800">
        <Plot
          data={[
            {
              x: x,
              y: y,
              type: 'scatter',
              mode: 'lines',
              name: `f(x) = ${exprStr}`,
              line: { color: '#00f2fe', width: 2.5 },
            },
            {
              x: [limitPoint],
              y: [limitValue],
              type: 'scatter',
              mode: 'markers',
              name: `Limit Point (${limitPoint}, ${limitValue})`,
              marker: { color: '#ff007f', size: 10, symbol: 'circle-open' },
            },
            {
              x: [xl],
              y: [yl],
              type: 'scatter',
              mode: 'markers+text',
              name: 'Left Approach (x → a⁻)',
              marker: { color: '#00ff88', size: 9 },
              text: ['x → a⁻'],
              textposition: 'top left',
            },
            {
              x: [xr],
              y: [yr],
              type: 'scatter',
              mode: 'markers+text',
              name: 'Right Approach (x → a⁺)',
              marker: { color: '#a855f7', size: 9 },
              text: ['x → a⁺'],
              textposition: 'top right',
            },
          ]}
          layout={{
            paper_bgcolor: 'rgba(0,0,0,0)',
            plot_bgcolor: 'rgba(15, 23, 42, 0.6)',
            font: { color: '#94a3b8', family: 'Inter, sans-serif' },
            margin: { l: 40, r: 20, t: 30, b: 40 },
            xaxis: { title: 'x', gridcolor: 'rgba(255,255,255,0.06)', zerolinecolor: '#38bdf8' },
            yaxis: { title: 'f(x)', gridcolor: 'rgba(255,255,255,0.06)', zerolinecolor: '#38bdf8' },
            autosize: true,
          }}
          useResizeHandler={true}
          className="w-full h-full"
          config={{ responsive: true, displayModeBar: false }}
        />
      </div>

      {/* Animation Controls */}
      <div className="flex items-center justify-between bg-slate-900/80 px-4 py-2 rounded-lg border border-slate-800 text-xs">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-1.5 rounded bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 transition-colors"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>
          <button
            onClick={() => {
              setDelta(1.5);
              setIsPlaying(false);
            }}
            className="p-1.5 rounded bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={() => setDelta((prev) => Math.max(0.01, prev - 0.1))}
            className="p-1.5 rounded bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors"
          >
            <SkipForward className="w-4 h-4" />
          </button>
          <button
            onClick={() => setDelta((prev) => Math.min(2.0, prev + 0.1))}
            className="p-1.5 rounded bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors"
          >
            <SkipBack className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-slate-400 font-mono text-[11px]">Distance δ:</span>
          <input
            type="range"
            min="0.01"
            max="2.0"
            step="0.02"
            value={delta}
            onChange={(e) => {
              setDelta(parseFloat(e.target.value));
              setIsPlaying(false);
            }}
            className="w-32 accent-cyan-400"
          />
        </div>
      </div>
    </div>
  );
};

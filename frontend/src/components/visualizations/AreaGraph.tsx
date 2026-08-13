import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import { Play, Pause, RotateCcw } from 'lucide-react';

interface AreaGraphProps {
  data: {
    x: number[];
    y: number[];
    fillX: number[];
    fillY: number[];
    a: number;
    b: number;
    areaValue: number;
    exprStr?: string;
  };
  title?: string;
}

export const AreaGraph: React.FC<AreaGraphProps> = ({ data, title = 'Definite Integration - Accumulated Area' }) => {
  const { x, y, fillX = [], fillY = [], a = 0, b = 2, areaValue = 0, exprStr = 'f(x)' } = data;
  const [fillFraction, setFillFraction] = useState<number>(1.0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  useEffect(() => {
    let timer: any;
    if (isPlaying) {
      timer = setInterval(() => {
        setFillFraction((prev) => (prev >= 1.0 ? 0.1 : prev + 0.05));
      }, 80);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  const currentCount = Math.max(2, Math.floor(fillX.length * fillFraction));
  const currentFillX = fillX.slice(0, currentCount);
  const currentFillY = fillY.slice(0, currentCount);
  const currentArea = (areaValue * fillFraction).toFixed(3);

  return (
    <div className="w-full flex flex-col space-y-3 bg-slate-950/90 p-4 rounded-xl border border-slate-800">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold font-mono text-cyan-300">
          {title}: ∫[{a} to {b}] ({exprStr}) dx
        </span>
        <span className="text-xs font-mono font-bold text-cyan-300 bg-cyan-500/10 px-3 py-1 rounded border border-cyan-500/20">
          Accumulated Area = {currentArea}
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
              x: currentFillX,
              y: currentFillY,
              type: 'scatter',
              fill: 'tozeroy',
              fillcolor: 'rgba(6, 182, 212, 0.3)',
              line: { color: '#06b6d4' },
              name: `Integrated Area (a=${a}, b=${b})`,
            },
          ]}
          layout={{
            paper_bgcolor: 'rgba(0,0,0,0)',
            plot_bgcolor: 'rgba(15, 23, 42, 0.6)',
            font: { color: '#94a3b8', family: 'Inter, sans-serif' },
            margin: { l: 40, r: 20, t: 30, b: 40 },
            xaxis: { title: 'x', gridcolor: 'rgba(255,255,255,0.06)' },
            yaxis: { title: 'f(x)', gridcolor: 'rgba(255,255,255,0.06)' },
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
              setFillFraction(1.0);
              setIsPlaying(false);
            }}
            className="p-1.5 rounded bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center space-x-2 w-2/3">
          <span className="text-slate-400 font-mono text-[11px]">Integration Progress:</span>
          <input
            type="range"
            min="0.05"
            max="1.0"
            step="0.05"
            value={fillFraction}
            onChange={(e) => {
              setFillFraction(parseFloat(e.target.value));
              setIsPlaying(false);
            }}
            className="w-full accent-cyan-400"
          />
        </div>
      </div>
    </div>
  );
};

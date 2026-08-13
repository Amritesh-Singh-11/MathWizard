import React, { useState } from 'react';
import Plot from 'react-plotly.js';

interface TangentGraphProps {
  data?: {
    x?: number[];
    y?: number[];
    derivY?: number[];
    exprStr?: string;
    derivStr?: string;
  };
  title?: string;
}

export const TangentGraph: React.FC<TangentGraphProps> = ({ data = {}, title = 'Differentiation - Movable Tangent Line' }) => {
  const x = Array.isArray(data.x) && data.x.length > 0 ? data.x : [-3, -2, -1, 0, 1, 2, 3];
  const y = Array.isArray(data.y) && data.y.length > 0 ? data.y : [-1, 0, 1, 2, 3, 4, 5];
  const derivY = Array.isArray(data.derivY) && data.derivY.length > 0 ? data.derivY : undefined;
  const exprStr = data.exprStr || 'f(x)';
  const derivStr = data.derivStr || "f'(x)";

  const [pointIndex, setPointIndex] = useState<number>(Math.floor(x.length / 2));

  const validIndex = Math.min(Math.max(0, pointIndex), x.length - 1);
  const currentX = x[validIndex] ?? 0;
  const currentY = y[validIndex] ?? 0;

  const slope = validIndex < x.length - 1 && validIndex > 0
    ? (y[validIndex + 1] - y[validIndex - 1]) / (x[validIndex + 1] - x[validIndex - 1])
    : 1;

  const tangentY = x.map((xv) => (isNaN(slope) ? 1 : slope) * (xv - currentX) + currentY);

  return (
    <div className="w-full flex flex-col space-y-3 bg-slate-950/90 p-4 rounded-xl border border-slate-800">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold font-mono text-cyan-300">
          {title} | f({currentX.toFixed(2)}) = {currentY.toFixed(2)}
        </span>
        <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20">
          Tangent Slope m = {isNaN(slope) ? '1.000' : slope.toFixed(3)}
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
            ...(derivY ? [{
              x: x,
              y: derivY,
              type: 'scatter',
              mode: 'lines',
              name: `Derivative ${derivStr}`,
              line: { color: '#a855f7', width: 1.5, dash: 'dot' },
            }] : []),
            {
              x: x,
              y: tangentY,
              type: 'scatter',
              mode: 'lines',
              name: `Tangent Line (m = ${isNaN(slope) ? '1.00' : slope.toFixed(2)})`,
              line: { color: '#00ff88', width: 2 },
            },
            {
              x: [currentX],
              y: [currentY],
              type: 'scatter',
              mode: 'markers',
              name: `Tangent Point (${currentX.toFixed(2)}, ${currentY.toFixed(2)})`,
              marker: { color: '#ff007f', size: 10 },
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

      {/* Point Movement Slider */}
      <div className="flex items-center justify-between bg-slate-900/80 px-4 py-2.5 rounded-lg border border-slate-800 text-xs">
        <span className="text-slate-300 font-mono">Move Tangent Point Along Curve:</span>
        <div className="flex items-center space-x-3 w-2/3">
          <input
            type="range"
            min="0"
            max={Math.max(0, x.length - 1)}
            value={validIndex}
            onChange={(e) => setPointIndex(parseInt(e.target.value) || 0)}
            className="w-full accent-cyan-400"
          />
          <span className="text-cyan-300 font-mono font-bold w-12 text-right">x = {currentX.toFixed(1)}</span>
        </div>
      </div>
    </div>
  );
};

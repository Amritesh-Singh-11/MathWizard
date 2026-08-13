import React, { useState } from 'react';
import Plot from 'react-plotly.js';

interface FeasibleRegionProps {
  data: {
    vertices?: Array<[number, number]>;
    optimalPoint?: [number, number];
    maxZ?: number;
    title?: string;
  };
  title?: string;
}

export const FeasibleRegion: React.FC<FeasibleRegionProps> = ({ data, title = 'Simplex Feasible Polytopic Region & Optimal Point Search' }) => {
  const vertices = data.vertices || [[0, 0], [5, 0], [4, 2], [0, 4], [0, 0]];
  const optimalPoint = data.optimalPoint || [4, 2];
  const maxZ = data.maxZ ?? 16;

  const [objPos, setObjPos] = useState<number>(1.0);

  // Polygonal vertices for feasible area fill
  const polyX = vertices.map((v) => v[0]);
  const polyY = vertices.map((v) => v[1]);

  return (
    <div className="w-full flex flex-col space-y-3 bg-slate-950/90 p-4 rounded-xl border border-slate-800">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold font-mono text-cyan-300">
          {data.title || title}
        </span>
        <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded border border-emerald-500/20">
          Max Z = {(maxZ * objPos).toFixed(2)} at ({optimalPoint[0]}, {optimalPoint[1]})
        </span>
      </div>

      <div className="w-full h-72 rounded-lg overflow-hidden bg-slate-900 border border-slate-800">
        <Plot
          data={[
            {
              x: polyX,
              y: polyY,
              type: 'scatter',
              mode: 'lines+markers',
              fill: 'toself',
              fillcolor: 'rgba(6, 182, 212, 0.25)',
              name: 'Feasible Polytopic Region',
              line: { color: '#00f2fe', width: 2 },
              marker: { color: '#00f2fe', size: 7 },
            },
            {
              x: [optimalPoint[0]],
              y: [optimalPoint[1]],
              type: 'scatter',
              mode: 'markers+text',
              name: 'Optimal Solution Vertex',
              marker: { color: '#ff007f', size: 12, symbol: 'star' },
              text: [`Optimal (${optimalPoint[0]}, ${optimalPoint[1]})`],
              textposition: 'top right',
            },
          ]}
          layout={{
            paper_bgcolor: 'rgba(0,0,0,0)',
            plot_bgcolor: 'rgba(15, 23, 42, 0.6)',
            font: { color: '#94a3b8', family: 'Inter, sans-serif' },
            margin: { l: 40, r: 20, t: 30, b: 40 },
            xaxis: { title: 'x1', gridcolor: 'rgba(255,255,255,0.06)' },
            yaxis: { title: 'x2', gridcolor: 'rgba(255,255,255,0.06)' },
            autosize: true,
          }}
          useResizeHandler={true}
          className="w-full h-full"
          config={{ responsive: true, displayModeBar: false }}
        />
      </div>

      {/* Objective Line Slider */}
      <div className="flex items-center justify-between bg-slate-900/80 px-4 py-2.5 rounded-lg border border-slate-800 text-xs">
        <span className="text-slate-300 font-mono">Move Objective Line Z:</span>
        <div className="flex items-center space-x-3 w-2/3">
          <input
            type="range"
            min="0.1"
            max="1.0"
            step="0.05"
            value={objPos}
            onChange={(e) => setObjPos(parseFloat(e.target.value))}
            className="w-full accent-cyan-400"
          />
          <span className="text-cyan-300 font-mono font-bold w-12 text-right">
            Z = {(maxZ * objPos).toFixed(1)}
          </span>
        </div>
      </div>
    </div>
  );
};

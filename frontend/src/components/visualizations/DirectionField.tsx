import React from 'react';
import Plot from 'react-plotly.js';

interface DirectionFieldProps {
  data: {
    gridX?: number[];
    gridY?: number[];
    u?: number[][];
    v?: number[][];
    solutionCurves?: Array<{ x: number[]; y: number[]; name?: string }>;
    title?: string;
  };
  title?: string;
}

export const DirectionField: React.FC<DirectionFieldProps> = ({ data, title = 'Differential Equation Direction Field & Solution Trajectories' }) => {
  const solutionCurves = data.solutionCurves || [
    {
      x: [-3, -2, -1, 0, 1, 2, 3],
      y: [16.08, 5.39, 1.72, 0.0, 0.37, 1.14, 2.05],
      name: 'Solution y(x) [y(0)=0]',
    },
    {
      x: [-3, -2, -1, 0, 1, 2, 3],
      y: [-4.0, -3.0, -2.0, -1.0, 0.0, 1.0, 2.0],
      name: 'Equilibrium Solution',
    },
  ];

  const plotTraces: any[] = solutionCurves.map((sc, i) => ({
    x: sc.x,
    y: sc.y,
    type: 'scatter',
    mode: 'lines',
    name: sc.name || `Curve ${i + 1}`,
    line: { color: i === 0 ? '#00f2fe' : '#a855f7', width: 2.5 },
  }));

  return (
    <div className="w-full flex flex-col space-y-3 bg-slate-950/90 p-4 rounded-xl border border-slate-800">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold font-mono text-cyan-300">
          {data.title || title}
        </span>
        <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20">
          Phase Slope Field dy/dx
        </span>
      </div>

      <div className="w-full h-72 rounded-lg overflow-hidden bg-slate-900 border border-slate-800">
        <Plot
          data={plotTraces}
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
    </div>
  );
};

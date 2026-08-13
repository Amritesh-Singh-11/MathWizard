import React from 'react';
import Plot from 'react-plotly.js';

interface PoleZero {
  real: number;
  imag: number;
}

interface ZPlaneProps {
  data: {
    poles?: PoleZero[];
    zeros?: PoleZero[];
    rocRadius?: number;
    title?: string;
  };
  title?: string;
}

export const ZPlane: React.FC<ZPlaneProps> = ({ data, title = 'Z-Domain Complex Pole-Zero & ROC Diagram' }) => {
  const poles = data.poles || [{ real: 0.5, imag: 0 }];
  const zeros = data.zeros || [{ real: 0, imag: 0 }];
  const roc = data.rocRadius || 0.5;

  const theta = Array.from({ length: 100 }, (_, i) => (i * 2 * Math.PI) / 99);
  const ucX = theta.map((t) => Math.cos(t));
  const ucY = theta.map((t) => Math.sin(t));

  return (
    <div className="w-full flex flex-col space-y-3 bg-slate-950/90 p-4 rounded-xl border border-slate-800">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold font-mono text-cyan-300">
          {data.title || title}
        </span>
        <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded border border-cyan-500/20">
          ROC: |z| &gt; {roc}
        </span>
      </div>

      <div className="w-full h-72 rounded-lg overflow-hidden bg-slate-900 border border-slate-800">
        <Plot
          data={[
            {
              x: ucX,
              y: ucY,
              type: 'scatter',
              mode: 'lines',
              name: 'Unit Circle |z| = 1',
              line: { color: '#38bdf8', width: 2, dash: 'dash' },
            },
            {
              x: zeros.map((z) => z.real),
              y: zeros.map((z) => z.imag),
              type: 'scatter',
              mode: 'markers',
              name: 'Zeros (O)',
              marker: { color: '#00ff88', size: 10, symbol: 'circle-open' },
            },
            {
              x: poles.map((p) => p.real),
              y: poles.map((p) => p.imag),
              type: 'scatter',
              mode: 'markers',
              name: 'Poles (X)',
              marker: { color: '#ff007f', size: 12, symbol: 'x' },
            },
          ]}
          layout={{
            paper_bgcolor: 'rgba(0,0,0,0)',
            plot_bgcolor: 'rgba(15, 23, 42, 0.6)',
            font: { color: '#94a3b8', family: 'Inter, sans-serif' },
            margin: { l: 40, r: 20, t: 30, b: 40 },
            xaxis: { title: 'Re(z)', gridcolor: 'rgba(255,255,255,0.06)' },
            yaxis: { title: 'Im(z)', gridcolor: 'rgba(255,255,255,0.06)' },
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

import React from 'react';
import Plot from 'react-plotly.js';

interface VectorItem2D {
  name: string;
  startX?: number;
  startY?: number;
  endX: number;
  endY: number;
  color?: string;
}

interface Vector2DProps {
  data: {
    vectors: VectorItem2D[];
    dotProduct?: number;
    angleRad?: number;
  };
  title?: string;
}

export const Vector2D: React.FC<Vector2DProps> = ({ data, title = '2D Vector Geometry & Head-to-Tail Diagram' }) => {
  const vectors = data.vectors || [
    { name: 'u', startX: 0, startY: 0, endX: 3, endY: 2, color: '#00f2fe' },
    { name: 'v', startX: 3, startY: 2, endX: 5, endY: 5, color: '#a855f7' },
    { name: 'u+v', startX: 0, startY: 0, endX: 5, endY: 5, color: '#00ff88' },
  ];

  const plotData: any[] = vectors.map((v) => {
    const sx = v.startX ?? 0;
    const sy = v.startY ?? 0;
    const mag = Math.sqrt((v.endX - sx) ** 2 + (v.endY - sy) ** 2).toFixed(2);
    return {
      x: [sx, v.endX],
      y: [sy, v.endY],
      type: 'scatter',
      mode: 'lines+markers',
      name: `${v.name} (len=${mag})`,
      line: { color: v.color || '#00f2fe', width: 3 },
      marker: { color: v.color || '#00f2fe', size: 8 },
    };
  });

  return (
    <div className="w-full flex flex-col space-y-3 bg-slate-950/90 p-4 rounded-xl border border-slate-800">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold font-mono text-cyan-300">{title}</span>
        {data.dotProduct !== undefined && (
          <span className="text-xs font-mono font-bold text-cyan-300 bg-cyan-500/10 px-3 py-1 rounded border border-cyan-500/20">
            u · v = {data.dotProduct}
          </span>
        )}
      </div>

      <div className="w-full h-72 rounded-lg overflow-hidden bg-slate-900 border border-slate-800">
        <Plot
          data={plotData}
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

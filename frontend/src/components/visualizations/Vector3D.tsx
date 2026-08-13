import React from 'react';
import Plot from 'react-plotly.js';

interface Vector3DProps {
  data: {
    vectors?: Array<{ name: string; coords: number[]; color?: string }>;
    surfaceX?: number[][];
    surfaceY?: number[][];
    surfaceZ?: number[][];
    planeNormal?: number[];
    title?: string;
  };
  title?: string;
  type?: 'VECTOR_3D' | 'PLANE_3D' | 'SURFACE_3D' | 'VOLUME_3D';
}

export const Vector3D: React.FC<Vector3DProps> = ({ data, title = '3D Spatial Geometry Viewport', type = 'VECTOR_3D' }) => {
  const customTitle = data.title || title;

  let plotTraces: any[] = [];

  if (type === 'SURFACE_3D' || data.surfaceZ) {
    plotTraces = [
      {
        type: 'surface',
        z: data.surfaceZ || [
          [1, 2, 3],
          [2, 4, 5],
          [3, 5, 6],
        ],
        colorscale: 'Viridis',
        showscale: false,
      },
    ];
  } else if (type === 'PLANE_3D' || data.planeNormal) {
    const norm = data.planeNormal || [1, 2, 3];
    plotTraces = [
      {
        type: 'mesh3d',
        x: [-2, 2, 2, -2],
        y: [-2, -2, 2, 2],
        z: [
          (-norm[0]*(-2) - norm[1]*(-2))/norm[2],
          (-norm[0]*(2) - norm[1]*(-2))/norm[2],
          (-norm[0]*(2) - norm[1]*(2))/norm[2],
          (-norm[0]*(-2) - norm[1]*(2))/norm[2],
        ],
        color: 'rgba(6, 182, 212, 0.4)',
        opacity: 0.7,
        name: '3D Plane Surface',
      },
      {
        type: 'scatter3d',
        mode: 'lines+markers',
        x: [0, norm[0]],
        y: [0, norm[1]],
        z: [0, norm[2]],
        line: { color: '#ff007f', width: 6 },
        marker: { color: '#ff007f', size: 6 },
        name: `Normal Vector N [${norm.join(', ')}]`,
      },
    ];
  } else {
    // VECTOR_3D default
    const vecs = data.vectors || [
      { name: 'u', coords: [1, 2, 3], color: '#00f2fe' },
      { name: 'v', coords: [4, 5, 6], color: '#a855f7' },
      { name: 'u x v', coords: [-3, 6, -3], color: '#00ff88' },
    ];

    plotTraces = vecs.map((v) => ({
      type: 'scatter3d',
      mode: 'lines+markers+text',
      x: [0, v.coords[0]],
      y: [0, v.coords[1]],
      z: [0, v.coords[2]],
      text: ['', v.name],
      textposition: 'top center',
      line: { color: v.color || '#00f2fe', width: 6 },
      marker: { color: v.color || '#00f2fe', size: 6 },
      name: `${v.name}: [${v.coords.join(', ')}]`,
    }));
  }

  return (
    <div className="w-full flex flex-col space-y-3 bg-slate-950/90 p-4 rounded-xl border border-slate-800">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold font-mono text-cyan-300">{customTitle}</span>
        <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded border border-cyan-500/20">
          3D Camera (Rotate / Zoom / Pan)
        </span>
      </div>

      <div className="w-full h-80 rounded-lg overflow-hidden bg-slate-900 border border-slate-800">
        <Plot
          data={plotTraces}
          layout={{
            paper_bgcolor: 'rgba(0,0,0,0)',
            plot_bgcolor: 'rgba(15, 23, 42, 0.6)',
            font: { color: '#94a3b8', family: 'Inter, sans-serif' },
            margin: { l: 20, r: 20, t: 20, b: 20 },
            scene: {
              xaxis: { title: 'X', gridcolor: 'rgba(255,255,255,0.08)' },
              yaxis: { title: 'Y', gridcolor: 'rgba(255,255,255,0.08)' },
              zaxis: { title: 'Z', gridcolor: 'rgba(255,255,255,0.08)' },
              camera: { eye: { x: 1.5, y: 1.5, z: 1.2 } },
            },
            autosize: true,
          }}
          useResizeHandler={true}
          className="w-full h-full"
          config={{ responsive: true, displayModeBar: true }}
        />
      </div>
    </div>
  );
};

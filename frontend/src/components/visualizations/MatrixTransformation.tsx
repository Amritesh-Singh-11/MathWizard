import React from 'react';
import Plot from 'react-plotly.js';

interface MatrixTransformationProps {
  data: {
    matrix?: number[][];
    determinant?: number;
    eigenvalues?: number[];
    eigenvectors?: number[][];
  };
  title?: string;
}

export const MatrixTransformation: React.FC<MatrixTransformationProps> = ({
  data,
  title = 'Matrix Linear Transformation & Area/Volume Scale Factor',
}) => {
  const matrix = data.matrix || [[1, 2], [3, 4]];
  const a = matrix[0][0], b = matrix[0][1], c = matrix[1][0], d = matrix[1][1];
  const det = data.determinant ?? (a * d - b * c);

  // Unit square coordinates: (0,0) -> (1,0) -> (1,1) -> (0,1) -> (0,0)
  const origX = [0, 1, 1, 0, 0];
  const origY = [0, 0, 1, 1, 0];

  // Transformed parallelogram coordinates: (a*x + b*y, c*x + d*y)
  const transX = origX.map((x, i) => a * x + b * origY[i]);
  const transY = origX.map((x, i) => c * x + d * origY[i]);

  return (
    <div className="w-full flex flex-col space-y-3 bg-slate-950/90 p-4 rounded-xl border border-slate-800">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold font-mono text-cyan-300">{title}</span>
        <span className="text-xs font-mono font-bold text-cyan-300 bg-cyan-500/10 px-3 py-1 rounded border border-cyan-500/20">
          Signed Area Scale Factor |det(A)| = {Math.abs(det).toFixed(3)}
        </span>
      </div>

      <div className="w-full h-72 rounded-lg overflow-hidden bg-slate-900 border border-slate-800">
        <Plot
          data={[
            {
              x: origX,
              y: origY,
              type: 'scatter',
              mode: 'lines',
              fill: 'toself',
              fillcolor: 'rgba(6, 182, 212, 0.15)',
              name: 'Unit Square (Area = 1.0)',
              line: { color: '#00f2fe', width: 2, dash: 'dot' },
            },
            {
              x: transX,
              y: transY,
              type: 'scatter',
              mode: 'lines',
              fill: 'toself',
              fillcolor: 'rgba(168, 85, 247, 0.25)',
              name: `Transformed Parallelogram (Area = ${Math.abs(det).toFixed(2)})`,
              line: { color: '#a855f7', width: 2.5 },
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

      {data.eigenvalues && (
        <div className="text-[11px] font-mono text-slate-300 bg-slate-900/80 p-2.5 rounded-lg border border-slate-800 flex items-center justify-between">
          <span className="text-violet-400 font-semibold">Eigenvalues (Av = λv):</span>
          <span>λ1 = {data.eigenvalues[0]?.toFixed(3)}, λ2 = {data.eigenvalues[1]?.toFixed(3)}</span>
        </div>
      )}
    </div>
  );
};

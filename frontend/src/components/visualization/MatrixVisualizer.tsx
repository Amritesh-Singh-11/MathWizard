import React from 'react';

interface MatrixVisualizerProps {
  matrix?: number[][];
  title?: string;
  eigenvectors?: number[][];
}

export const MatrixVisualizer: React.FC<MatrixVisualizerProps> = ({
  matrix = [[1, 2], [3, 4]],
  title = 'Matrix Structural Grid & Transformation Heatmap',
  eigenvectors,
}) => {
  const numRows = matrix.length;
  const numCols = matrix[0]?.length || 2;

  // Compute max value for color intensity mapping
  const flatVals = matrix.flat().map(Math.abs);
  const maxVal = Math.max(...flatVals, 1);

  return (
    <div className="w-full flex flex-col p-4 bg-slate-950/90 rounded-xl border border-slate-800 space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-cyan-300 font-mono">{title}</span>
        <span className="text-[10px] text-slate-400 font-mono">
          Dimension: {numRows} × {numCols}
        </span>
      </div>

      <div className="flex items-center justify-center space-x-6 py-2">
        {/* Matrix Bracket Wrapper */}
        <div className="flex items-center space-x-2 bg-slate-900/80 p-4 rounded-xl border border-slate-800 shadow-inner">
          <div className="w-2 border-l-2 border-t-2 border-b-2 border-cyan-400 h-full rounded-l" />
          <div
            className="grid gap-2 text-center"
            style={{ gridTemplateColumns: `repeat(${numCols}, minmax(0, 1fr))` }}
          >
            {matrix.map((row, r) =>
              row.map((val, c) => {
                const intensity = Math.min(Math.abs(val) / maxVal, 1);
                const bgAlpha = 0.15 + intensity * 0.45;
                return (
                  <div
                    key={`${r}-${c}`}
                    className="w-16 h-12 rounded-lg flex flex-col items-center justify-center border border-slate-700/80 transition-all hover:scale-105"
                    style={{
                      backgroundColor: val >= 0 ? `rgba(6, 182, 212, ${bgAlpha})` : `rgba(239, 68, 68, ${bgAlpha})`,
                    }}
                  >
                    <span className="text-xs font-mono font-bold text-slate-100">{val}</span>
                    <span className="text-[9px] text-slate-400 font-mono">a[{r+1},{c+1}]</span>
                  </div>
                );
              })
            )}
          </div>
          <div className="w-2 border-r-2 border-t-2 border-b-2 border-cyan-400 h-full rounded-r" />
        </div>
      </div>

      {eigenvectors && eigenvectors.length > 0 && (
        <div className="text-[11px] font-mono text-slate-400 bg-slate-900/80 p-2.5 rounded-lg border border-slate-800/80 flex items-center justify-between">
          <span className="text-violet-400 font-semibold">Eigenvector Basis Directions:</span>
          <span className="text-slate-200">
            v1 = [{eigenvectors[0]?.join(', ')}], v2 = [{eigenvectors[1]?.join(', ')}]
          </span>
        </div>
      )}
    </div>
  );
};

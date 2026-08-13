import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, SkipForward } from 'lucide-react';

interface MatrixVisualizationProps {
  data: {
    matrixA?: number[][];
    matrixB?: number[][];
    matrixC?: number[][];
    operator?: string;
    stepsInfo?: string[];
  };
  title?: string;
}

export const MatrixVisualization: React.FC<MatrixVisualizationProps> = ({ data, title = 'Matrix Element-by-Element Operation' }) => {
  const {
    matrixA = [[1, 2], [3, 4]],
    matrixB = [[5, 6], [7, 8]],
    matrixC = [[6, 8], [10, 12]],
    operator = '+',
    stepsInfo = ['Row 1 × Col 1', 'Row 1 × Col 2', 'Row 2 × Col 1', 'Row 2 × Col 2'],
  } = data;

  const rows = matrixC.length || 2;
  const cols = matrixC[0]?.length || 2;
  const totalElements = rows * cols;

  const [activeElemIndex, setActiveElemIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  useEffect(() => {
    let timer: any;
    if (isPlaying && totalElements > 0) {
      timer = setInterval(() => {
        setActiveElemIndex((prev) => (prev >= totalElements - 1 ? 0 : prev + 1));
      }, 1200);
    }
    return () => clearInterval(timer);
  }, [isPlaying, totalElements]);

  const activeRow = Math.floor(activeElemIndex / cols);
  const activeCol = activeElemIndex % cols;

  return (
    <div className="w-full flex flex-col space-y-4 bg-slate-950/90 p-4 rounded-xl border border-slate-800">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold font-mono text-cyan-300">{title}</span>
        <span className="text-xs font-mono font-bold text-cyan-300 bg-cyan-500/10 px-3 py-1 rounded border border-cyan-500/20">
          Calculating Element [{activeRow + 1}, {activeCol + 1}]
        </span>
      </div>

      {/* Interactive Matrix Operator Animation Grid */}
      <div className="flex items-center justify-center space-x-4 py-4 flex-wrap gap-y-4">
        {/* Matrix A */}
        <div className="flex items-center space-x-1.5 bg-slate-900/90 p-3.5 rounded-xl border border-slate-800 shadow-inner">
          <div className="w-2 border-l-2 border-t-2 border-b-2 border-cyan-400 h-full rounded-l" />
          <div className="grid gap-1.5" style={{ gridTemplateColumns: `repeat(${matrixA[0]?.length || 2}, minmax(0, 1fr))` }}>
            {matrixA.map((rArr, r) =>
              rArr.map((val, c) => (
                <div
                  key={`a-${r}-${c}`}
                  className={`w-12 h-10 rounded flex items-center justify-center font-mono text-xs font-bold border transition-all ${
                    r === activeRow ? 'bg-cyan-500/30 border-cyan-400 text-cyan-200 scale-105 shadow' : 'bg-slate-950 border-slate-800 text-slate-300'
                  }`}
                >
                  {val}
                </div>
              ))
            )}
          </div>
          <div className="w-2 border-r-2 border-t-2 border-b-2 border-cyan-400 h-full rounded-r" />
        </div>

        {/* Operator Symbol */}
        <div className="text-lg font-mono font-bold text-violet-400 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
          {operator}
        </div>

        {/* Matrix B */}
        <div className="flex items-center space-x-1.5 bg-slate-900/90 p-3.5 rounded-xl border border-slate-800 shadow-inner">
          <div className="w-2 border-l-2 border-t-2 border-b-2 border-violet-400 h-full rounded-l" />
          <div className="grid gap-1.5" style={{ gridTemplateColumns: `repeat(${matrixB[0]?.length || 2}, minmax(0, 1fr))` }}>
            {matrixB.map((rArr, r) =>
              rArr.map((val, c) => (
                <div
                  key={`b-${r}-${c}`}
                  className={`w-12 h-10 rounded flex items-center justify-center font-mono text-xs font-bold border transition-all ${
                    c === activeCol ? 'bg-violet-500/30 border-violet-400 text-violet-200 scale-105 shadow' : 'bg-slate-950 border-slate-800 text-slate-300'
                  }`}
                >
                  {val}
                </div>
              ))
            )}
          </div>
          <div className="w-2 border-r-2 border-t-2 border-b-2 border-violet-400 h-full rounded-r" />
        </div>

        {/* Equals Symbol */}
        <div className="text-lg font-mono font-bold text-slate-400">=</div>

        {/* Result Matrix C */}
        <div className="flex items-center space-x-1.5 bg-slate-900/90 p-3.5 rounded-xl border border-emerald-500/40 shadow-inner">
          <div className="w-2 border-l-2 border-t-2 border-b-2 border-emerald-400 h-full rounded-l" />
          <div className="grid gap-1.5" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
            {matrixC.map((rArr, r) =>
              rArr.map((val, c) => {
                const isCurrent = r === activeRow && c === activeCol;
                const isDone = r * cols + c <= activeElemIndex;
                return (
                  <div
                    key={`c-${r}-${c}`}
                    className={`w-12 h-10 rounded flex items-center justify-center font-mono text-xs font-bold border transition-all ${
                      isCurrent
                        ? 'bg-emerald-500/30 border-emerald-400 text-emerald-200 scale-110 ring-2 ring-emerald-400/50'
                        : isDone
                        ? 'bg-emerald-950/60 border-emerald-700/60 text-emerald-300'
                        : 'bg-slate-950 border-slate-800 text-slate-600'
                    }`}
                  >
                    {isDone ? val : '?'}
                  </div>
                );
              })
            )}
          </div>
          <div className="w-2 border-r-2 border-t-2 border-b-2 border-emerald-400 h-full rounded-r" />
        </div>
      </div>

      {/* Step Calculation Description */}
      <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800 flex items-center justify-between text-xs font-mono">
        <span className="text-slate-400">Calculation Step:</span>
        <span className="text-emerald-300 font-bold">
          {stepsInfo[activeElemIndex] || `Row ${activeRow + 1} × Col ${activeCol + 1} = ${matrixC[activeRow]?.[activeCol]}`}
        </span>
      </div>

      {/* Controls */}
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
              setActiveElemIndex(0);
              setIsPlaying(false);
            }}
            className="p-1.5 rounded bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={() => setActiveElemIndex((prev) => Math.min(totalElements - 1, prev + 1))}
            className="p-1.5 rounded bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors"
          >
            <SkipForward className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center space-x-2 w-1/2">
          <span className="text-slate-400 font-mono text-[11px]">Step Progress:</span>
          <input
            type="range"
            min="0"
            max={totalElements - 1}
            value={activeElemIndex}
            onChange={(e) => {
              setActiveElemIndex(parseInt(e.target.value));
              setIsPlaying(false);
            }}
            className="w-full accent-cyan-400"
          />
        </div>
      </div>
    </div>
  );
};

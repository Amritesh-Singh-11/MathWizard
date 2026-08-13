import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import { Play, Pause, RotateCcw, SkipForward, SkipBack } from 'lucide-react';

interface IterationStep {
  iteration: number;
  value: number;
  error?: number;
  pointX?: number;
  pointY?: number;
  tangentX?: number[];
  tangentY?: number[];
}

interface IterationVisualizationProps {
  data?: {
    iterations?: IterationStep[];
    xCurve?: number[];
    yCurve?: number[];
    title?: string;
  };
  title?: string;
}

export const IterationVisualization: React.FC<IterationVisualizationProps> = ({ data = {}, title = 'Numerical Iteration Convergence' }) => {
  const iterations = Array.isArray(data.iterations) && data.iterations.length > 0
    ? data.iterations
    : [{ iteration: 1, value: 1.5, error: 0.1 }];
  const xCurve = Array.isArray(data.xCurve) ? data.xCurve : [];
  const yCurve = Array.isArray(data.yCurve) ? data.yCurve : [];
  const customTitle = data.title || title;

  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  const totalSteps = iterations.length;
  const activeStepIndex = Math.min(Math.max(0, currentStep), totalSteps - 1);
  const activeIter = iterations[activeStepIndex] || { iteration: 1, value: 0, error: 0 };

  useEffect(() => {
    let timer: any;
    if (isPlaying && totalSteps > 0) {
      timer = setInterval(() => {
        setCurrentStep((prev) => (prev >= totalSteps - 1 ? 0 : prev + 1));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPlaying, totalSteps]);

  const iterPlotX = iterations.slice(0, activeStepIndex + 1).map((it) => it.iteration);
  const iterPlotVals = iterations.slice(0, activeStepIndex + 1).map((it) => it.value);

  return (
    <div className="w-full flex flex-col space-y-3 bg-slate-950/90 p-4 rounded-xl border border-slate-800">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold font-mono text-cyan-300">
          {customTitle}
        </span>
        <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded border border-emerald-500/20">
          Iteration: {activeStepIndex + 1} / {totalSteps}
        </span>
      </div>

      <div className="w-full h-72 rounded-lg overflow-hidden bg-slate-900 border border-slate-800">
        <Plot
          data={[
            ...(xCurve.length > 0 ? [{
              x: xCurve,
              y: yCurve,
              type: 'scatter',
              mode: 'lines',
              name: 'f(x) Target Curve',
              line: { color: '#334155', width: 2 },
            }] : []),
            {
              x: iterPlotX,
              y: iterPlotVals,
              type: 'scatter',
              mode: 'lines+markers',
              name: 'Iterative Path',
              line: { color: '#00f2fe', width: 2 },
              marker: { color: '#00ff88', size: 8 },
            },
            ...(activeIter.tangentX ? [{
              x: activeIter.tangentX,
              y: activeIter.tangentY,
              type: 'scatter',
              mode: 'lines',
              name: `Tangent at Iter ${activeStepIndex + 1}`,
              line: { color: '#ff007f', width: 2, dash: 'dot' },
            }] : []),
            {
              x: [activeIter.iteration],
              y: [activeIter.value],
              type: 'scatter',
              mode: 'markers',
              name: `Active Point (${(activeIter.value || 0).toFixed(4)})`,
              marker: { color: '#ff007f', size: 12 },
            },
          ]}
          layout={{
            paper_bgcolor: 'rgba(0,0,0,0)',
            plot_bgcolor: 'rgba(15, 23, 42, 0.6)',
            font: { color: '#94a3b8', family: 'Inter, sans-serif' },
            margin: { l: 40, r: 20, t: 30, b: 40 },
            xaxis: { title: 'Iteration / x', gridcolor: 'rgba(255,255,255,0.06)' },
            yaxis: { title: 'Value f(x)', gridcolor: 'rgba(255,255,255,0.06)' },
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
              setCurrentStep(0);
              setIsPlaying(false);
            }}
            className="p-1.5 rounded bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
            className="p-1.5 rounded bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors"
          >
            <SkipBack className="w-4 h-4" />
          </button>
          <button
            onClick={() => setCurrentStep((prev) => Math.min(totalSteps - 1, prev + 1))}
            className="p-1.5 rounded bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors"
          >
            <SkipForward className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center space-x-2 w-1/2">
          <span className="text-slate-400 font-mono text-[11px]">Step:</span>
          <input
            type="range"
            min="0"
            max={Math.max(0, totalSteps - 1)}
            value={activeStepIndex}
            onChange={(e) => {
              setCurrentStep(parseInt(e.target.value) || 0);
              setIsPlaying(false);
            }}
            className="w-full accent-cyan-400"
          />
        </div>
      </div>

      {/* Convergence Table */}
      {iterations.length > 0 && (
        <div className="bg-slate-900/90 rounded-lg border border-slate-800 p-2.5 overflow-x-auto text-[11px] font-mono">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400">
                <th className="py-1 px-2">Iter</th>
                <th className="py-1 px-2">Estimate Value</th>
                <th className="py-1 px-2">Error / Δ</th>
              </tr>
            </thead>
            <tbody>
              {iterations.slice(0, 6).map((it, idx) => (
                <tr
                  key={idx}
                  className={`border-b border-slate-800/40 ${
                    idx === activeStepIndex ? 'bg-cyan-500/20 text-cyan-300 font-bold' : 'text-slate-300'
                  }`}
                >
                  <td className="py-1 px-2">#{it.iteration}</td>
                  <td className="py-1 px-2">{(it.value || 0).toFixed(6)}</td>
                  <td className="py-1 px-2">{it.error !== undefined ? it.error.toExponential(3) : 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

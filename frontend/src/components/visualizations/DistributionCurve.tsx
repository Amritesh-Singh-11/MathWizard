import React, { useState } from 'react';
import Plot from 'react-plotly.js';

interface DistributionCurveProps {
  data: {
    x?: number[];
    y?: number[];
    histogramData?: number[];
    scatterX?: number[];
    scatterY?: number[];
    regLineX?: number[];
    regLineY?: number[];
    mean?: number;
    stdDev?: number;
    r2?: number;
    title?: string;
  };
  title?: string;
  type?: 'DISTRIBUTION_CURVE' | 'HISTOGRAM' | 'REGRESSION_PLOT';
}

export const DistributionCurve: React.FC<DistributionCurveProps> = ({
  data,
  title = 'Statistical Data & Probability Distribution Visualizer',
  type = 'DISTRIBUTION_CURVE',
}) => {
  const [mean, setMean] = useState<number>(data.mean ?? 0);
  const [stdDev, setStdDev] = useState<number>(data.stdDev ?? 1);

  let plotTraces: any[] = [];

  if (type === 'HISTOGRAM' || data.histogramData) {
    plotTraces = [
      {
        x: data.histogramData || [12, 15, 18, 22, 25, 30, 35, 40],
        type: 'histogram',
        name: 'Sample Frequency',
        marker: { color: '#a855f7' },
        opacity: 0.8,
      },
    ];
  } else if (type === 'REGRESSION_PLOT' || data.scatterX) {
    plotTraces = [
      {
        x: data.scatterX || [1, 2, 3, 4, 5],
        y: data.scatterY || [2.1, 3.8, 6.2, 8.1, 10.4],
        type: 'scatter',
        mode: 'markers',
        name: 'Sample Points (x_i, y_i)',
        marker: { color: '#00f2fe', size: 9 },
      },
      {
        x: data.regLineX || [1, 5],
        y: data.regLineY || [2.0, 10.5],
        type: 'scatter',
        mode: 'lines',
        name: `Regression Line (R² = ${data.r2 ?? 0.98})`,
        line: { color: '#00ff88', width: 2.5 },
      },
    ];
  } else {
    // DISTRIBUTION_CURVE default
    const xVals = Array.from({ length: 100 }, (_, i) => mean - 4 * stdDev + i * ((8 * stdDev) / 99));
    const yVals = xVals.map((xv) => (1 / (stdDev * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * ((xv - mean) / stdDev) ** 2));

    plotTraces = [
      {
        x: xVals,
        y: yVals,
        type: 'scatter',
        mode: 'lines',
        name: `N(μ=${mean.toFixed(1)}, σ=${stdDev.toFixed(1)})`,
        line: { color: '#00f2fe', width: 2.5 },
        fill: 'tozeroy',
        fillcolor: 'rgba(6, 182, 212, 0.2)',
      },
      {
        x: [mean, mean],
        y: [0, Math.max(...yVals)],
        type: 'scatter',
        mode: 'lines',
        name: `Mean μ = ${mean.toFixed(1)}`,
        line: { color: '#ff007f', width: 2, dash: 'dot' },
      },
    ];
  }

  return (
    <div className="w-full flex flex-col space-y-3 bg-slate-950/90 p-4 rounded-xl border border-slate-800">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold font-mono text-cyan-300">
          {data.title || title}
        </span>
        {data.r2 !== undefined && (
          <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20">
            Goodness of Fit R² = {data.r2}
          </span>
        )}
      </div>

      <div className="w-full h-72 rounded-lg overflow-hidden bg-slate-900 border border-slate-800">
        <Plot
          data={plotTraces}
          layout={{
            paper_bgcolor: 'rgba(0,0,0,0)',
            plot_bgcolor: 'rgba(15, 23, 42, 0.6)',
            font: { color: '#94a3b8', family: 'Inter, sans-serif' },
            margin: { l: 40, r: 20, t: 30, b: 40 },
            xaxis: { title: 'X', gridcolor: 'rgba(255,255,255,0.06)' },
            yaxis: { title: 'Probability / Frequency', gridcolor: 'rgba(255,255,255,0.06)' },
            autosize: true,
          }}
          useResizeHandler={true}
          className="w-full h-full"
          config={{ responsive: true, displayModeBar: false }}
        />
      </div>

      {type === 'DISTRIBUTION_CURVE' && (
        <div className="grid grid-cols-2 gap-4 bg-slate-900/80 p-3 rounded-lg border border-slate-800 text-xs font-mono">
          <div>
            <label className="text-slate-400 block mb-1">Mean (μ): {mean.toFixed(1)}</label>
            <input
              type="range"
              min="-5"
              max="5"
              step="0.5"
              value={mean}
              onChange={(e) => setMean(parseFloat(e.target.value))}
              className="w-full accent-cyan-400"
            />
          </div>
          <div>
            <label className="text-slate-400 block mb-1">Std Dev (σ): {stdDev.toFixed(1)}</label>
            <input
              type="range"
              min="0.5"
              max="3"
              step="0.1"
              value={stdDev}
              onChange={(e) => setStdDev(parseFloat(e.target.value))}
              className="w-full accent-cyan-400"
            />
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useState } from 'react';
import Plot from 'react-plotly.js';

interface FourierVisualizationProps {
  data: {
    t: number[];
    yTime: number[];
    freqW: number[];
    yFreq: number[];
    harmonicsData?: Array<{ count: number; y: number[] }>;
    title?: string;
  };
  title?: string;
}

export const FourierVisualization: React.FC<FourierVisualizationProps> = ({
  data,
  title = 'Fourier Harmonic Decomposition & Frequency Spectrum',
}) => {
  const { t = [], yTime = [], freqW = [], yFreq = [], harmonicsData = [] } = data;
  const [harmIndex, setHarmIndex] = useState<number>(harmonicsData.length > 0 ? harmonicsData.length - 1 : 0);

  const activeHarmonic = harmonicsData[harmIndex] || { count: 5, y: yTime };

  return (
    <div className="w-full flex flex-col space-y-3 bg-slate-950/90 p-4 rounded-xl border border-slate-800">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold font-mono text-cyan-300">
          {data.title || title}
        </span>
        <span className="text-xs font-mono font-bold text-violet-400 bg-violet-500/10 px-2.5 py-1 rounded border border-violet-500/20">
          Harmonics: N = {activeHarmonic.count}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Time Domain Plot */}
        <div className="w-full h-64 rounded-lg overflow-hidden bg-slate-900 border border-slate-800">
          <Plot
            data={[
              ...(yTime.length > 0 ? [{
                x: t,
                y: yTime,
                type: 'scatter',
                mode: 'lines',
                name: 'Exact f(t)',
                line: { color: '#334155', width: 2 },
              }] : []),
              {
                x: t,
                y: activeHarmonic.y,
                type: 'scatter',
                mode: 'lines',
                name: `Fourier (N=${activeHarmonic.count})`,
                line: { color: '#00f2fe', width: 2.5 },
              },
            ]}
            layout={{
              paper_bgcolor: 'rgba(0,0,0,0)',
              plot_bgcolor: 'rgba(15, 23, 42, 0.6)',
              font: { color: '#94a3b8', family: 'Inter, sans-serif' },
              margin: { l: 30, r: 15, t: 25, b: 30 },
              title: { text: 'Time Domain f(t)', font: { size: 12, color: '#e2e8f0' } },
              xaxis: { title: 't', gridcolor: 'rgba(255,255,255,0.06)' },
              yaxis: { title: 'Amplitude', gridcolor: 'rgba(255,255,255,0.06)' },
              autosize: true,
            }}
            useResizeHandler={true}
            className="w-full h-full"
            config={{ responsive: true, displayModeBar: false }}
          />
        </div>

        {/* Frequency Spectrum Plot */}
        <div className="w-full h-64 rounded-lg overflow-hidden bg-slate-900 border border-slate-800">
          <Plot
            data={[
              {
                x: freqW,
                y: yFreq,
                type: 'bar',
                name: '|F(ω)| Spectrum',
                marker: { color: '#a855f7' },
              },
            ]}
            layout={{
              paper_bgcolor: 'rgba(0,0,0,0)',
              plot_bgcolor: 'rgba(15, 23, 42, 0.6)',
              font: { color: '#94a3b8', family: 'Inter, sans-serif' },
              margin: { l: 30, r: 15, t: 25, b: 30 },
              title: { text: 'Frequency Domain Spectrum |F(ω)|', font: { size: 12, color: '#e2e8f0' } },
              xaxis: { title: 'ω', gridcolor: 'rgba(255,255,255,0.06)' },
              yaxis: { title: 'Magnitude', gridcolor: 'rgba(255,255,255,0.06)' },
              autosize: true,
            }}
            useResizeHandler={true}
            className="w-full h-full"
            config={{ responsive: true, displayModeBar: false }}
          />
        </div>
      </div>

      {/* Harmonics Slider */}
      {harmonicsData.length > 0 && (
        <div className="flex items-center justify-between bg-slate-900/80 px-4 py-2 rounded-lg border border-slate-800 text-xs">
          <span className="text-slate-300 font-mono">Progressive Harmonics Added:</span>
          <div className="flex items-center space-x-3 w-2/3">
            <input
              type="range"
              min="0"
              max={harmonicsData.length - 1}
              value={harmIndex}
              onChange={(e) => setHarmIndex(parseInt(e.target.value))}
              className="w-full accent-cyan-400"
            />
            <span className="text-cyan-300 font-mono font-bold w-12 text-right">N = {activeHarmonic.count}</span>
          </div>
        </div>
      )}
    </div>
  );
};

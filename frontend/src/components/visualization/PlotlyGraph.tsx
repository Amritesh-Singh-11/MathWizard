import React from 'react';
import Plot from 'react-plotly.js';

interface PlotlyGraphProps {
  vizData: any;
}

export const PlotlyGraph: React.FC<PlotlyGraphProps> = ({ vizData }) => {
  if (!vizData) return null;

  const { type, title, x, series, y, fillX, fillY, data } = vizData;

  let plotData: any[] = [];
  let layout: any = {
    title: { text: title || 'Mathematical Visualization', font: { color: '#e2e8f0', size: 14 } },
    paper_bgcolor: 'rgba(0,0,0,0)',
    plot_bgcolor: 'rgba(15, 23, 42, 0.6)',
    font: { color: '#94a3b8', family: 'Inter, sans-serif' },
    margin: { l: 40, r: 20, t: 40, b: 40 },
    xaxis: { gridcolor: 'rgba(255,255,255,0.06)', zerolinecolor: '#38bdf8' },
    yaxis: { gridcolor: 'rgba(255,255,255,0.06)', zerolinecolor: '#38bdf8' },
    autosize: true,
  };

  if (type === '2d_plot' && series) {
    plotData = series.map((s: any) => ({
      x: x,
      y: s.y,
      type: 'scatter',
      mode: 'lines',
      name: s.name,
      line: { color: s.color || '#00f2fe', width: 2.5 },
    }));
  } else if (type === 'area_plot') {
    plotData = [
      {
        x: x,
        y: y,
        type: 'scatter',
        mode: 'lines',
        name: 'f(x)',
        line: { color: '#00f2fe', width: 2.5 },
      },
      {
        x: fillX,
        y: fillY,
        type: 'scatter',
        fill: 'tozeroy',
        fillcolor: 'rgba(6, 182, 212, 0.25)',
        line: { color: '#06b6d4' },
        name: 'Integrated Area',
      },
    ];
  } else if (type === 'histogram' && data) {
    plotData = [
      {
        x: data,
        type: 'histogram',
        marker: { color: '#8b5cf6' },
        opacity: 0.75,
      },
    ];
  } else if (type === 'normal_dist') {
    plotData = [
      {
        x: x,
        y: y,
        type: 'scatter',
        mode: 'lines',
        name: 'Normal Curve',
        line: { color: '#38bdf8', width: 2.5 },
      },
    ];
  } else {
    // Default fallback line plot
    plotData = [
      {
        x: x || [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5],
        y: [25, 16, 9, 4, 1, 0, 1, 4, 9, 16, 25],
        type: 'scatter',
        mode: 'lines',
        line: { color: '#00f2fe', width: 2.5 },
      },
    ];
  }

  return (
    <div className="w-full h-72 rounded-xl overflow-hidden bg-slate-950/80 border border-slate-800 p-2">
      <Plot
        data={plotData}
        layout={layout}
        useResizeHandler={true}
        className="w-full h-full"
        config={{ displayModeBar: true, responsive: true }}
      />
    </div>
  );
};

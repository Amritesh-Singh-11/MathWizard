import React, { useState } from 'react';

interface ComplexPoint {
  label: string;
  real: number;
  imag: number;
  color?: string;
}

interface ComplexPlaneProps {
  data: {
    points?: ComplexPoint[];
    eulerAngle?: number;
    roots?: ComplexPoint[];
    title?: string;
  };
  title?: string;
}

export const ComplexPlane: React.FC<ComplexPlaneProps> = ({ data, title = 'Interactive Argand Complex Plane' }) => {
  const points = data.points || [
    { label: 'z1', real: 3, imag: 4, color: '#00f2fe' },
    { label: 'z2', real: 1, imag: 2, color: '#a855f7' },
  ];

  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const size = 300;
  const center = size / 2;
  const scale = 25 * zoomLevel;

  return (
    <div className="w-full flex flex-col space-y-3 bg-slate-950/90 p-4 rounded-xl border border-slate-800">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold font-mono text-cyan-300">
          {data.title || title}
        </span>
        <span className="text-xs font-mono font-bold text-violet-400 bg-violet-500/10 px-2.5 py-1 rounded border border-violet-500/20">
          Argand Axis: Re(z) vs Im(z)
        </span>
      </div>

      <div className="w-full flex justify-center py-2 bg-slate-900 rounded-lg border border-slate-800 relative">
        <svg width={size} height={size} className="select-none">
          {/* Grid lines */}
          {[-5, -4, -3, -2, -1, 1, 2, 3, 4, 5].map((i) => (
            <g key={i}>
              <line
                x1={center + i * scale}
                y1={0}
                x2={center + i * scale}
                y2={size}
                stroke="#1e293b"
                strokeDasharray="2 2"
              />
              <line
                x1={0}
                y1={center - i * scale}
                x2={size}
                y2={center - i * scale}
                stroke="#1e293b"
                strokeDasharray="2 2"
              />
            </g>
          ))}

          {/* Unit Circle */}
          <circle
            cx={center}
            cy={center}
            r={scale}
            fill="none"
            stroke="#38bdf8"
            strokeWidth="1"
            strokeDasharray="4 4"
            strokeOpacity="0.3"
          />

          {/* Main Axes */}
          <line x1={0} y1={center} x2={size} y2={center} stroke="#475569" strokeWidth="1.5" />
          <line x1={center} y1={0} x2={center} y2={size} stroke="#475569" strokeWidth="1.5" />

          {/* Axis Labels */}
          <text x={size - 20} y={center - 6} fill="#94a3b8" fontSize="10" fontFamily="monospace">
            Re
          </text>
          <text x={center + 6} y={15} fill="#94a3b8" fontSize="10" fontFamily="monospace">
            Im
          </text>

          {/* Render Vector Points */}
          {points.map((pt, idx) => {
            const cx = center + pt.real * scale;
            const cy = center - pt.imag * scale;
            const color = pt.color || '#00f2fe';
            const r = Math.sqrt(pt.real ** 2 + pt.imag ** 2);

            return (
              <g key={idx}>
                <circle
                  cx={center}
                  cy={center}
                  r={r * scale}
                  fill="none"
                  stroke={color}
                  strokeWidth="1"
                  strokeOpacity="0.2"
                  strokeDasharray="3 3"
                />
                <line x1={center} y1={center} x2={cx} y2={cy} stroke={color} strokeWidth="2" />
                <circle cx={cx} cy={cy} r="4" fill={color} />
                <text
                  x={cx + 6}
                  y={cy - 6}
                  fill={color}
                  fontSize="10"
                  fontWeight="bold"
                  fontFamily="monospace"
                >
                  {pt.label} ({pt.real} + {pt.imag}i)
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between bg-slate-900/80 px-4 py-2 rounded-lg border border-slate-800 text-xs">
        <span className="text-slate-400 font-mono text-[11px]">Zoom Scale:</span>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setZoomLevel((prev) => Math.max(0.5, prev - 0.2))}
            className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono"
          >
            -
          </button>
          <span className="text-cyan-300 font-mono font-bold w-12 text-center">
            {zoomLevel.toFixed(1)}x
          </span>
          <button
            onClick={() => setZoomLevel((prev) => Math.min(2.5, prev + 0.2))}
            className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

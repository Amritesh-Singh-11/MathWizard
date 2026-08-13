import React from 'react';

interface ArgandComplexPlaneProps {
  points?: Array<{ label: string; real: number; imag: number; color?: string }>;
  title?: string;
}

export const ArgandComplexPlane: React.FC<ArgandComplexPlaneProps> = ({
  points = [
    { label: 'z1', real: 3, imag: 4, color: '#00f2fe' },
    { label: 'z2', real: 1, imag: 2, color: '#a855f7' },
  ],
  title = 'Argand Complex Plane Diagram',
}) => {
  const size = 280;
  const center = size / 2;
  const scale = 25; // 25px per unit

  return (
    <div className="w-full flex flex-col items-center p-4 bg-slate-950/90 rounded-xl border border-slate-800 space-y-3">
      <div className="text-xs font-semibold text-cyan-300 font-mono self-start flex items-center justify-between w-full">
        <span>{title}</span>
        <span className="text-[10px] text-slate-400">Re(z) vs Im(z)</span>
      </div>

      <svg width={size} height={size} className="bg-slate-900/60 rounded-lg border border-slate-800/80">
        {/* Grid lines */}
        {[-4, -3, -2, -1, 1, 2, 3, 4].map((i) => (
          <g key={i}>
            <line
              x1={center + i * scale}
              y1={0}
              x2={center + i * scale}
              y2={size}
              stroke="#1e293b"
              strokeDasharray="3 3"
            />
            <line
              x1={0}
              y1={center - i * scale}
              x2={size}
              y2={center - i * scale}
              stroke="#1e293b"
              strokeDasharray="3 3"
            />
          </g>
        ))}

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

        {/* Vector Points */}
        {points.map((pt, idx) => {
          const cx = center + pt.real * scale;
          const cy = center - pt.imag * scale;
          const color = pt.color || '#00f2fe';
          const r = Math.sqrt(pt.real ** 2 + pt.imag ** 2);

          return (
            <g key={idx}>
              {/* Modulus Circle */}
              <circle
                cx={center}
                cy={center}
                r={r * scale}
                fill="none"
                stroke={color}
                strokeWidth="1"
                strokeOpacity="0.25"
                strokeDasharray="4 4"
              />

              {/* Vector Line */}
              <line
                x1={center}
                y1={center}
                x2={cx}
                y2={cy}
                stroke={color}
                strokeWidth="2"
              />

              {/* Vector Tip Point */}
              <circle cx={cx} cy={cy} r="4" fill={color} className="animate-pulse" />

              {/* Label */}
              <text
                x={cx + 6}
                y={cy - 6}
                fill={color}
                fontSize="11"
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
  );
};

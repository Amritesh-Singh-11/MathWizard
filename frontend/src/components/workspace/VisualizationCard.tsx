import React from 'react';
import { VisualizationRenderer, VisualizationPayload } from '../visualizations/VisualizationRenderer';
import { Eye } from 'lucide-react';

interface VisualizationCardProps {
  topicDomain: string;
  topicName: string;
  visualizationData?: any;
}

export const VisualizationCard: React.FC<VisualizationCardProps> = ({
  topicDomain,
  topicName,
  visualizationData,
}) => {
  let vizPayload: VisualizationPayload | null = null;

  if (visualizationData && typeof visualizationData === 'object') {
    const vizType = visualizationData.type || 'FUNCTION_2D_TANGENT';
    const vizTitle = visualizationData.title || `${topicName} Visual Interpretation`;
    // Extract inner data if double wrapped
    const innerData = visualizationData.data ? visualizationData.data : visualizationData;

    vizPayload = {
      type: vizType,
      title: vizTitle,
      data: innerData,
      config: visualizationData.config || {},
    };
  }

  return (
    <div className="glass-panel rounded-2xl p-6 shadow-xl border border-slate-800/80 space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
        <div className="flex items-center space-x-2">
          <div className="p-1 rounded bg-cyan-500/10 text-cyan-400">
            <Eye className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-cyan-300">
            Visual Interpretation
          </h3>
        </div>
        <span className="text-[11px] font-mono text-cyan-400/80 bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-md">
          Interactive Visualization
        </span>
      </div>

      <div>
        <VisualizationRenderer visualization={vizPayload} />
      </div>
    </div>
  );
};

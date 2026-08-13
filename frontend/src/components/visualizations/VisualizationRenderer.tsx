import React from 'react';
import { LimitVisualization } from './LimitVisualization';
import { TangentGraph } from './TangentGraph';
import { TaylorSeriesGraph } from './TaylorSeriesGraph';
import { AreaGraph } from './AreaGraph';
import { MatrixVisualization } from './MatrixVisualization';
import { MatrixTransformation } from './MatrixTransformation';
import { Vector2D } from './Vector2D';
import { Vector3D } from './Vector3D';
import { ComplexPlane } from './ComplexPlane';
import { DirectionField } from './DirectionField';
import { FourierVisualization } from './FourierVisualization';
import { ZPlane } from './ZPlane';
import { DistributionCurve } from './DistributionCurve';
import { IterationVisualization } from './IterationVisualization';
import { FeasibleRegion } from './FeasibleRegion';
import { Info, AlertTriangle } from 'lucide-react';

export interface VisualizationPayload {
  type: string;
  title?: string;
  data?: any;
  config?: any;
}

interface VisualizationRendererProps {
  visualization?: VisualizationPayload | null;
  error?: string;
}

export const VisualizationRenderer: React.FC<VisualizationRendererProps> = ({
  visualization,
  error,
}) => {
  if (error) {
    return (
      <div className="bg-slate-950/80 p-4 rounded-xl border border-amber-500/30 flex items-center space-x-3 text-xs text-amber-300">
        <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0" />
        <div>
          <span className="font-bold block">Visualization could not be generated for this calculation.</span>
          <span className="text-slate-400">{error}</span>
        </div>
      </div>
    );
  }

  if (!visualization || visualization.type === 'NONE' || visualization.type === 'none' || visualization.type === 'NOT_APPLICABLE') {
    return (
      <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 flex items-center space-x-3 text-xs text-slate-400">
        <Info className="w-4 h-4 text-cyan-400 flex-shrink-0" />
        <span>Visualization is not applicable for this operation.</span>
      </div>
    );
  }

  const rawType = (visualization.type || '').toUpperCase().trim();
  const data = visualization.data || {};
  const title = visualization.title || data.title;

  try {
    switch (rawType) {
      case 'LIMIT_APPROACH':
      case 'LIMIT':
        return <LimitVisualization data={data} title={title} />;

      case 'FUNCTION_2D_TANGENT':
      case 'FUNCTION_2D':
      case '2D_PLOT':
      case 'IMPLICIT_DIFFERENTIATION':
      case 'PARAMETRIC_DIFFERENTIATION':
        return <TangentGraph data={data} title={title} />;

      case 'TAYLOR_APPROXIMATION':
      case 'MACLAURIN_SERIES':
      case 'TAYLOR':
        return <TaylorSeriesGraph data={data} title={title} />;

      case 'AREA_UNDER_CURVE':
      case 'AREA_PLOT':
      case 'DEFINITE_INTEGRATION':
        return <AreaGraph data={data} title={title} />;

      case 'MATRIX_OPERATION':
      case 'GAUSSIAN_ELIMINATION':
      case 'MATRIX':
        return <MatrixVisualization data={data} title={title} />;

      case 'MATRIX_TRANSFORMATION':
      case 'MATRIX_TRANSFORM':
      case 'DETERMINANT':
      case 'EIGENVALUES':
      case 'EIGENVECTORS':
        return <MatrixTransformation data={data} title={title} />;

      case 'VECTOR_2D':
      case 'VECTOR_ADDITION':
      case 'VECTOR_SUBTRACTION':
        return <Vector2D data={data} title={title} />;

      case 'VECTOR_3D':
      case '3D_VECTORS':
      case 'VECTOR_PLOT':
      case 'CROSS_PRODUCT':
        return <Vector3D data={data} title={title} type="VECTOR_3D" />;

      case 'PLANE_3D':
        return <Vector3D data={data} title={title} type="PLANE_3D" />;

      case 'SURFACE_3D':
        return <Vector3D data={data} title={title} type="SURFACE_3D" />;

      case 'VOLUME_3D':
        return <Vector3D data={data} title={title} type="VOLUME_3D" />;

      case 'COMPLEX_PLANE':
      case 'POLAR_FORM':
      case 'EULER_FORM':
      case 'DE_MOIVRE':
      case 'COMPLEX_ROOTS':
        return <ComplexPlane data={data} title={title} />;

      case 'DIRECTION_FIELD':
      case 'PHASE_PORTRAIT':
        return <DirectionField data={data} title={title} />;

      case 'SIGNAL_TIME_DOMAIN':
      case 'FREQUENCY_DOMAIN':
      case 'FOURIER_APPROXIMATION':
      case 'LAPLACE_TRANSFORM':
        return <FourierVisualization data={data} title={title} />;

      case 'Z_PLANE':
        return <ZPlane data={data} title={title} />;

      case 'DISTRIBUTION_CURVE':
      case 'NORMAL_DIST':
      case 'NORMAL_DISTRIBUTION':
        return <DistributionCurve data={data} title={title} type="DISTRIBUTION_CURVE" />;

      case 'HISTOGRAM':
        return <DistributionCurve data={data} title={title} type="HISTOGRAM" />;

      case 'REGRESSION_PLOT':
      case 'SCATTER_PLOT':
        return <DistributionCurve data={data} title={title} type="REGRESSION_PLOT" />;

      case 'ITERATION_CONVERGENCE':
      case 'BISECTION_METHOD':
      case 'NEWTON_RAPHSON':
      case 'EULER_METHOD':
      case 'RUNGE_KUTTA':
        return <IterationVisualization data={data} title={title} />;

      case 'FEASIBLE_REGION':
      case 'LP_REGION':
      case 'OPTIMIZATION_SURFACE':
      case 'SIMPLEX_METHOD':
      case 'GRADIENT_DESCENT':
        return <FeasibleRegion data={data} title={title} />;

      default:
        return <TangentGraph data={data} title={title} />;
    }
  } catch (err: any) {
    return (
      <div className="bg-slate-950/80 p-4 rounded-xl border border-amber-500/30 flex items-center space-x-3 text-xs text-amber-300">
        <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0" />
        <div>
          <span className="font-bold block">Visualization could not be generated for this calculation.</span>
          <span className="text-slate-400">{err?.message || 'Rendering error'}</span>
        </div>
      </div>
    );
  }
};

export interface MathTopic {
  id: string;
  name: string;
  domain: string;
  description: string;
  defaultExpression: string;
  placeholder: string;
  inputType: 'expression' | 'matrix' | 'vector' | 'stats' | 'numerical' | 'complex' | 'opt' | 'de' | 'geometry';
  formula: string;
  defaultParams?: Record<string, any>;
}

export interface DomainCategory {
  id: string;
  name: string;
  icon: string;
  topics: MathTopic[];
}

export const DOMAINS_DATA: DomainCategory[] = [
  {
    id: 'calculus',
    name: '1. Calculus',
    icon: 'Sigma',
    topics: [
      { id: 'limits', name: 'Limits', domain: 'Calculus', description: 'Evaluate limit of f(x) as x approaches value a', defaultExpression: '(x^2 - 4)/(x - 2)', placeholder: '(x^2 - 4)/(x - 2)', inputType: 'expression', formula: '\\lim_{x \\to a} f(x)', defaultParams: { limitPoint: 2, direction: 'both', variable: 'x' } },
      { id: 'continuity', name: 'Continuity', domain: 'Calculus', description: 'Check continuity of f(x) at point a', defaultExpression: 'x^2 + 2*x + 1', placeholder: 'x^2 + 2*x + 1', inputType: 'expression', formula: '\\lim_{x \\to a} f(x) = f(a)', defaultParams: { limitPoint: 1, variable: 'x' } },
      { id: 'differentiation', name: 'Differentiation', domain: 'Calculus', description: 'Find first derivative f\'(x)', defaultExpression: 'x^2 + 5*x + sin(x)', placeholder: 'x^2 + 5*x + sin(x)', inputType: 'expression', formula: '\\frac{d}{dx} f(x)', defaultParams: { variable: 'x' } },
      { id: 'higher-order-derivatives', name: 'Higher Order Derivatives', domain: 'Calculus', description: 'Find nth derivative f^(n)(x)', defaultExpression: 'x^4 + 3*x^3 + 2*x', placeholder: 'x^4 + 3*x^3', inputType: 'expression', formula: '\\frac{d^n}{dx^n} f(x)', defaultParams: { order: 2, variable: 'x' } },
      { id: 'partial-differentiation', name: 'Partial Differentiation', domain: 'Calculus', description: 'Partial derivative w.r.t variable', defaultExpression: 'x^2*y + sin(x*y)', placeholder: 'x^2*y + sin(x*y)', inputType: 'expression', formula: '\\frac{\\partial f}{\\partial x}', defaultParams: { variable: 'x' } },
      { id: 'total-differentiation', name: 'Total Differentiation', domain: 'Calculus', description: 'Total differential df = (fx)dx + (fy)dy', defaultExpression: 'x^3*y^2', placeholder: 'x^3*y^2', inputType: 'expression', formula: 'df = \\frac{\\partial f}{\\partial x}dx + \\frac{\\partial f}{\\partial y}dy', defaultParams: {} },
      { id: 'implicit-differentiation', name: 'Implicit Differentiation', domain: 'Calculus', description: 'Differentiate implicit equation F(x,y) = 0', defaultExpression: 'x^2 + y^2 - 25', placeholder: 'x^2 + y^2 - 25', inputType: 'expression', formula: '\\frac{dy}{dx} = -\\frac{F_x}{F_y}', defaultParams: {} },
      { id: 'parametric-differentiation', name: 'Parametric Differentiation', domain: 'Calculus', description: 'Derivative of parametric equations x(t), y(t)', defaultExpression: 'cos(t)', placeholder: 'cos(t)', inputType: 'expression', formula: '\\frac{dy}{dx} = \\frac{dy/dt}{dx/dt}', defaultParams: { yExpr: 'sin(t)', paramVar: 't' } },
      { id: 'maxima-minima', name: 'Maxima and Minima', domain: 'Calculus', description: 'Find critical points and local extrema', defaultExpression: 'x^3 - 3*x^2 + 2', placeholder: 'x^3 - 3*x^2 + 2', inputType: 'expression', formula: 'f\'(x) = 0, \\quad f\'\'(x)', defaultParams: { variable: 'x' } },
      { id: 'taylor-series', name: 'Taylor Series', domain: 'Calculus', description: 'Taylor polynomial expansion around point a', defaultExpression: 'exp(x)', placeholder: 'exp(x)', inputType: 'expression', formula: '\\sum \\frac{f^{(n)}(a)}{n!}(x-a)^n', defaultParams: { point: 0, terms: 4, variable: 'x' } },
      { id: 'maclaurin-series', name: 'Maclaurin Series', domain: 'Calculus', description: 'Taylor expansion centered at a = 0', defaultExpression: 'sin(x)', placeholder: 'sin(x)', inputType: 'expression', formula: '\\sum \\frac{f^{(n)}(0)}{n!}x^n', defaultParams: { terms: 4, variable: 'x' } },
      { id: 'indefinite-integration', name: 'Indefinite Integration', domain: 'Calculus', description: 'Find general antiderivative F(x) + C', defaultExpression: 'x*exp(x)', placeholder: 'x*exp(x)', inputType: 'expression', formula: '\\int f(x) dx', defaultParams: { variable: 'x' } },
      { id: 'definite-integration', name: 'Definite Integration', domain: 'Calculus', description: 'Evaluate integral from lower to upper bound', defaultExpression: 'x^2', placeholder: 'x^2', inputType: 'expression', formula: '\\int_{a}^{b} f(x) dx', defaultParams: { lowerBound: 0, upperBound: 2, variable: 'x' } },
      { id: 'double-integration', name: 'Double Integration', domain: 'Calculus', description: 'Integrate function over 2D region', defaultExpression: 'x*y', placeholder: 'x*y', inputType: 'expression', formula: '\\iint f(x,y) dx dy', defaultParams: { xLower: 0, xUpper: 1, yLower: 0, yUpper: 2 } },
      { id: 'triple-integration', name: 'Triple Integration', domain: 'Calculus', description: 'Volume integral over 3D region', defaultExpression: 'x*y*z', placeholder: 'x*y*z', inputType: 'expression', formula: '\\iiint f(x,y,z) dx dy dz', defaultParams: { xLower: 0, xUpper: 1, yLower: 0, yUpper: 1, zLower: 0, zUpper: 1 } }
    ]
  },
  {
    id: 'linear-algebra',
    name: '2. Linear Algebra',
    icon: 'Grid',
    topics: [
      { id: 'matrix-addition', name: 'Matrix Addition', domain: 'Linear Algebra', description: 'Compute elementwise matrix sum A + B', defaultExpression: 'Matrix A + B', placeholder: 'Select dimensions & fill grid', inputType: 'matrix', formula: 'C_{ij} = A_{ij} + B_{ij}', defaultParams: { rowsA: 2, colsA: 2, rowsB: 2, colsB: 2, matrixA: [[1, 2], [3, 4]], matrixB: [[5, 6], [7, 8]] } },
      { id: 'matrix-subtraction', name: 'Matrix Subtraction', domain: 'Linear Algebra', description: 'Compute elementwise difference A - B', defaultExpression: 'Matrix A - B', placeholder: 'Select dimensions & fill grid', inputType: 'matrix', formula: 'C_{ij} = A_{ij} - B_{ij}', defaultParams: { rowsA: 2, colsA: 2, rowsB: 2, colsB: 2, matrixA: [[1, 2], [3, 4]], matrixB: [[5, 6], [7, 8]] } },
      { id: 'matrix-multiplication', name: 'Matrix Multiplication', domain: 'Linear Algebra', description: 'Compute matrix product A × B', defaultExpression: 'Matrix A * B', placeholder: 'Select dimensions & fill grid', inputType: 'matrix', formula: 'C_{ik} = \\sum A_{ij}B_{jk}', defaultParams: { rowsA: 2, colsA: 2, rowsB: 2, colsB: 2, matrixA: [[1, 2], [3, 4]], matrixB: [[5, 6], [7, 8]] } },
      { id: 'matrix-transpose', name: 'Matrix Transpose', domain: 'Linear Algebra', description: 'Swap rows and columns A^T', defaultExpression: 'Matrix A', placeholder: 'Select dimensions & fill grid', inputType: 'matrix', formula: 'A^T_{ij} = A_{ji}', defaultParams: { rowsA: 2, colsA: 3, matrixA: [[1, 2, 3], [4, 5, 6]] } },
      { id: 'matrix-inverse', name: 'Matrix Inverse', domain: 'Linear Algebra', description: 'Compute inverse matrix A^-1', defaultExpression: 'Matrix A', placeholder: 'Select dimensions & fill grid', inputType: 'matrix', formula: 'A^{-1} = \\frac{1}{\\det(A)} \\text{adj}(A)', defaultParams: { rowsA: 2, colsA: 2, matrixA: [[4, 7], [2, 6]] } },
      { id: 'determinant-calculation', name: 'Determinant Calculation', domain: 'Linear Algebra', description: 'Find scalar det(A) of square matrix', defaultExpression: 'Matrix A', placeholder: 'Select dimensions & fill grid', inputType: 'matrix', formula: '\\det(A) = |A|', defaultParams: { rowsA: 2, colsA: 2, matrixA: [[4, 7], [2, 6]] } },
      { id: 'rank-of-matrix', name: 'Rank of Matrix', domain: 'Linear Algebra', description: 'Number of linearly independent rows', defaultExpression: 'Matrix A', placeholder: 'Select dimensions & fill grid', inputType: 'matrix', formula: '\\text{Rank}(A)', defaultParams: { rowsA: 3, colsA: 3, matrixA: [[1, 2, 3], [2, 4, 6], [1, 1, 1]] } },
      { id: 'gaussian-elimination', name: 'Gaussian Elimination', domain: 'Linear Algebra', description: 'Stepwise row reduction to echelon form', defaultExpression: 'Augmented Matrix [A|B]', placeholder: 'Select dimensions & fill grid', inputType: 'matrix', formula: '[A | B] \\to [I | X]', defaultParams: { rowsA: 3, colsA: 4, inputMode: 'augmented', matrixA: [[2, 1, -1, 8], [-3, -1, 2, -11], [-2, 1, 2, -3]] } },
      { id: 'eigenvalues', name: 'Eigenvalues', domain: 'Linear Algebra', description: 'Solve det(A - λI) = 0', defaultExpression: 'Matrix A', placeholder: 'Select dimensions & fill grid', inputType: 'matrix', formula: 'A v = \\lambda v', defaultParams: { rowsA: 2, colsA: 2, matrixA: [[4, 1], [2, 3]] } },
      { id: 'eigenvectors', name: 'Eigenvectors', domain: 'Linear Algebra', description: 'Find non-zero eigenvectors v', defaultExpression: 'Matrix A', placeholder: 'Select dimensions & fill grid', inputType: 'matrix', formula: '(A - \\lambda I)v = 0', defaultParams: { rowsA: 2, colsA: 2, matrixA: [[4, 1], [2, 3]] } },
      { id: 'linear-equation-solver', name: 'Linear Equation Solver', domain: 'Linear Algebra', description: 'Solve AX = B linear system', defaultExpression: 'AX = B System', placeholder: 'Select dimension & fill system', inputType: 'matrix', formula: 'X = A^{-1}B', defaultParams: { rowsA: 2, colsA: 2, matrixA: [[2, 3], [1, -1]], vectorB: [7, 1] } }
    ]
  },
  {
    id: 'vector-math',
    name: '3. Vector Mathematics',
    icon: 'ArrowUpRight',
    topics: [
      { id: 'vector-addition', name: 'Vector Addition', domain: 'Vector Mathematics', description: 'Componentwise vector sum u + v', defaultExpression: 'u + v', placeholder: 'Fill vector components', inputType: 'vector', formula: '\\vec{u} + \\vec{v}', defaultParams: { vectorU: [1, 2, 3], vectorV: [4, 5, 6] } },
      { id: 'vector-subtraction', name: 'Vector Subtraction', domain: 'Vector Mathematics', description: 'Componentwise vector difference u - v', defaultExpression: 'u - v', placeholder: 'Fill vector components', inputType: 'vector', formula: '\\vec{u} - \\vec{v}', defaultParams: { vectorU: [5, 7, 9], vectorV: [1, 2, 3] } },
      { id: 'vector-magnitude', name: 'Vector Magnitude', domain: 'Vector Mathematics', description: 'Euclidean norm |u|', defaultExpression: '|u|', placeholder: 'Fill vector components', inputType: 'vector', formula: '|\\vec{u}| = \\sqrt{u_x^2 + u_y^2 + u_z^2}', defaultParams: { vectorU: [3, 4, 12] } },
      { id: 'dot-product', name: 'Dot Product', domain: 'Vector Mathematics', description: 'Scalar product u · v', defaultExpression: 'u . v', placeholder: 'Fill vector components', inputType: 'vector', formula: '\\vec{u} \\cdot \\vec{v} = |u||v|\\cos\\theta', defaultParams: { vectorU: [1, 2, 3], vectorV: [4, -5, 6] } },
      { id: 'cross-product', name: 'Cross Product', domain: 'Vector Mathematics', description: 'Vector orthogonal to u and v', defaultExpression: 'u x v', placeholder: 'Fill vector components', inputType: 'vector', formula: '\\vec{u} \\times \\vec{v}', defaultParams: { vectorU: [1, 0, 0], vectorV: [0, 1, 0] } },
      { id: 'scalar-projection', name: 'Scalar Projection', domain: 'Vector Mathematics', description: 'Length of projection of u onto v', defaultExpression: 'comp_v(u)', placeholder: 'Fill vector components', inputType: 'vector', formula: '\\text{comp}_{v}u = \\frac{\\vec{u} \\cdot \\vec{v}}{|v|}', defaultParams: { vectorU: [3, 4, 0], vectorV: [1, 0, 0] } },
      { id: 'vector-projection', name: 'Vector Projection', domain: 'Vector Mathematics', description: 'Vector projection of u onto v', defaultExpression: 'proj_v(u)', placeholder: 'Fill vector components', inputType: 'vector', formula: '\\text{proj}_{v}u = \\frac{\\vec{u} \\cdot \\vec{v}}{|v|^2}\\vec{v}', defaultParams: { vectorU: [3, 4, 0], vectorV: [1, 0, 0] } },
      { id: 'scalar-triple-product', name: 'Scalar Triple Product', domain: 'Vector Mathematics', description: 'Parallelepiped volume u · (v × w)', defaultExpression: 'u . (v x w)', placeholder: 'Fill vector components', inputType: 'vector', formula: '\\vec{u} \\cdot (\\vec{v} \\times \\vec{w})', defaultParams: { vectorU: [1, 0, 0], vectorV: [0, 1, 0], vectorW: [0, 0, 1] } },
      { id: 'vector-triple-product', name: 'Vector Triple Product', domain: 'Vector Mathematics', description: 'Expansion u × (v × w)', defaultExpression: 'u x (v x w)', placeholder: 'Fill vector components', inputType: 'vector', formula: '\\vec{u} \\times (\\vec{v} \\times \\vec{w})', defaultParams: { vectorU: [1, 2, 3], vectorV: [4, 5, 6], vectorW: [7, 8, 9] } },
      { id: 'line-equation-3d', name: 'Line Equation in 3D', domain: 'Vector Mathematics', description: 'Parametric line r(t) = r0 + t*d', defaultExpression: 'r(t) = r0 + t*d', placeholder: 'Point + Direction Vector', inputType: 'vector', formula: '\\vec{r} = \\vec{r_0} + t\\vec{d}', defaultParams: { mode: 'point_dir', point: [1, 2, 3], direction: [2, -1, 4], point2: [3, 1, 7] } },
      { id: 'plane-equation', name: 'Plane Equation', domain: 'Vector Mathematics', description: 'Plane equation Ax + By + Cz + D = 0', defaultExpression: 'Normal * (r - r0) = 0', placeholder: 'Point + Normal Vector', inputType: 'vector', formula: 'n_x(x-x_0) + n_y(y-y_0) + n_z(z-z_0) = 0', defaultParams: { mode: 'point_normal', point: [1, 2, 3], normal: [2, 1, -1], point2: [0, 1, 2], point3: [2, 3, 1] } }
    ]
  },
  {
    id: 'coordinate-geometry',
    name: '4. Coordinate Geometry',
    icon: 'Maximize2',
    topics: [
      { id: 'distance-between-points', name: 'Distance Between Points', domain: 'Coordinate Geometry', description: 'Euclidean distance d = √((x2-x1)² + (y2-y1)²)', defaultExpression: 'P1(0,0), P2(4,3)', placeholder: 'x1, y1, x2, y2', inputType: 'geometry', formula: 'd = \\sqrt{(x_2-x_1)^2 + (y_2-y_1)^2}', defaultParams: { x1: 0, y1: 0, x2: 4, y2: 3 } },
      { id: 'midpoint-formula', name: 'Midpoint Formula', domain: 'Coordinate Geometry', description: 'Midpoint M between 2 points', defaultExpression: 'P1(0,0), P2(4,3)', placeholder: 'x1, y1, x2, y2', inputType: 'geometry', formula: 'M = \\left(\\frac{x_1+x_2}{2}, \\frac{y_1+y_2}{2}\\right)', defaultParams: { x1: 0, y1: 0, x2: 4, y2: 3 } },
      { id: 'slope-calculation', name: 'Slope Calculation', domain: 'Coordinate Geometry', description: 'Line gradient m = (y2-y1)/(x2-x1)', defaultExpression: 'P1(0,0), P2(4,3)', placeholder: 'x1, y1, x2, y2', inputType: 'geometry', formula: 'm = \\frac{y_2 - y_1}{x_2 - x_1}', defaultParams: { x1: 0, y1: 0, x2: 4, y2: 3 } },
      { id: 'equation-of-line', name: 'Equation of Line', domain: 'Coordinate Geometry', description: 'Slope-intercept form y = mx + c', defaultExpression: 'P1(0,0), P2(4,3)', placeholder: 'x1, y1, x2, y2', inputType: 'geometry', formula: 'y - y_1 = m(x - x_1)', defaultParams: { x1: 0, y1: 0, x2: 4, y2: 3 } },
      { id: 'circle-equation', name: 'Circle Equation', domain: 'Coordinate Geometry', description: 'Standard circle (x-h)² + (y-k)² = r²', defaultExpression: '(x-0)^2 + (y-0)^2 = 25', placeholder: 'Center (h,k), Radius r', inputType: 'geometry', formula: '(x-h)^2 + (y-k)^2 = r^2', defaultParams: { h: 0, k: 0, r: 5 } },
      { id: 'parabola', name: 'Parabola', domain: 'Coordinate Geometry', description: 'Standard parabola y² = 4ax', defaultExpression: 'y^2 = 4*x', placeholder: 'Parameter a', inputType: 'geometry', formula: 'y^2 = 4ax', defaultParams: { a: 1, orientation: 'horizontal' } },
      { id: 'ellipse', name: 'Ellipse', domain: 'Coordinate Geometry', description: 'Standard ellipse x²/a² + y²/b² = 1', defaultExpression: 'x^2/16 + y^2/9 = 1', placeholder: 'a, b values', inputType: 'geometry', formula: '\\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1', defaultParams: { a: 4, b: 3 } },
      { id: 'hyperbola', name: 'Hyperbola', domain: 'Coordinate Geometry', description: 'Standard hyperbola x²/a² - y²/b² = 1', defaultExpression: 'x^2/16 - y^2/9 = 1', placeholder: 'a, b values', inputType: 'geometry', formula: '\\frac{x^2}{a^2} - \\frac{y^2}{b^2} = 1', defaultParams: { a: 4, b: 3 } },
      { id: 'conic-sections', name: 'Conic Sections', domain: 'Coordinate Geometry', description: 'General second-degree conic Ax² + Bxy + Cy² + Dx + Ey + F = 0', defaultExpression: 'x^2 + y^2 - 16', placeholder: 'Conic parameters', inputType: 'geometry', formula: 'Ax^2 + Bxy + Cy^2 + Dx + Ey + F = 0', defaultParams: { A: 1, B: 0, C: 1, D: 0, E: 0, F: -16 } }
    ]
  },
  {
    id: 'differential-equations',
    name: '5. Differential Equations',
    icon: 'Activity',
    topics: [
      { id: 'first-order-de', name: 'First Order Differential Equations', domain: 'Differential Equations', description: 'Solve dy/dx + P(x)y = Q(x)', defaultExpression: 'dy/dx + y - x', placeholder: 'dy/dx + P(x)y = Q(x)', inputType: 'de', formula: '\\frac{dy}{dx} + P(x)y = Q(x)', defaultParams: { deExpr: 'dy/dx + y - x', hasIC: false, x0: 0, y0: 1 } },
      { id: 'separable-de', name: 'Separable Differential Equations', domain: 'Differential Equations', description: 'Solve g(y) dy = f(x) dx', defaultExpression: 'dy/dx - x/y', placeholder: 'dy/dx = f(x)g(y)', inputType: 'de', formula: 'g(y)dy = f(x)dx', defaultParams: { deExpr: 'dy/dx - x/y', hasIC: false, x0: 0, y0: 1 } },
      { id: 'linear-de', name: 'Linear Differential Equations', domain: 'Differential Equations', description: 'Solve via Integrating Factor μ(x)', defaultExpression: 'dy/dx + 2*y - exp(x)', placeholder: 'dy/dx + P(x)y = Q(x)', inputType: 'de', formula: '\\mu(x) = e^{\\int P(x)dx}', defaultParams: { deExpr: 'dy/dx + 2*y - exp(x)' } },
      { id: 'bernoulli-equation', name: 'Bernoulli Equation', domain: 'Differential Equations', description: 'Non-linear ODE y\' + P(x)y = Q(x)y^n', defaultExpression: 'dy/dx + y - x*y^2', placeholder: 'dy/dx + P(x)y = Q(x)y^n', inputType: 'de', formula: 'y\' + P(x)y = Q(x)y^n', defaultParams: { deExpr: 'dy/dx + y - x*y^2' } },
      { id: 'exact-de', name: 'Exact Differential Equation', domain: 'Differential Equations', description: 'M(x,y)dx + N(x,y)dy = 0 check exactness', defaultExpression: '(2*x*y) + (x^2)*dy/dx', placeholder: 'M(x,y) + N(x,y)dy/dx', inputType: 'de', formula: '\\frac{\\partial M}{\\partial y} = \\frac{\\partial N}{\\partial x}', defaultParams: { deExpr: '(2*x*y) + (x^2)*dy/dx' } },
      { id: 'second-order-de', name: 'Second Order Differential Equations', domain: 'Differential Equations', description: 'Linear ODE y\'\' + a y\' + b y = f(x)', defaultExpression: 'y\'\' + 5*y\' + 6*y', placeholder: 'a*y\'\' + b*y\' + c*y = 0', inputType: 'de', formula: 'a y\'\' + b y\' + c y = f(x)', defaultParams: { deExpr: 'y\'\' + 5*y\' + 6*y', hasIC: false, x0: 0, y0: 1, dy0: 0 } },
      { id: 'higher-order-de', name: 'Higher Order Differential Equations', domain: 'Differential Equations', description: 'n-th order constant coefficient ODE', defaultExpression: 'y\'\'\' - 6*y\'\' + 11*y\' - 6*y', placeholder: 'a_n y^{(n)} + ... + a_0 y = 0', inputType: 'de', formula: 'a_n y^{(n)} + \\dots + a_0 y = 0', defaultParams: { deExpr: 'y\'\'\' - 6*y\'\' + 11*y\' - 6*y' } },
      { id: 'system-of-de', name: 'System of Differential Equations', domain: 'Differential Equations', description: 'Coupled linear system X\' = AX', defaultExpression: 'dx/dt = x + y, dy/dt = 4*x - 2*y', placeholder: 'dx/dt = a*x + b*y, dy/dt = c*x + d*y', inputType: 'de', formula: '\\frac{d\\mathbf{X}}{dt} = \\mathbf{A}\\mathbf{X}', defaultParams: { sysExpr1: 'x + y', sysExpr2: '4*x - 2*y' } },
      { id: 'partial-de', name: 'Partial Differential Equations', domain: 'Differential Equations', description: 'Heat, Wave, or Laplace PDE', defaultExpression: 'd^2u/dx^2 + d^2u/dy^2', placeholder: 'd^2u/dx^2 + d^2u/dy^2 = 0', inputType: 'de', formula: '\\nabla^2 u = 0', defaultParams: { deExpr: 'd^2u/dx^2 + d^2u/dy^2' } }
    ]
  },
  {
    id: 'complex-math',
    name: '6. Complex Numbers',
    icon: 'Compass',
    topics: [
      { id: 'complex-addition', name: 'Complex Number Addition', domain: 'Complex Numbers', description: 'Add (a+bi) + (c+di)', defaultExpression: 'z1 = 3+4i, z2 = 1+2i', placeholder: 'Fill z1 and z2 parts', inputType: 'complex', formula: '(a+bi) + (c+di) = (a+c) + (b+d)i', defaultParams: { z1_real: 3, z1_imag: 4, z2_real: 1, z2_imag: 2 } },
      { id: 'complex-multiplication', name: 'Complex Number Multiplication', domain: 'Complex Numbers', description: 'Multiply (a+bi)(c+di)', defaultExpression: 'z1 = 3+4i, z2 = 1+2i', placeholder: 'Fill z1 and z2 parts', inputType: 'complex', formula: '(a+bi)(c+di) = (ac-bd) + (ad+bc)i', defaultParams: { z1_real: 3, z1_imag: 4, z2_real: 1, z2_imag: 2 } },
      { id: 'complex-division', name: 'Complex Division', domain: 'Complex Numbers', description: 'Divide (a+bi) / (c+di)', defaultExpression: 'z1 = 3+4i, z2 = 1+2i', placeholder: 'Fill z1 and z2 parts', inputType: 'complex', formula: '\\frac{z_1}{z_2} = \\frac{z_1 \\bar{z_2}}{|z_2|^2}', defaultParams: { z1_real: 3, z1_imag: 4, z2_real: 1, z2_imag: 2 } },
      { id: 'polar-form', name: 'Polar Form', domain: 'Complex Numbers', description: 'Convert z = a+bi to r(cosθ + i sinθ)', defaultExpression: '3 + 4i', placeholder: 'a + bi', inputType: 'complex', formula: 'z = r(\\cos\\theta + i\\sin\\theta)', defaultParams: { real: 3, imag: 4 } },
      { id: 'euler-form', name: 'Euler Form', domain: 'Complex Numbers', description: 'Convert to Exponential form z = r e^(iθ)', defaultExpression: '3 + 4i', placeholder: 'a + bi', inputType: 'complex', formula: 'z = r e^{i\\theta}', defaultParams: { real: 3, imag: 4 } },
      { id: 'de-moivre-theorem', name: 'De Moivre Theorem', domain: 'Complex Numbers', description: 'Compute z^n = r^n(cos nθ + i sin nθ)', defaultExpression: '(1 + i)^8', placeholder: 'z = a+bi, power n', inputType: 'complex', formula: '(r e^{i\\theta})^n = r^n e^{in\\theta}', defaultParams: { real: 1, imag: 1, n: 8 } },
      { id: 'complex-roots', name: 'Complex Roots', domain: 'Complex Numbers', description: 'Find all n-th roots of complex number', defaultExpression: 'z^3 = 1 + i', placeholder: 'z = a+bi, root n', inputType: 'complex', formula: 'w_k = r^{1/n} e^{i \\frac{\\theta + 2k\\pi}{n}}', defaultParams: { real: 1, imag: 1, n: 3 } },
      { id: 'complex-plane-vis', name: 'Complex Plane Visualization', domain: 'Complex Numbers', description: 'Plot Argand diagram & vector magnitude', defaultExpression: '3 + 4i', placeholder: 'Enter complex number(s)', inputType: 'complex', formula: 'z = x + iy \\in \\mathbb{C}', defaultParams: { real: 3, imag: 4 } }
    ]
  },
  {
    id: 'transform-methods',
    name: '7. Transforms',
    icon: 'Radio',
    topics: [
      { id: 'laplace-transform', name: 'Laplace Transform', domain: 'Transforms', description: 'Compute L{f(t)} = F(s)', defaultExpression: 'exp(-2*t)*sin(3*t)', placeholder: 'exp(-2*t)*sin(3*t)', inputType: 'expression', formula: '\\mathcal{L}\\{f(t)\\} = \\int_0^\\infty f(t)e^{-st}dt', defaultParams: { variable: 't' } },
      { id: 'inverse-laplace-transform', name: 'Inverse Laplace Transform', domain: 'Transforms', description: 'Compute L^-1{F(s)} = f(t)', defaultExpression: '1/(s^2 + 4)', placeholder: '1/(s^2 + 4)', inputType: 'expression', formula: '\\mathcal{L}^{-1}\\{F(s)\\}', defaultParams: { variable: 's' } },
      { id: 'fourier-series', name: 'Fourier Series', domain: 'Transforms', description: 'Expand periodic signal f(t) into sines & cosines', defaultExpression: 'x', placeholder: 'x', inputType: 'expression', formula: 'f(x) = \\frac{a_0}{2} + \\sum (a_n\\cos nx + b_n\\sin nx)', defaultParams: { period: 'pi', terms: 5, variable: 'x' } },
      { id: 'fourier-transform', name: 'Fourier Transform', domain: 'Transforms', description: 'Continuous spectrum F(ω)', defaultExpression: 'exp(-abs(t))', placeholder: 'exp(-abs(t))', inputType: 'expression', formula: '\\mathcal{F}\\{f(t)\\} = \\int_{-\\infty}^\\infty f(t)e^{-i\\omega t}dt', defaultParams: { variable: 't' } },
      { id: 'z-transform', name: 'Z Transform', domain: 'Transforms', description: 'Discrete-time Z-domain transfer function X(z)', defaultExpression: '(0.5)^n', placeholder: '(0.5)^n', inputType: 'expression', formula: '\\mathcal{Z}\\{x[n]\\} = \\sum_{n=0}^\\infty x[n]z^{-n}', defaultParams: { variable: 'n' } }
    ]
  },
  {
    id: 'probability-stats',
    name: '8. Probability & Statistics',
    icon: 'BarChart2',
    topics: [
      { id: 'probability-calc', name: 'Probability Calculation', domain: 'Probability & Statistics', description: 'Calculate event probabilities P(A), P(B), P(A∩B)', defaultExpression: 'P(A)=0.5, P(B)=0.3', placeholder: 'P(A), P(B)', inputType: 'stats', formula: 'P(A) = \\frac{n(A)}{n(S)}', defaultParams: { pA: 0.5, pB: 0.3, pAandB: 0.15 } },
      { id: 'permutations', name: 'Permutations', domain: 'Probability & Statistics', description: 'P(n, r) = n! / (n-r)!', defaultExpression: 'n=5, r=2', placeholder: 'n=5, r=2', inputType: 'stats', formula: 'P(n,r) = \\frac{n!}{(n-r)!}', defaultParams: { n: 5, r: 2 } },
      { id: 'combinations', name: 'Combinations', domain: 'Probability & Statistics', description: 'C(n, r) = n! / (r!(n-r)!)', defaultExpression: 'n=5, r=2', placeholder: 'n=5, r=2', inputType: 'stats', formula: 'C(n,r) = \\frac{n!}{r!(n-r)!}', defaultParams: { n: 5, r: 2 } },
      { id: 'mean', name: 'Mean', domain: 'Probability & Statistics', description: 'Arithmetic mean μ = ∑ x / N', defaultExpression: '12, 15, 18, 22, 25', placeholder: '12, 15, 18, 22, 25', inputType: 'stats', formula: '\\mu = \\frac{1}{N}\\sum x_i', defaultParams: { dataArray: '12, 15, 18, 22, 25, 30, 35, 40' } },
      { id: 'median', name: 'Median', domain: 'Probability & Statistics', description: 'Middle value of ordered sample', defaultExpression: '12, 15, 18, 22, 25', placeholder: '12, 15, 18, 22, 25', inputType: 'stats', formula: '\\text{Median}(X)', defaultParams: { dataArray: '12, 15, 18, 22, 25, 30, 35, 40' } },
      { id: 'mode', name: 'Mode', domain: 'Probability & Statistics', description: 'Most frequent observation', defaultExpression: '12, 15, 18, 22, 25', placeholder: '12, 15, 18, 22, 25', inputType: 'stats', formula: '\\text{Mode}(X)', defaultParams: { dataArray: '12, 15, 18, 22, 25, 22, 30, 35' } },
      { id: 'variance', name: 'Variance', domain: 'Probability & Statistics', description: 'Variance s² = ∑(x - μ)² / (N-1)', defaultExpression: '12, 15, 18, 22, 25', placeholder: '12, 15, 18, 22, 25', inputType: 'stats', formula: 's^2 = \\frac{1}{N-1}\\sum(x_i-\\mu)^2', defaultParams: { dataArray: '12, 15, 18, 22, 25, 30, 35, 40', isSample: true } },
      { id: 'standard-deviation', name: 'Standard Deviation', domain: 'Probability & Statistics', description: 'Spread metric s = √s²', defaultExpression: '12, 15, 18, 22, 25', placeholder: '12, 15, 18, 22, 25', inputType: 'stats', formula: 's = \\sqrt{s^2}', defaultParams: { dataArray: '12, 15, 18, 22, 25, 30, 35, 40', isSample: true } },
      { id: 'normal-distribution', name: 'Normal Distribution', domain: 'Probability & Statistics', description: 'Gaussian PDF & CDF evaluation', defaultExpression: 'mean=0, std=1, x=1.96', placeholder: 'mean=0, std=1, x=1.96', inputType: 'stats', formula: 'f(x) = \\frac{1}{\\sigma\\sqrt{2\\pi}}e^{-\\frac{1}{2}(\\frac{x-\\mu}{\\sigma})^2}', defaultParams: { mean: 0, std: 1, xVal: 1.96, calcType: 'cdf' } },
      { id: 'regression-analysis', name: 'Regression Analysis', domain: 'Probability & Statistics', description: 'Linear regression y = ax + b', defaultExpression: 'X: 1,2,3,4,5; Y: 2,4,5,8,10', placeholder: 'X and Y data arrays', inputType: 'stats', formula: 'y = \\beta_0 + \\beta_1 x', defaultParams: { xArray: '1, 2, 3, 4, 5', yArray: '2, 4, 5, 8, 10' } }
    ]
  },
  {
    id: 'numerical-methods',
    name: '9. Numerical Methods',
    icon: 'Cpu',
    topics: [
      { id: 'bisection-method', name: 'Bisection Method', domain: 'Numerical Methods', description: 'Root finding via interval halving [a, b]', defaultExpression: 'x^3 - x - 2', placeholder: 'x^3 - x - 2', inputType: 'numerical', formula: 'c = \\frac{a+b}{2}', defaultParams: { lowerBound: 1, upperBound: 2, tol: 0.0001, maxIter: 10 } },
      { id: 'newton-raphson-method', name: 'Newton-Raphson Method', domain: 'Numerical Methods', description: 'Root finding x_(k+1) = x_k - f(x)/f\'(x)', defaultExpression: 'x^3 - x - 2', placeholder: 'x^3 - x - 2', inputType: 'numerical', formula: 'x_{k+1} = x_k - \\frac{f(x_k)}{f\'(x_k)}', defaultParams: { x0: 1.5, tol: 0.0001, maxIter: 10 } },
      { id: 'secant-method', name: 'Secant Method', domain: 'Numerical Methods', description: 'Root finding using secant slope approximation', defaultExpression: 'x^3 - x - 2', placeholder: 'x^3 - x - 2', inputType: 'numerical', formula: 'x_{k+1} = x_k - f(x_k)\\frac{x_k - x_{k-1}}{f(x_k) - f(x_{k-1})}', defaultParams: { x0: 1, x1: 2, tol: 0.0001, maxIter: 10 } },
      { id: 'euler-method', name: 'Euler Method', domain: 'Numerical Methods', description: 'First-order ODE step y_(n+1) = y_n + h*f(x_n, y_n)', defaultExpression: 'x + y', placeholder: 'x + y', inputType: 'numerical', formula: 'y_{n+1} = y_n + h f(x_n, y_n)', defaultParams: { x0: 0, y0: 1, h: 0.1, steps: 5 } },
      { id: 'runge-kutta-method', name: 'Runge-Kutta Method', domain: 'Numerical Methods', description: 'RK4 4th-order ODE numerical solver', defaultExpression: 'x + y', placeholder: 'x + y', inputType: 'numerical', formula: 'y_{n+1} = y_n + \\frac{h}{6}(k_1 + 2k_2 + 2k_3 + k_4)', defaultParams: { x0: 0, y0: 1, h: 0.1, steps: 5 } },
      { id: 'gauss-seidel-method', name: 'Gauss-Seidel Method', domain: 'Numerical Methods', description: 'Iterative algorithm for linear systems AX = B', defaultExpression: 'AX = B', placeholder: 'Coefficient matrix & RHS', inputType: 'numerical', formula: 'x_i^{(k+1)} = \\frac{1}{a_{ii}}\\left(b_i - \\sum a_{ij}x_j\\right)', defaultParams: { matrixA: [[4, 1, 1], [1, 5, 2], [1, 2, 4]], vectorB: [7, -8, 6], x0: [0, 0, 0], maxIter: 10, tol: 0.0001 } }
    ]
  },
  {
    id: 'optimization',
    name: '10. Optimization',
    icon: 'TrendingUp',
    topics: [
      { id: 'linear-programming', name: 'Linear Programming', domain: 'Optimization', description: 'Optimize linear objective under inequality constraints', defaultExpression: '3*x + 2*y', placeholder: 'Objective & Constraints', inputType: 'opt', formula: '\\max c^T x \\quad \\text{s.t. } Ax \\le b', defaultParams: { objExpr: '3*x + 2*y', optType: 'maximize', constraints: 'x + y <= 4, 2*x + y <= 5' } },
      { id: 'gradient-descent', name: 'Gradient Descent', domain: 'Optimization', description: 'Iterative first-order optimization along -∇f(x)', defaultExpression: '(x-2)^2 + (y-3)^2', placeholder: 'f(x,y), x0, alpha', inputType: 'opt', formula: 'x_{k+1} = x_k - \\alpha \\nabla f(x_k)', defaultParams: { x0: 0, y0: 0, alpha: 0.1, maxIter: 10, tol: 0.001 } },
      { id: 'convex-optimization', name: 'Convex Optimization', domain: 'Optimization', description: 'Minimize convex objective over convex set', defaultExpression: 'x^2 + y^2', placeholder: 'Objective & constraints', inputType: 'opt', formula: '\\min f(x) \\quad f \\text{ is convex}', defaultParams: { objExpr: 'x^2 + y^2', x0: 2, y0: 2 } },
      { id: 'simplex-method', name: 'Simplex Method', domain: 'Optimization', description: 'Corner point search on polytopic feasible region', defaultExpression: '3*x + 2*y', placeholder: 'Objective & constraints', inputType: 'opt', formula: '\\text{Simplex Tableau Pivot}', defaultParams: { objExpr: '3*x + 2*y', optType: 'maximize', constraints: 'x + y <= 4, 2*x + y <= 5' } }
    ]
  }
];

export const TOTAL_TOPIC_COUNT = DOMAINS_DATA.reduce((acc, d) => acc + d.topics.length, 0);


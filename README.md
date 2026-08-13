# MATHWIZARD - Your Intelligent Companion for Engineering Mathematics

**MATHWIZARD** is a production-quality, interactive engineering mathematics platform built for students and engineers.

## Architecture

MATHWIZARD uses a microservices architecture:

1. **Frontend (`frontend/`)**: React 18, TypeScript, Vite, Tailwind CSS, Framer Motion, Plotly.js, Three.js, KaTeX.
2. **Backend (`backend/`)**: Java 17 Spring Boot 3 REST API with Spring Data MongoDB.
3. **Mathematical Engine (`math-engine/`)**: Python microservice using SymPy, NumPy, SciPy, and Plotly.
4. **Database**: MongoDB containerized with init scripts.
5. **Containerization**: Docker Compose orchestrating all 4 microservices.

## Features

- **Three-Panel UI**:
  - **Left Panel**: Expandable & searchable explorer containing 100 mathematical topics across 10 engineering domains.
  - **Center Panel**: Dynamic calculator workspace rendering formatted LaTeX formulas, step-by-step resolution breakdowns, and interactive 2D/3D visualizations.
  - **Right Panel**: Context-aware virtual mathematical keyboard allowing direct symbol input without natural language prompts.

## Domain Coverage (100 Topics)

1. Calculus (Limits, Derivatives, Integrals, Taylor Series, Maxima/Minima, etc.)
2. Linear Algebra (Matrix Ops, Inverse, Determinant, Eigenvalues/Eigenvectors, Linear Solvers)
3. Vector Mathematics (3D Vectors, Dot/Cross Product, Projections, Triple Products, Line/Plane Eqs)
4. Coordinate Geometry (Distance, Midpoint, Slope, Line Eq, Conic Sections)
5. Differential Equations (1st/2nd Order ODEs, Bernoulli, Exact, Systems)
6. Complex Mathematics (Addition, Multiplication, Division, Polar/Euler Forms, Argand Plane)
7. Transform Methods (Laplace, Fourier, Z-Transform)
8. Probability & Statistics (Permutations, Combinations, Mean, Variance, Normal Dist)
9. Numerical Methods (Newton-Raphson, Bisection, RK4, Gauss-Seidel)
10. Optimization (Simplex Method, Gradient Descent, LP, Convex Opt)

## Running with Docker Compose

```bash
docker-compose up --build
```

Access the application at:
- **Frontend App**: `http://localhost:3000`
- **Spring Boot Backend**: `http://localhost:8080/api/v1/calculate`
- **Python Math Engine**: `http://localhost:8000/solve`

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Dict, Any, Optional

from parser import ExpressionParseError
from solvers.calculus_solver import solve_calculus_topic
from solvers.linear_algebra_solver import solve_linear_algebra_topic
from solvers.vector_solver import solve_vector_topic
from solvers.geometry_solver import solve_geometry_topic
from solvers.diff_eq import solve_diff_eq
from solvers.complex_math import solve_complex_math
from solvers.transform_methods import solve_transforms
from solvers.stats import solve_stats
from solvers.numerical_methods import solve_numerical_methods
from solvers.optimization import solve_optimization

app = FastAPI(
    title="MATHWIZARD Mathematical Engine Microservice",
    description="Symbolic and numerical solver for engineering mathematics",
    version="2.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class MathSolveRequest(BaseModel):
    domain: Optional[str] = "Calculus"
    topic: str
    expression: Optional[str] = "x^2 + 5*x"
    params: Optional[Dict[str, Any]] = {}

@app.get("/")
def read_root():
    return {"status": "online", "service": "MATHWIZARD Math Engine v2.0"}

@app.get("/health")
def health_check():
    return {"status": "UP"}

@app.post("/solve")
def solve_math(req: MathSolveRequest):
    topic = req.topic
    domain = (req.domain or "").lower()
    topic_id = (topic or "").lower().strip().replace(" ", "-").replace("-and-", "-").replace("and-", "").replace("-and", "")
    expr = req.expression or ""
    params = req.params or {}

    try:
        if "linear algebra" in domain or topic_id in ["matrix-addition", "matrix-subtraction", "matrix-multiplication", "matrix-transpose", "matrix-inverse", "determinant-calculation", "rank-of-matrix", "gaussian-elimination", "eigenvalues", "eigenvectors", "linear-equation-solver"]:
            res = solve_linear_algebra_topic(topic_id, expr, params)
        elif "vector" in domain or topic_id in ["vector-addition", "vector-subtraction", "vector-magnitude", "dot-product", "cross-product", "scalar-projection", "vector-projection", "scalar-triple-product", "vector-triple-product", "line-equation-3d", "plane-equation"]:
            res = solve_vector_topic(topic_id, expr, params)
        elif "coordinate" in domain or "geometry" in domain or topic_id in ["distance-between-points", "midpoint-formula", "slope-calculation", "equation-of-line", "circle-equation", "parabola", "ellipse", "hyperbola", "conic-sections"]:
            res = solve_geometry_topic(topic_id, expr, params)
        elif "differential equations" in domain or topic_id in ["first-order-de", "separable-de", "linear-de", "bernoulli-equation", "exact-de", "second-order-de", "higher-order-de", "system-of-de", "partial-de"]:
            res = solve_diff_eq(topic, expr, params)
        elif "complex" in domain or topic_id in ["complex-addition", "complex-multiplication", "complex-division", "polar-form", "euler-form", "de-moivre-theorem", "complex-roots", "complex-plane-vis"]:
            res = solve_complex_math(topic, expr, params)
        elif "transform" in domain or topic_id in ["laplace-transform", "inverse-laplace-transform", "fourier-series", "fourier-transform", "z-transform"]:
            res = solve_transforms(topic, expr, params)
        elif "probability" in domain or "statistics" in domain or topic_id in ["probability-calc", "permutations", "combinations", "mean", "median", "mode", "variance", "standard-deviation", "normal-distribution", "regression-analysis"]:
            res = solve_stats(topic, expr, params)
        elif "numerical" in domain or topic_id in ["bisection-method", "newton-raphson-method", "secant-method", "euler-method", "runge-kutta-method", "gauss-seidel-method"]:
            res = solve_numerical_methods(topic, expr, params)
        elif "optimization" in domain or topic_id in ["linear-programming", "gradient-descent", "convex-optimization", "simplex-method"]:
            res = solve_optimization(topic, expr, params)
        else:
            res = solve_calculus_topic(topic_id, expr, params)

        if "error" in res:
            raise HTTPException(status_code=400, detail={"errorType": "COMPUTATION_ERROR", "message": res["error"]})

        res["success"] = True
        res["topic"] = topic_id
        res["input"] = {"expression": expr, "params": params}

        return res

    except ExpressionParseError as pe:
        raise HTTPException(
            status_code=400,
            detail={
                "success": False,
                "errorType": "PARSING_ERROR",
                "message": pe.message,
                "suggestion": f"Example expected format: {pe.example}"
            }
        )
    except ValueError as ve:
        raise HTTPException(
            status_code=400,
            detail={
                "success": False,
                "errorType": "VALIDATION_ERROR",
                "message": str(ve)
            }
        )
    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail={
                "success": False,
                "errorType": "COMPUTATION_ERROR",
                "message": str(e)
            }
        )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

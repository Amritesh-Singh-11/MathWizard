import numpy as np
import sympy as sp

def solve_geometry(topic: str, expression: str, params: dict = None):
    params = params or {}
    topic_lower = topic.lower()

    x1 = float(params.get("x1", 0))
    y1 = float(params.get("y1", 0))
    x2 = float(params.get("x2", 4))
    y2 = float(params.get("y2", 3))

    steps = []
    answer = ""
    latex_answer = ""

    x_curve = np.linspace(-5, 5, 80).tolist()

    if "distance" in topic_lower:
        dist = np.sqrt((x2 - x1)**2 + (y2 - y1)**2)
        steps = [
            f"Given points P1({x1}, {y1}) and P2({x2}, {y2})",
            "Apply Distance Formula: d = √[(x2 - x1)² + (y2 - y1)²]",
            f"d = √[({x2} - {x1})² + ({y2} - {y1})²] = √[{x2-x1}² + {y2-y1}²]",
            f"Distance d = {round(dist, 4)}"
        ]
        answer = f"Distance d = {round(dist, 4)}"
        latex_answer = f"d = {round(dist, 4)}"
        y_curve = [(y1 + (x - x1) * (y2 - y1) / (x2 - x1 if x2 != x1 else 1)) for x in x_curve]

    elif "midpoint" in topic_lower:
        mx = (x1 + x2) / 2
        my = (y1 + y2) / 2
        steps = [
            f"Given points P1({x1}, {y1}) and P2({x2}, {y2})",
            "Midpoint formula: M = ((x1 + x2)/2, (y1 + y2)/2)",
            f"Midpoint M = ({mx}, {my})"
        ]
        answer = f"Midpoint M = ({mx}, {my})"
        latex_answer = f"M = \\left({mx}, {my}\\right)"
        y_curve = [(y1 + (x - x1) * (y2 - y1) / (x2 - x1 if x2 != x1 else 1)) for x in x_curve]

    elif "slope" in topic_lower or "equation" in topic_lower:
        if x2 == x1:
            m = 1.0
            c = 0.0
        else:
            m = (y2 - y1) / (x2 - x1)
            c = y1 - m * x1
        steps = [
            f"Calculate slope m = (y2 - y1) / (x2 - x1) = ({y2} - {y1}) / ({x2} - {x1}) = {m}",
            f"Use point-slope form: y - y1 = m(x - x1)",
            f"Equation of line: y = {m}x + ({c})"
        ]
        answer = f"Slope m = {m}\nLine: y = {m}x + {c}"
        latex_answer = f"m = {m}, \\quad y = {m}x + {c}"
        y_curve = [m * x + c for x in x_curve]

    elif "circle" in topic_lower:
        r = float(params.get("radius", 5))
        steps = [
            f"Center at (h, k) = (0, 0), Radius R = {r}",
            "Standard Circle Equation: (x - h)² + (y - k)² = R²",
            f"Result: x² + y² = {r**2}"
        ]
        answer = f"Circle: x² + y² = {r**2}"
        latex_answer = f"x^2 + y^2 = {r**2}"
        y_curve = [np.sqrt(max(0, r**2 - x**2)) for x in x_curve]

    elif "parabola" in topic_lower:
        a = 1.0
        steps = [
            "Parabola Equation y² = 4ax with focus at (a, 0)",
            f"Result: y² = 4x"
        ]
        answer = "Parabola: y² = 4x"
        latex_answer = "y^2 = 4x"
        y_curve = [x**2 / 4 for x in x_curve]

    elif "ellipse" in topic_lower:
        steps = [
            "Standard Ellipse Equation: x²/a² + y²/b² = 1",
            "a = 4, b = 3 -> x²/16 + y²/9 = 1"
        ]
        answer = "Ellipse: x²/16 + y²/9 = 1"
        latex_answer = "\\frac{x^2}{16} + \\frac{y^2}{9} = 1"
        y_curve = [3 * np.sqrt(max(0, 1 - (x**2 / 16))) for x in x_curve]

    else:
        steps = [
            "Conic Section: General second-degree equation",
            "Ax² + Bxy + Cy² + Dx + Ey + F = 0"
        ]
        answer = "Conic Section: x² + y² = 16"
        latex_answer = "x^2 + y^2 = 16"
        y_curve = [np.sqrt(max(0, 16 - x**2)) for x in x_curve]

    return {
        "answer": answer,
        "latexAnswer": latex_answer,
        "steps": steps,
        "visualization": {
            "type": "FUNCTION_2D",
            "title": f"Coordinate Geometry Interpretation - {topic}",
            "data": {
                "x": x_curve,
                "y": y_curve,
                "exprStr": answer
            }
        }
    }

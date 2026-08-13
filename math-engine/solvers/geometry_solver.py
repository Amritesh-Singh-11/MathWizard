import numpy as np
import sympy as sp

def solve_geometry_topic(topic_id: str, expression: str, params: dict):
    topic_clean = topic_id.lower().strip()
    x1 = float(params.get("x1", 0.0))
    y1 = float(params.get("y1", 0.0))
    x2 = float(params.get("x2", 4.0))
    y2 = float(params.get("y2", 3.0))

    x_curve = np.linspace(-6, 6, 100).tolist()

    # 1. DISTANCE BETWEEN POINTS
    if "distance" in topic_clean:
        dist = np.sqrt((x2 - x1)**2 + (y2 - y1)**2)
        dist_clean = int(dist) if float(dist).is_integer() else round(dist, 4)
        steps = [
            f"Points P1({x1}, {y1}) and P2({x2}, {y2})",
            "Apply Distance Formula: d = √[(x2 - x1)² + (y2 - y1)²]",
            f"d = √[({x2} - {x1})² + ({y2} - {y1})²] = √[{(x2-x1)**2} + {(y2-y1)**2}] = {dist_clean}"
        ]
        answer = f"Distance d = {dist_clean}"
        latex_answer = f"d = {dist_clean}"
        m_slope = (y2 - y1) / (x2 - x1) if x2 != x1 else 0
        y_curve = [y1 + m_slope * (x - x1) for x in x_curve]

    # 2. MIDPOINT FORMULA
    elif "midpoint" in topic_clean:
        mx = (x1 + x2) / 2.0
        my = (y1 + y2) / 2.0
        steps = [
            f"Points P1({x1}, {y1}) and P2({x2}, {y2})",
            "Apply Midpoint Formula: M = ((x1 + x2)/2, (y1 + y2)/2)",
            f"Midpoint M = (({x1} + {x2})/2, ({y1} + {y2})/2) = ({mx}, {my})"
        ]
        answer = f"Midpoint M = ({mx}, {my})"
        latex_answer = f"M = \\left({mx}, {my}\\right)"
        m_slope = (y2 - y1) / (x2 - x1) if x2 != x1 else 0
        y_curve = [y1 + m_slope * (x - x1) for x in x_curve]

    # 3 & 4. SLOPE & EQUATION OF LINE
    elif "slope" in topic_clean or "equation-of-line" in topic_clean:
        if x2 == x1:
            raise ValueError(f"Vertical line through x = {x1}: slope is undefined (division by zero).")
        m = (y2 - y1) / (x2 - x1)
        c = y1 - m * x1
        m_clean = int(m) if float(m).is_integer() else round(m, 4)
        c_clean = int(c) if float(c).is_integer() else round(c, 4)
        steps = [
            f"1. Compute slope m = (y2 - y1) / (x2 - x1) = ({y2} - {y1}) / ({x2} - {x1}) = {m_clean}",
            f"2. Apply point-slope form: y - y1 = m(x - x1)",
            f"3. Slope-intercept equation: y = {m_clean}x + ({c_clean})"
        ]
        answer = f"Slope m = {m_clean}\nLine Equation: y = {m_clean}x + {c_clean}"
        latex_answer = f"m = {m_clean}, \\quad y = {m_clean}x + {c_clean}"
        y_curve = [m * x + c for x in x_curve]

    # 5. CIRCLE EQUATION
    elif "circle" in topic_clean:
        h = float(params.get("h", 0.0))
        k = float(params.get("k", 0.0))
        r = float(params.get("radius", params.get("r", 5.0)))
        if r <= 0:
            raise ValueError("Circle radius r must be strictly positive (> 0).")
        steps = [
            f"Center (h, k) = ({h}, {k}), Radius R = {r}",
            "Apply Standard Circle Equation: (x - h)² + (y - k)² = R²",
            f"Result: (x - {h})² + (y - {k})² = {r**2}"
        ]
        answer = f"Circle Equation:\n(x - {h})² + (y - {k})² = {r**2}"
        latex_answer = f"(x - {h})^2 + (y - {k})^2 = {r**2}"
        y_curve = [k + np.sqrt(max(0, r**2 - (x - h)**2)) for x in x_curve]

    # 6. PARABOLA
    elif "parabola" in topic_clean:
        a_param = float(params.get("a", 1.0))
        steps = [
            f"Standard Parabola Equation y² = 4ax with parameter a = {a_param}",
            f"Focus at (a, 0) = ({a_param}, 0), Directrix line x = -{a_param}",
            f"Result: y² = {4 * a_param}x"
        ]
        answer = f"Parabola Equation: y² = {4 * a_param}x\nFocus: ({a_param}, 0)\nDirectrix: x = -{a_param}"
        latex_answer = f"y^2 = {4 * a_param}x"
        y_curve = [x**2 / (4 * a_param if a_param != 0 else 1) for x in x_curve]

    # 7. ELLIPSE
    elif "ellipse" in topic_clean:
        a_val = float(params.get("a", 4.0))
        b_val = float(params.get("b", 3.0))
        steps = [
            f"Standard Ellipse Equation: x²/a² + y²/b² = 1 with a = {a_val}, b = {b_val}",
            f"Semi-major axis a = {a_val}, Semi-minor axis b = {b_val}",
            f"Result: x²/{a_val**2} + y²/{b_val**2} = 1"
        ]
        answer = f"Ellipse Equation: x²/{a_val**2} + y²/{b_val**2} = 1"
        latex_answer = f"\\frac{{x^2}}{{{a_val**2}}} + \\frac{{y^2}}{{{b_val**2}}} = 1"
        y_curve = [b_val * np.sqrt(max(0, 1 - (x**2 / (a_val**2)))) for x in x_curve]

    # 8. HYPERBOLA
    elif "hyperbola" in topic_clean:
        a_val = float(params.get("a", 4.0))
        b_val = float(params.get("b", 3.0))
        steps = [
            f"Standard Hyperbola Equation: x²/a² - y²/b² = 1 with a = {a_val}, b = {b_val}",
            f"Transverse axis semi-length a = {a_val}, Conjugate axis semi-length b = {b_val}",
            f"Asymptotes: y = ±({b_val}/{a_val})x",
            f"Result: x²/{a_val**2} - y²/{b_val**2} = 1"
        ]
        answer = f"Hyperbola Equation: x²/{a_val**2} - y²/{b_val**2} = 1\nAsymptotes: y = ±({b_val}/{a_val})x"
        latex_answer = f"\\frac{{x^2}}{{{a_val**2}}} - \\frac{{y^2}}{{{b_val**2}}} = 1"
        y_curve = [b_val * np.sqrt(max(0, (x**2 / (a_val**2)) - 1)) for x in x_curve]

    # 9. CONIC SECTIONS
    else:
        steps = [
            "General Second-Degree Conic Section: Ax² + Bxy + Cy² + Dx + Ey + F = 0",
            "Discriminant B² - 4AC determines conic classification:",
            "B² - 4AC < 0 (Ellipse / Circle), B² - 4AC = 0 (Parabola), B² - 4AC > 0 (Hyperbola)",
            "For standard circle x² + y² = 16: Discriminant = -4 < 0 (Circle)"
        ]
        answer = "Conic Section: x² + y² = 16\nClassification: Circle (B² - 4AC < 0)"
        latex_answer = "x^2 + y^2 = 16"
        y_curve = [np.sqrt(max(0, 16 - x**2)) for x in x_curve]

    return {
        "answer": answer,
        "latexAnswer": latex_answer,
        "steps": steps,
        "visualization": {
            "type": "FUNCTION_2D",
            "title": f"Coordinate Geometry — {topic_clean.replace('-', ' ').title()}",
            "data": {
                "x": x_curve,
                "y": y_curve,
                "exprStr": answer
            }
        }
    }

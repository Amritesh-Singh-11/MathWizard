import sympy as sp
import numpy as np
from parser import parse_math_expression, ExpressionParseError

def solve_calculus_topic(topic_id: str, expression: str, params: dict):
    var_x = sp.Symbol('x')
    var_y = sp.Symbol('y')
    var_z = sp.Symbol('z')
    var_t = sp.Symbol('t')

    # 1. LIMITS
    if topic_id == "limits":
        expr, _ = parse_math_expression(expression, ['x'])
        point = float(params.get("limitPoint", 2.0))

        lhl = sp.limit(expr, var_x, point, dir='-')
        rhl = sp.limit(expr, var_x, point, dir='+')
        limit_val = sp.limit(expr, var_x, point)

        steps = [
            f"Target function: f(x) = {expr}",
            f"Compute Left-Hand Limit as x -> {point}⁻: LHL = {lhl}",
            f"Compute Right-Hand Limit as x -> {point}⁺: RHL = {rhl}",
            f"Since LHL and RHL evaluate to {limit_val}, lim_{{x -> {point}}} f(x) = {limit_val}"
        ]

        x_vals = np.linspace(point - 4, point + 4, 80).tolist()
        f_np = sp.lambdify(var_x, expr, 'numpy')
        try:
            y_vals = np.nan_to_num(f_np(np.array(x_vals)), nan=0.0).tolist()
        except Exception:
            y_vals = x_vals

        lim_num = float(limit_val) if limit_val.is_real and limit_val.is_number else 0.0

        return {
            "answer": f"{limit_val}",
            "latexAnswer": f"\\lim_{{x \\to {point}}} \\left({sp.latex(expr)}\\right) = {sp.latex(limit_val)}",
            "steps": steps,
            "visualization": {
                "type": "LIMIT_APPROACH",
                "title": f"Limit Approach (x → {point}) for f(x) = {expr}",
                "data": {
                    "x": x_vals,
                    "y": y_vals,
                    "limitPoint": point,
                    "limitValue": lim_num,
                    "exprStr": str(expr)
                }
            }
        }

    # 2. CONTINUITY
    elif topic_id == "continuity":
        expr, _ = parse_math_expression(expression, ['x'])
        point = float(params.get("limitPoint", 1.0))

        # Evaluate f(a)
        try:
            val_a = expr.subs(var_x, point)
            val_a_defined = not (val_a.has(sp.nan) or val_a.has(sp.zoo) or val_a.has(sp.oo))
        except Exception:
            val_a = "Undefined"
            val_a_defined = False

        lhl = sp.limit(expr, var_x, point, dir='-')
        rhl = sp.limit(expr, var_x, point, dir='+')
        limit_exists = (lhl == rhl) and not (lhl.has(sp.oo) or lhl.has(sp.zoo))
        limit_val = lhl if limit_exists else "Does not exist"

        is_continuous = val_a_defined and limit_exists and (limit_val == val_a)

        discont_type = "None (Continuous)"
        if not is_continuous:
            if limit_exists and (not val_a_defined or val_a != limit_val):
                discont_type = "Removable Discontinuity"
            elif lhl != rhl and not (lhl.has(sp.oo) or rhl.has(sp.oo)):
                discont_type = "Jump Discontinuity"
            elif lhl.has(sp.oo) or rhl.has(sp.oo) or lhl.has(sp.zoo) or rhl.has(sp.zoo):
                discont_type = "Infinite Discontinuity"
            else:
                discont_type = "Essential Discontinuity"

        steps = [
            f"Function: f(x) = {expr}",
            f"Target Continuity Point: x = {point}",
            f"1. Evaluate f({point}): {val_a if val_a_defined else 'Undefined'}",
            f"2. Compute Left-Hand Limit: {lhl}",
            f"3. Compute Right-Hand Limit: {rhl}",
            f"4. Limit as x -> {point}: {limit_val}",
            f"5. Conclusion: Function is {'CONTINUOUS' if is_continuous else 'DISCONTINUOUS'} ({discont_type})"
        ]

        answer = (
            f"Status: {'Continuous' if is_continuous else 'Discontinuous'}\n"
            f"Discontinuity Type: {discont_type}\n"
            f"Limit at x = {point}: {limit_val}\n"
            f"Function Value f({point}): {val_a if val_a_defined else 'Undefined'}"
        )

        latex_answer = f"\\text{{Status: }} \\mathbf{{{'Continuous' if is_continuous else 'Discontinuous'}}}, \\quad \\text{{Type: }} \\text{{{discont_type}}}"

        x_vals = np.linspace(point - 4, point + 4, 80).tolist()
        f_np = sp.lambdify(var_x, expr, 'numpy')
        try:
            y_vals = np.nan_to_num(f_np(np.array(x_vals)), nan=0.0).tolist()
        except Exception:
            y_vals = x_vals

        return {
            "answer": answer,
            "latexAnswer": latex_answer,
            "steps": steps,
            "visualization": {
                "type": "FUNCTION_2D",
                "title": f"Continuity Analysis at x = {point} ({discont_type})",
                "data": {
                    "x": x_vals,
                    "y": y_vals,
                    "exprStr": str(expr)
                }
            }
        }

    # 3. MAXIMA AND MINIMA
    elif topic_id == "maxima-minima":
        expr, _ = parse_math_expression(expression, ['x'])
        d1 = sp.diff(expr, var_x)
        d2 = sp.diff(d1, var_x)

        try:
            crit_points = sp.solve(d1, var_x)
        except Exception:
            crit_points = []

        extrema_results = []
        steps = [
            f"Function: f(x) = {expr}",
            f"Step 1: Compute first derivative f'(x) = {d1}",
            f"Step 2: Solve f'(x) = 0 -> Critical points: {crit_points}",
            f"Step 3: Compute second derivative f''(x) = {d2}"
        ]

        for cp in crit_points:
            try:
                cp_val = float(cp)
                d2_eval = d2.subs(var_x, cp)
                y_val = expr.subs(var_x, cp)

                classification = "Inconclusive"
                if d2_eval > 0:
                    classification = "Local Minimum"
                elif d2_eval < 0:
                    classification = "Local Maximum"

                extrema_results.append({
                    "x": round(cp_val, 4),
                    "y": round(float(y_val), 4),
                    "d2_eval": round(float(d2_eval), 4),
                    "type": classification
                })

                steps.append(
                    f"Step 4: Evaluate f''({round(cp_val, 4)}) = {round(float(d2_eval), 4)} -> {classification} at ({round(cp_val, 4)}, {round(float(y_val), 4)})"
                )
            except Exception:
                continue

        if not extrema_results:
            answer = f"First derivative f'(x) = {d1}. No real critical points found."
            latex_answer = f"f'(x) = {sp.latex(d1)}"
        else:
            summary = "\n".join([f"{e['type']} at ({e['x']}, {e['y']}) [f''(x) = {e['d2_eval']}]" for e in extrema_results])
            answer = f"Critical Points: x = {[e['x'] for e in extrema_results]}\n\nExtrema Classification:\n{summary}"
            latex_answer = f"\\text{{Extrema: }} " + ", ".join([f"({e['x']}, {e['y']})" for e in extrema_results])

        x_vals = np.linspace(-5, 5, 80).tolist()
        f_np = sp.lambdify(var_x, expr, 'numpy')
        try:
            y_vals = np.nan_to_num(f_np(np.array(x_vals)), nan=0.0).tolist()
        except Exception:
            y_vals = x_vals

        return {
            "answer": answer,
            "latexAnswer": latex_answer,
            "steps": steps,
            "visualization": {
                "type": "FUNCTION_2D",
                "title": f"Maxima & Minima Analysis for f(x) = {expr}",
                "data": {
                    "x": x_vals,
                    "y": y_vals,
                    "exprStr": str(expr)
                }
            }
        }

    # 4. HIGHER ORDER DERIVATIVES
    elif topic_id == "higher-order-derivatives":
        expr, _ = parse_math_expression(expression, ['x'])
        order = int(params.get("order", 2))
        deriv = sp.diff(expr, var_x, order)

        steps = [
            f"Function: f(x) = {expr}",
            f"Apply order-{order} differentiation w.r.t x",
            f"Result: f^({order})(x) = {deriv}"
        ]
        answer = f"{deriv}"
        latex_answer = f"\\frac{{d^{{{order}}}}}{{dx^{{{order}}}}} \\left({sp.latex(expr)}\\right) = {sp.latex(deriv)}"

        x_vals = np.linspace(-4, 4, 60).tolist()
        f_np = sp.lambdify(var_x, expr, 'numpy')
        dn_np = sp.lambdify(var_x, deriv, 'numpy')
        try:
            y_orig = np.nan_to_num(f_np(np.array(x_vals)), nan=0.0).tolist()
            y_deriv = np.nan_to_num(dn_np(np.array(x_vals)), nan=0.0).tolist()
        except Exception:
            y_orig = x_vals
            y_deriv = x_vals

        return {
            "answer": answer,
            "latexAnswer": latex_answer,
            "steps": steps,
            "visualization": {
                "type": "FUNCTION_2D_COMPARISON",
                "title": f"Function vs Order {order} Derivative",
                "data": {
                    "x": x_vals,
                    "yExact": y_orig,
                    "exprStr": str(expr)
                }
            }
        }

    # 5. PARTIAL DIFFERENTIATION
    elif topic_id == "partial-differentiation":
        expr, _ = parse_math_expression(expression, ['x', 'y'])
        wrt = params.get("variable", "x")
        wrt_sym = sp.Symbol(wrt)
        p_deriv = sp.diff(expr, wrt_sym)

        steps = [
            f"Multivariable Function: f(x,y) = {expr}",
            f"Treat other variables as constant, differentiate w.r.t {wrt}",
            f"∂f/∂{wrt} = {p_deriv}"
        ]
        answer = f"{p_deriv}"
        latex_answer = f"\\frac{{\\partial f}}{{\\partial {wrt}}} = {sp.latex(p_deriv)}"

        return {
            "answer": answer,
            "latexAnswer": latex_answer,
            "steps": steps,
            "visualization": {
                "type": "SURFACE_3D",
                "title": f"Partial Derivative ∂f/∂{wrt}",
                "data": {"planeNormal": [1, 2, 3]}
            }
        }

    # 6. TOTAL DIFFERENTIATION
    elif topic_id == "total-differentiation":
        expr, _ = parse_math_expression(expression, ['x', 'y'])
        fx = sp.diff(expr, var_x)
        fy = sp.diff(expr, var_y)

        steps = [
            f"Function: f(x,y) = {expr}",
            f"1. Compute ∂f/∂x = {fx}",
            f"2. Compute ∂f/∂y = {fy}",
            f"3. Form total differential df = ({fx}) dx + ({fy}) dy"
        ]
        answer = f"df = ({fx}) dx + ({fy}) dy"
        latex_answer = f"df = \\left({sp.latex(fx)}\\right)dx + \\left({sp.latex(fy)}\\right)dy"

        return {
            "answer": answer,
            "latexAnswer": latex_answer,
            "steps": steps,
            "visualization": {
                "type": "SURFACE_3D",
                "title": f"Total Differential df of f(x,y) = {expr}",
                "data": {"planeNormal": [1, 2, 3]}
            }
        }

    # 7. IMPLICIT DIFFERENTIATION
    elif topic_id == "implicit-differentiation":
        expr, _ = parse_math_expression(expression, ['x', 'y'])
        fx = sp.diff(expr, var_x)
        fy = sp.diff(expr, var_y)
        if fy != 0:
            dydx = -fx / fy
        else:
            dydx = sp.sympify(0)

        steps = [
            f"Implicit Function F(x,y) = {expr} = 0",
            f"1. Compute ∂F/∂x = {fx}",
            f"2. Compute ∂F/∂y = {fy}",
            f"3. Apply dy/dx = -F_x / F_y = -({fx}) / ({fy})",
            f"Result: dy/dx = {dydx}"
        ]
        answer = f"{dydx}"
        latex_answer = f"\\frac{{dy}}{{dx}} = {sp.latex(dydx)}"

        return {
            "answer": answer,
            "latexAnswer": latex_answer,
            "steps": steps,
            "visualization": {
                "type": "FUNCTION_2D_TANGENT",
                "title": f"Implicit Derivative dy/dx = {dydx}",
                "data": {"exprStr": str(dydx)}
            }
        }

    # 8. PARAMETRIC DIFFERENTIATION
    elif topic_id == "parametric-differentiation":
        x_expr, _ = parse_math_expression(expression, ['t'])
        y_expr_str = params.get("yExpr", "t^3")
        y_expr, _ = parse_math_expression(y_expr_str, ['t'])

        dxdt = sp.diff(x_expr, var_t)
        dydt = sp.diff(y_expr, var_t)
        dydx = sp.cancel(dydt / dxdt) if dxdt != 0 else sp.sympify(0)

        steps = [
            f"Parametric Equations: x(t) = {x_expr}, y(t) = {y_expr}",
            f"1. Compute dx/dt = {dxdt}",
            f"2. Compute dy/dt = {dydt}",
            f"3. Apply dy/dx = (dy/dt) / (dx/dt) = ({dydt}) / ({dxdt})",
            f"Result: dy/dx = {dydx}"
        ]
        answer = f"{dydx}"
        latex_answer = f"\\frac{{dy}}{{dx}} = {sp.latex(dydx)}"

        return {
            "answer": answer,
            "latexAnswer": latex_answer,
            "steps": steps,
            "visualization": {
                "type": "FUNCTION_2D_TANGENT",
                "title": f"Parametric Derivative dy/dx = {dydx}",
                "data": {"exprStr": str(dydx)}
            }
        }

    # 9. TAYLOR & MACLAURIN
    elif topic_id in ["taylor-series", "maclaurin-series"]:
        expr, _ = parse_math_expression(expression, ['x'])
        point = float(params.get("point", 0.0 if topic_id == "maclaurin-series" else 1.0))
        n_terms = int(params.get("terms", 4))

        series = sp.series(expr, var_x, point, n_terms).removeO()

        steps = [
            f"Expand f(x) = {expr} into Taylor series centered at a = {point}",
            f"Evaluated derivatives up to order n = {n_terms}",
            f"Taylor Polynomial P_{n_terms}(x) = {series}"
        ]
        answer = f"{series}"
        latex_answer = f"P_{{{n_terms}}}(x) = {sp.latex(series)}"

        x_vals = np.linspace(point - 3, point + 3, 50).tolist()
        f_np = sp.lambdify(var_x, expr, 'numpy')
        p_np = sp.lambdify(var_x, series, 'numpy')
        try:
            y_orig = np.nan_to_num(f_np(np.array(x_vals)), nan=0.0).tolist()
            y_poly = np.nan_to_num(p_np(np.array(x_vals)), nan=0.0).tolist()
        except Exception:
            y_orig = x_vals
            y_poly = x_vals

        return {
            "answer": answer,
            "latexAnswer": latex_answer,
            "steps": steps,
            "visualization": {
                "type": "TAYLOR_APPROXIMATION",
                "title": f"Taylor Series P_{n_terms}(x) centered at a = {point}",
                "data": {
                    "x": x_vals,
                    "yExact": y_orig,
                    "approximations": [
                        {"termCount": n_terms, "y": y_poly, "formula": f"P_{n_terms}(x)"}
                    ],
                    "exprStr": str(expr)
                }
            }
        }

    # 10. INTEGRATION
    elif topic_id in ["indefinite-integration", "definite-integration", "double-integration", "triple-integration"]:
        expr, _ = parse_math_expression(expression, ['x', 'y', 'z'])
        if topic_id == "double-integration":
            x1 = float(params.get("x1", 0.0))
            x2 = float(params.get("x2", 2.0))
            y1 = float(params.get("y1", 0.0))
            y2 = float(params.get("y2", 2.0))
            val = sp.integrate(expr, (var_x, x1, x2), (var_y, y1, y2))
            steps = [
                f"Integrate f(x,y) = {expr} over region x ∈ [{x1}, {x2}], y ∈ [{y1}, {y2}]",
                f"Inner integral w.r.t y, Outer integral w.r.t x",
                f"Double integral result = {val}"
            ]
            answer = f"{val}"
            latex_answer = f"\\int_{{{x1}}}^{{{x2}}} \\int_{{{y1}}}^{{{y2}}} \\left({sp.latex(expr)}\\right) dy dx = {sp.latex(val)}"
            viz_type = "SURFACE_3D"
            viz_data = {"planeNormal": [1, 2, 3], "bounds": [x1, x2, y1, y2]}

        elif topic_id == "triple-integration":
            x1 = float(params.get("x1", 0.0))
            x2 = float(params.get("x2", 2.0))
            y1 = float(params.get("y1", 0.0))
            y2 = float(params.get("y2", 2.0))
            z1 = float(params.get("z1", 0.0))
            z2 = float(params.get("z2", 2.0))
            val = sp.integrate(expr, (var_x, x1, x2), (var_y, y1, y2), (var_z, z1, z2))
            steps = [
                f"Integrate f(x,y,z) = {expr} over 3D volume region x ∈ [{x1}, {x2}], y ∈ [{y1}, {y2}], z ∈ [{z1}, {z2}]",
                f"Triple integral result = {val}"
            ]
            answer = f"{val}"
            latex_answer = f"\\int_{{{x1}}}^{{{x2}}} \\int_{{{y1}}}^{{{y2}}} \\int_{{{z1}}}^{{{z2}}} \\left({sp.latex(expr)}\\right) dz dy dx = {sp.latex(val)}"
            viz_type = "SURFACE_3D"
            viz_data = {"planeNormal": [1, 2, 3], "bounds": [x1, x2, y1, y2, z1, z2]}

        elif topic_id == "definite-integration":
            a = float(params.get("lowerBound", 0.0))
            b = float(params.get("upperBound", 2.0))
            val = sp.integrate(expr, (var_x, a, b))

            steps = [
                f"Integrand: f(x) = {expr}",
                f"Find antiderivative F(x) = ∫({expr}) dx",
                f"Apply Fundamental Theorem: F({b}) - F({a}) = {val}"
            ]
            answer = f"{val}"
            latex_answer = f"\\int_{{{a}}}^{{{b}}} \\left({sp.latex(expr)}\\right) dx = {sp.latex(val)}"

            x_vals = np.linspace(a - 2, b + 2, 60).tolist()
            f_np = sp.lambdify(var_x, expr, 'numpy')
            try:
                y_vals = np.nan_to_num(f_np(np.array(x_vals)), nan=0.0).tolist()
                fill_x = np.linspace(a, b, 40).tolist()
                fill_y = np.nan_to_num(f_np(np.array(fill_x)), nan=0.0).tolist()
            except Exception:
                y_vals = x_vals
                fill_x = [a, b]
                fill_y = [0.0, 0.0]

            val_num = float(val) if val.is_real and val.is_number else 0.0
            viz_type = "AREA_UNDER_CURVE"
            viz_data = {
                "x": x_vals,
                "y": y_vals,
                "fillX": fill_x,
                "fillY": fill_y,
                "a": a,
                "b": b,
                "areaValue": val_num,
                "exprStr": str(expr)
            }

        else:
            integ = sp.integrate(expr, var_x)
            steps = [
                f"Integrand: f(x) = {expr}",
                f"Apply antiderivative integration rules",
                f"Result: ∫ ({expr}) dx = {integ} + C"
            ]
            answer = f"{integ} + C"
            latex_answer = f"\\int \\left({sp.latex(expr)}\\right) dx = {sp.latex(integ)} + C"

            x_vals = np.linspace(-5, 5, 60).tolist()
            f_np = sp.lambdify(var_x, integ, 'numpy')
            try:
                y_vals = np.nan_to_num(f_np(np.array(x_vals)), nan=0.0).tolist()
            except Exception:
                y_vals = x_vals

            viz_type = "FUNCTION_2D_COMPARISON"
            viz_data = {
                "x": x_vals,
                "yExact": y_vals,
                "exprStr": str(expr)
            }

        return {
            "answer": answer,
            "latexAnswer": latex_answer,
            "steps": steps,
            "visualization": {
                "type": viz_type,
                "title": f"Integration Interpretation - {topic_id}",
                "data": viz_data
            }
        }

    # 11. DEFAULT DIFFERENTIATION
    else:
        expr, _ = parse_math_expression(expression, ['x'])
        order = int(params.get("order", 1))
        deriv = sp.diff(expr, var_x, order)

        steps = [
            f"Function: f(x) = {expr}",
            f"Apply order-{order} differentiation w.r.t x",
            f"Derivative: f'({var_x}) = {deriv}"
        ]
        answer = f"{deriv}"
        latex_answer = f"f'(x) = {sp.latex(deriv)}"

        x_vals = np.linspace(-5, 5, 60).tolist()
        f_np = sp.lambdify(var_x, expr, 'numpy')
        df_np = sp.lambdify(var_x, deriv, 'numpy')
        try:
            y_orig = np.nan_to_num(f_np(np.array(x_vals)), nan=0.0).tolist()
            y_deriv = np.nan_to_num(df_np(np.array(x_vals)), nan=0.0).tolist()
        except Exception:
            y_orig = x_vals
            y_deriv = x_vals

        return {
            "answer": answer,
            "latexAnswer": latex_answer,
            "steps": steps,
            "visualization": {
                "type": "FUNCTION_2D_TANGENT",
                "title": f"Function f(x) = {expr} vs Derivative f'(x) = {deriv}",
                "data": {
                    "x": x_vals,
                    "y": y_orig,
                    "derivY": y_deriv,
                    "exprStr": str(expr),
                    "derivStr": str(deriv)
                }
            }
        }

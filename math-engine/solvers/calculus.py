import sympy as sp
import numpy as np
from parser import parse_math_expression, ExpressionParseError

def solve_calculus(topic: str, expression: str, params: dict = None):
    params = params or {}
    topic_id = (topic or "").lower().strip().replace(" ", "-").replace("-and-", "-").replace("and-", "").replace("-and", "")
    var_symbol = sp.Symbol('x')
    y_symbol = sp.Symbol('y')
    z_symbol = sp.Symbol('z')

    # 1. LIMITS
    if topic_id == "limits":
        expr, symbols = parse_math_expression(expression, ['x'])
        point = float(params.get("limitPoint", 2.0))

        lhl = sp.limit(expr, var_symbol, point, dir='-')
        rhl = sp.limit(expr, var_symbol, point, dir='+')
        limit_val = sp.limit(expr, var_symbol, point)

        steps = [
            f"Target function: f(x) = {expr}",
            f"Left-hand limit: lim_{{x -> {point}^-}} f(x) = {lhl}",
            f"Right-hand limit: lim_{{x -> {point}^+}} f(x) = {rhl}",
            f"Limit value: lim_{{x -> {point}}} f(x) = {limit_val}"
        ]

        x_vals = np.linspace(point - 4, point + 4, 60).tolist()
        f_np = sp.lambdify(var_symbol, expr, 'numpy')
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
        expr, symbols = parse_math_expression(expression, ['x'])
        point = float(params.get("limitPoint", 1.0))

        try:
            val_a = expr.subs(var_symbol, point)
            val_a_defined = not (val_a.has(sp.nan) or val_a.has(sp.zoo) or val_a.has(sp.oo))
        except Exception:
            val_a = "Undefined"
            val_a_defined = False

        lhl = sp.limit(expr, var_symbol, point, dir='-')
        rhl = sp.limit(expr, var_symbol, point, dir='+')
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
            f"Point: x = {point}",
            f"Left-hand limit: {lhl}",
            f"Right-hand limit: {rhl}",
            f"Limit: {limit_val}",
            f"Function value: {val_a if val_a_defined else 'Undefined'}",
            f"Conclusion: The function is {'continuous' if is_continuous else 'NOT continuous'} at x = {point}.",
            f"Type: {discont_type}"
        ]

        answer = (
            f"Continuity Analysis\n\n"
            f"Function:\nf(x) = {expr}\n\n"
            f"Point:\nx = {point}\n\n"
            f"Left-hand limit:\n{lhl}\n\n"
            f"Right-hand limit:\n{rhl}\n\n"
            f"Limit:\n{limit_val}\n\n"
            f"Function value:\n{val_a if val_a_defined else 'Undefined'}\n\n"
            f"Conclusion:\nThe function is {'continuous' if is_continuous else 'NOT continuous'} at x = {point}.\n\n"
            f"Type:\n{discont_type}"
        )

        latex_answer = f"\\text{{Status: }} \\mathbf{{{'Continuous' if is_continuous else 'Discontinuous'}}}, \\quad \\text{{Type: }} \\text{{{discont_type}}}"

        x_vals = np.linspace(point - 4, point + 4, 80).tolist()
        f_np = sp.lambdify(var_symbol, expr, 'numpy')
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
        expr, symbols = parse_math_expression(expression, ['x'])
        d1 = sp.diff(expr, var_symbol)
        d2 = sp.diff(d1, var_symbol)

        try:
            crit_points = sp.solve(d1, var_symbol)
        except Exception:
            crit_points = []

        extrema_results = []
        steps = [
            f"Function: f(x) = {expr}",
            f"Step 1: First derivative f'(x) = {d1}",
            f"Step 2: Set f'(x) = 0 -> {d1} = 0 -> Critical points: {crit_points}",
            f"Step 3: Second derivative f''(x) = {d2}"
        ]

        for cp in crit_points:
            try:
                cp_val = float(cp)
                d2_eval = d2.subs(var_symbol, cp)
                y_val = expr.subs(var_symbol, cp)

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
                    f"Step 4: At x = {round(cp_val, 4)}: f''({round(cp_val, 4)}) = {round(float(d2_eval), 4)} -> {classification} at ({round(cp_val, 4)}, {round(float(y_val), 4)})"
                )
            except Exception:
                continue

        if not extrema_results:
            answer = f"First derivative f'(x) = {d1}. No real critical points found."
            latex_answer = f"f'(x) = {sp.latex(d1)}"
        else:
            pts_str = ", ".join([f"({e['x']}, {e['y']})" for e in extrema_results])
            types_str = ", ".join([e['type'] for e in extrema_results])
            crits_str = ", ".join([str(e['x']) for e in extrema_results])
            answer = (
                f"Maxima and Minima Analysis\n\n"
                f"Function:\nf(x) = {expr}\n\n"
                f"First derivative:\nf'(x) = {d1}\n\n"
                f"Critical points:\nx = {crits_str}\n\n"
                f"Second derivative:\nf''(x) = {d2}\n\n"
                f"Classification:\n{types_str}\n\n"
                f"Extremum points:\n{pts_str}"
            )
            latex_answer = f"\\text{{Extrema: }} {pts_str}"

        x_vals = np.linspace(-5, 5, 80).tolist()
        f_np = sp.lambdify(var_symbol, expr, 'numpy')
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
                "title": f"Maxima and Minima Analysis for f(x) = {expr}",
                "data": {
                    "x": x_vals,
                    "y": y_vals,
                    "exprStr": str(expr)
                }
            }
        }

    # 4. HIGHER ORDER DERIVATIVES
    elif topic_id == "higher-order-derivatives":
        expr, symbols = parse_math_expression(expression, ['x'])
        order = int(params.get("order", 2))
        deriv = sp.diff(expr, var_symbol, order)

        steps = [
            f"Function: f(x) = {expr}",
            f"Differentiate {order} times w.r.t x",
            f"f^({order})(x) = {deriv}"
        ]
        answer = f"{deriv}"
        latex_answer = f"\\frac{{d^{{{order}}}}}{{dx^{{{order}}}}} \\left({sp.latex(expr)}\\right) = {sp.latex(deriv)}"

        x_vals = np.linspace(-4, 4, 60).tolist()
        f_np = sp.lambdify(var_symbol, expr, 'numpy')
        dn_np = sp.lambdify(var_symbol, deriv, 'numpy')
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
        expr, symbols = parse_math_expression(expression, ['x', 'y'])
        wrt = params.get("variable", "x")
        wrt_sym = sp.Symbol(wrt)
        p_deriv = sp.diff(expr, wrt_sym)

        steps = [
            f"Multivariable Function: f(x,y) = {expr}",
            f"Partial derivative w.r.t {wrt}",
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

    # 6. IMPLICIT DIFFERENTIATION
    elif topic_id == "implicit-differentiation":
        expr, symbols = parse_math_expression(expression, ['x', 'y'])
        fx = sp.diff(expr, var_symbol)
        fy = sp.diff(expr, y_symbol)
        if fy != 0:
            dydx = -fx / fy
        else:
            dydx = sp.sympify(0)

        steps = [
            f"Implicit Equation F(x,y) = {expr} = 0",
            f"Partial F_x = {fx}",
            f"Partial F_y = {fy}",
            f"Apply dy/dx = -F_x / F_y",
            f"dy/dx = {dydx}"
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

    # 7. PARAMETRIC DIFFERENTIATION
    elif topic_id == "parametric-differentiation":
        t_sym = sp.Symbol('t')
        x_expr, _ = parse_math_expression(expression, ['t'])
        y_expr_str = params.get("yExpr", "t^3")
        y_expr, _ = parse_math_expression(y_expr_str, ['t'])

        dxdt = sp.diff(x_expr, t_sym)
        dydt = sp.diff(y_expr, t_sym)
        dydx = sp.cancel(dydt / dxdt) if dxdt != 0 else sp.sympify(0)

        steps = [
            f"Parametric x(t) = {x_expr}, y(t) = {y_expr}",
            f"dx/dt = {dxdt}",
            f"dy/dt = {dydt}",
            f"dy/dx = (dy/dt) / (dx/dt) = {dydx}"
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

    # 8. TAYLOR & MACLAURIN
    elif topic_id in ["taylor-series", "maclaurin-series"]:
        expr, symbols = parse_math_expression(expression, ['x'])
        point = float(params.get("point", 0.0 if topic_id == "maclaurin-series" else 1.0))
        n_terms = int(params.get("terms", 4))

        series = sp.series(expr, var_symbol, point, n_terms).removeO()

        steps = [
            f"Compute Taylor series for f(x) = {expr} centered at a = {point}",
            f"Evaluated derivative terms up to n = {n_terms}",
            f"Polynomial P_{n_terms}(x) = {series}"
        ]
        answer = f"{series}"
        latex_answer = f"P_{{{n_terms}}}(x) = {sp.latex(series)}"

        x_vals = np.linspace(point - 3, point + 3, 50).tolist()
        f_np = sp.lambdify(var_symbol, expr, 'numpy')
        p_np = sp.lambdify(var_symbol, series, 'numpy')
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

    # 9. INTEGRATION
    elif topic_id in ["indefinite-integration", "definite-integration", "double-integration", "triple-integration"]:
        expr, symbols = parse_math_expression(expression, ['x', 'y', 'z'])
        if topic_id == "double-integration":
            val = sp.integrate(expr, (var_symbol, 0, 2), (y_symbol, 0, 2))
            steps = [
                f"Integrate f(x,y) = {expr} over region x ∈ [0, 2], y ∈ [0, 2]",
                f"Double integral result = {val}"
            ]
            answer = f"{val}"
            latex_answer = f"\\iint \\left({sp.latex(expr)}\\right) dx dy = {sp.latex(val)}"
            viz_type = "AREA_UNDER_CURVE"
            viz_data = {"x": [0, 2], "y": [0, 2], "areaValue": float(val) if val.is_real and val.is_number else 0.0}

        elif topic_id == "triple-integration":
            val = sp.integrate(expr, (var_symbol, 0, 2), (y_symbol, 0, 2), (z_symbol, 0, 2))
            steps = [
                f"Integrate f(x,y,z) = {expr} over 3D region x,y,z ∈ [0, 2]",
                f"Triple integral result = {val}"
            ]
            answer = f"{val}"
            latex_answer = f"\\iiint \\left({sp.latex(expr)}\\right) dx dy dz = {sp.latex(val)}"
            viz_type = "SURFACE_3D"
            viz_data = {"planeNormal": [1, 2, 3]}

        elif topic_id == "definite-integration":
            a = float(params.get("lowerBound", 0.0))
            b = float(params.get("upperBound", 2.0))
            val = sp.integrate(expr, (var_symbol, a, b))

            steps = [
                f"Antiderivative F(x) = ∫({expr}) dx",
                f"Fundamental Theorem of Calculus: F({b}) - F({a})",
                f"Definite Integral Area = {val}"
            ]
            answer = f"{val}"
            latex_answer = f"\\int_{{{a}}}^{{{b}}} \\left({sp.latex(expr)}\\right) dx = {sp.latex(val)}"

            x_vals = np.linspace(a - 2, b + 2, 60).tolist()
            f_np = sp.lambdify(var_symbol, expr, 'numpy')
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
            integ = sp.integrate(expr, var_symbol)
            steps = [
                f"Integrand: f(x) = {expr}",
                f"Apply antiderivative integration rules",
                f"Antiderivative: {integ} + C"
            ]
            answer = f"{integ} + C"
            latex_answer = f"\\int \\left({sp.latex(expr)}\\right) dx = {sp.latex(integ)} + C"

            x_vals = np.linspace(-5, 5, 60).tolist()
            f_np = sp.lambdify(var_symbol, integ, 'numpy')
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
                "title": f"Integration Interpretation - {topic}",
                "data": viz_data
            }
        }

    # 10. DIFFERENTIATION & DEFAULT
    else:
        expr, symbols = parse_math_expression(expression, ['x'])
        order = int(params.get("order", 1))
        deriv = sp.diff(expr, var_symbol, order)

        steps = [
            f"Function: f(x) = {expr}",
            f"Differentiate w.r.t x (Order = {order})",
            f"Derivative: f'({var_symbol}) = {deriv}"
        ]
        answer = f"{deriv}"
        latex_answer = f"f'(x) = {sp.latex(deriv)}"

        x_vals = np.linspace(-5, 5, 60).tolist()
        f_np = sp.lambdify(var_symbol, expr, 'numpy')
        df_np = sp.lambdify(var_symbol, deriv, 'numpy')
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

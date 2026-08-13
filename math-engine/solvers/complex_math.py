import numpy as np
import sympy as sp

def solve_complex_math(topic: str, expression: str, params: dict = None):
    params = params or {}
    topic_clean = (topic or "").lower().strip().replace(" ", "-")

    z1_real = float(params.get("z1_real", 3.0))
    z1_imag = float(params.get("z1_imag", 4.0))
    z2_real = float(params.get("z2_real", 1.0))
    z2_imag = float(params.get("z2_imag", 2.0))

    z1 = complex(z1_real, z1_imag)
    z2 = complex(z2_real, z2_imag)

    pts = [
        {"label": "z1", "real": z1_real, "imag": z1_imag, "color": "#00f2fe"},
        {"label": "z2", "real": z2_real, "imag": z2_imag, "color": "#a855f7"}
    ]

    # 1. COMPLEX ADDITION
    if "addition" in topic_clean:
        res = z1 + z2
        steps = [
            f"Given z1 = {z1_real} + {z1_imag}i and z2 = {z2_real} + {z2_imag}i",
            f"Add real parts: {z1_real} + {z2_real} = {res.real}",
            f"Add imaginary parts: {z1_imag} + {z2_imag} = {res.imag}",
            f"Result z1 + z2 = {res.real} + {res.imag}i"
        ]
        answer = f"z1 + z2 = {res.real} + {res.imag}i"
        latex_answer = f"z_1 + z_2 = {res.real} + {res.imag}i"
        pts.append({"label": "z1+z2", "real": res.real, "imag": res.imag, "color": "#00ff88"})

    # 2. COMPLEX MULTIPLICATION
    elif "multiplication" in topic_clean:
        res = z1 * z2
        steps = [
            f"Given z1 = {z1_real} + {z1_imag}i and z2 = {z2_real} + {z2_imag}i",
            f"Expand product: (a*c - b*d) + (a*d + b*c)i",
            f"Real part: ({z1_real}*{z2_real} - {z1_imag}*{z2_imag}) = {res.real}",
            f"Imaginary part: ({z1_real}*{z2_imag} + {z1_imag}*{z2_real}) = {res.imag}",
            f"Result z1 * z2 = {res.real} + {res.imag}i"
        ]
        answer = f"z1 * z2 = {res.real} + {res.imag}i"
        latex_answer = f"z_1 \\cdot z_2 = {res.real} + {res.imag}i"
        pts.append({"label": "z1*z2", "real": res.real, "imag": res.imag, "color": "#00ff88"})

    # 3. COMPLEX DIVISION
    elif "division" in topic_clean:
        if z2 == 0:
            raise ValueError("Complex division by zero is undefined.")
        res = z1 / z2
        res_r = round(res.real, 4)
        res_i = round(res.imag, 4)
        steps = [
            f"Given z1 = {z1_real} + {z1_imag}i and z2 = {z2_real} + {z2_imag}i",
            f"Multiply numerator and denominator by conjugate z2* = {z2_real} - {z2_imag}i",
            f"Denominator magnitude |z2|² = {z2_real}² + {z2_imag}² = {z2_real**2 + z2_imag**2}",
            f"Result z1 / z2 = {res_r} + {res_i}i"
        ]
        answer = f"z1 / z2 = {res_r} + {res_i}i"
        latex_answer = f"\\frac{{z_1}}{{z_2}} = {res_r} + {res_i}i"
        pts.append({"label": "z1/z2", "real": res_r, "imag": res_i, "color": "#00ff88"})

    # 4. POLAR FORM
    elif "polar" in topic_clean:
        r = float(np.abs(z1))
        theta = float(np.angle(z1))
        r_clean = round(r, 4)
        theta_clean = round(theta, 4)
        theta_deg = round(float(np.degrees(theta)), 2)
        steps = [
            f"Given z = {z1_real} + {z1_imag}i",
            f"1. Compute modulus r = √(a² + b²) = √({z1_real}² + {z1_imag}²) = {r_clean}",
            f"2. Compute argument θ = atan2(b, a) = {theta_clean} rad ({theta_deg}°)",
            f"3. Polar Form: z = {r_clean} * (cos({theta_clean}) + i sin({theta_clean}))"
        ]
        answer = f"Modulus r = {r_clean}\nArgument θ = {theta_clean} rad ({theta_deg}°)\nPolar Form: z = {r_clean}(cos({theta_clean}) + i sin({theta_clean}))"
        latex_answer = f"z = {r_clean}\\left(\\cos({theta_clean}) + i\\sin({theta_clean})\\right)"

    # 5. EULER FORM
    elif "euler" in topic_clean:
        r = float(np.abs(z1))
        theta = float(np.angle(z1))
        r_clean = round(r, 4)
        theta_clean = round(theta, 4)
        steps = [
            f"Given z = {z1_real} + {z1_imag}i",
            f"1. Compute modulus r = |z| = {r_clean}",
            f"2. Compute argument θ = arg(z) = {theta_clean} rad",
            f"3. Apply Euler formula z = r * e^(iθ)",
            f"Euler Form: z = {r_clean} * e^({theta_clean}i)"
        ]
        answer = f"Euler Form: z = {r_clean} * e^({theta_clean}i)"
        latex_answer = f"z = {r_clean} e^{{{theta_clean}i}}"

    # 6. DE MOIVRE THEOREM
    elif "moivre" in topic_clean:
        n = int(params.get("n", 3))
        r = float(np.abs(z1))
        theta = float(np.angle(z1))
        rn = round(r**n, 4)
        ntheta = round(n * theta, 4)
        res_pow = z1 ** n
        res_pow_r = round(res_pow.real, 4)
        res_pow_i = round(res_pow.imag, 4)

        steps = [
            f"Given z = {z1_real} + {z1_imag}i, Power n = {n}",
            f"1. Compute r^n = ({round(r, 4)})^{n} = {rn}",
            f"2. Compute angle n*θ = {n} * {round(theta, 4)} = {ntheta} rad",
            f"3. Apply De Moivre: z^n = r^n (cos(nθ) + i sin(nθ)) = {res_pow_r} + {res_pow_i}i"
        ]
        answer = f"z^{n} = {res_pow_r} + {res_pow_i}i\nr^{n} = {rn}, nθ = {ntheta} rad"
        latex_answer = f"z^{{{n}}} = {rn} e^{{{ntheta} i}} = {res_pow_r} + {res_pow_i}i"
        pts.append({"label": f"z^{n}", "real": res_pow_r, "imag": res_pow_i, "color": "#00ff88"})

    # 7. COMPLEX ROOTS
    elif "roots" in topic_clean:
        n = int(params.get("n", 3))
        r = float(np.abs(z1))
        theta = float(np.angle(z1))
        r_root = round(r ** (1 / n), 4)

        root_list = []
        for k in range(n):
            angle_k = (theta + 2 * np.pi * k) / n
            rk_real = round(r_root * np.cos(angle_k), 4)
            rk_imag = round(r_root * np.sin(angle_k), 4)
            root_list.append(f"w_{k} = {rk_real} + {rk_imag}i")
            pts.append({"label": f"w_{k}", "real": rk_real, "imag": rk_imag, "color": "#00ff88"})

        steps = [
            f"Given z = {z1_real} + {z1_imag}i, Root degree n = {n}",
            f"Modulus of roots r^(1/n) = {r_root}",
            f"Root angles θ_k = (θ + 2kπ)/n for k = 0, 1, ..., {n-1}",
            f"All {n} symmetric roots evaluated on radius r = {r_root}"
        ]
        answer = f"All {n} Complex Roots:\n" + "\n".join(root_list)
        latex_answer = f"w_k = {r_root} e^{{i \\frac{{\\theta + 2k\\pi}}{{{n}}}}}"

    # 8. COMPLEX PLANE VISUALIZATION
    else:
        r = float(np.abs(z1))
        theta = float(np.angle(z1))
        theta_deg = round(float(np.degrees(theta)), 2)

        steps = [
            f"Complex Number z = {z1_real} + {z1_imag}i",
            f"Real Part Re(z) = {z1_real}",
            f"Imaginary Part Im(z) = {z1_imag}",
            f"Modulus |z| = √({z1_real}² + {z1_imag}²) = {round(r, 4)}",
            f"Argument arg(z) = {round(theta, 4)} rad ({theta_deg}°)"
        ]
        answer = f"Re(z) = {z1_real}\nIm(z) = {z1_imag}\n|z| = {round(r, 4)}\narg(z) = {round(theta, 4)} rad ({theta_deg}°)"
        latex_answer = f"z = {z1_real} + {z1_imag}i, \\quad |z| = {round(r, 4)}"

    return {
        "answer": answer,
        "latexAnswer": latex_answer,
        "steps": steps,
        "visualization": {
            "type": "COMPLEX_PLANE",
            "title": f"Argand Complex Plane — {topic_clean.replace('-', ' ').title()}",
            "data": {
                "points": pts
            }
        }
    }

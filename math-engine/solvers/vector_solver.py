import numpy as np
import sympy as sp

def solve_vector_topic(topic_id: str, expression: str, params: dict):
    u_raw = params.get("vectorU", [1, 2, 3])
    v_raw = params.get("vectorV", [4, 5, 6])
    w_raw = params.get("vectorW", [7, 8, 9])

    try:
        u = np.array(u_raw, dtype=float)
        v = np.array(v_raw, dtype=float)
        w = np.array(w_raw, dtype=float)
    except Exception:
        u = np.array([1.0, 2.0, 3.0])
        v = np.array([4.0, 5.0, 6.0])
        w = np.array([7.0, 8.0, 9.0])

    out_vectors = [
        {"name": "u", "coords": u.tolist(), "color": "#00f2fe"},
        {"name": "v", "coords": v.tolist(), "color": "#a855f7"}
    ]
    viz_type = "VECTOR_3D"
    topic_clean = topic_id.lower().strip()

    # 1. VECTOR ADDITION
    if "addition" in topic_clean:
        res = u + v
        res_clean = [int(x) if float(x).is_integer() else round(x, 4) for x in res]
        steps = [
            f"Add corresponding components of u={u.tolist()} and v={v.tolist()}",
            f"Result u + v = ({u[0]}+{v[0]}, {u[1]}+{v[1]}, {u[2]}+{v[2]}) = {res_clean}"
        ]
        answer = f"u + v = {res_clean}"
        latex_answer = f"\\vec{{u}} + \\vec{{v}} = {sp.latex(sp.Matrix(res_clean))}"
        out_vectors.append({"name": "u+v", "coords": res_clean, "color": "#00ff88"})

    # 2. VECTOR SUBTRACTION
    elif "subtraction" in topic_clean:
        res = u - v
        res_clean = [int(x) if float(x).is_integer() else round(x, 4) for x in res]
        steps = [
            f"Subtract corresponding components: u - v",
            f"Result u - v = ({u[0]}-{v[0]}, {u[1]}-{v[1]}, {u[2]}-{v[2]}) = {res_clean}"
        ]
        answer = f"u - v = {res_clean}"
        latex_answer = f"\\vec{{u}} - \\vec{{v}} = {sp.latex(sp.Matrix(res_clean))}"
        out_vectors.append({"name": "u-v", "coords": res_clean, "color": "#ff007f"})

    # 3. VECTOR MAGNITUDE
    elif "magnitude" in topic_clean:
        mag = float(np.linalg.norm(u))
        mag_clean = int(mag) if float(mag).is_integer() else round(mag, 4)
        steps = [
            f"Vector u = {u.tolist()}",
            "Apply Euclidean norm formula: |u| = √(u_x² + u_y² + u_z²)",
            f"|u| = √({u[0]}² + {u[1]}² + {u[2]}²) = {mag_clean}"
        ]
        answer = f"|u| = {mag_clean}"
        latex_answer = f"|\\vec{{u}}| = {mag_clean}"

    # 4. DOT PRODUCT
    elif "dot" in topic_clean:
        dot = float(np.dot(u, v))
        dot_clean = int(dot) if float(dot).is_integer() else round(dot, 4)
        mag_u = np.linalg.norm(u)
        mag_v = np.linalg.norm(v)
        cos_theta = dot / (mag_u * mag_v) if (mag_u * mag_v) > 0 else 0
        angle_rad = np.arccos(np.clip(cos_theta, -1.0, 1.0))
        angle_deg = round(float(np.degrees(angle_rad)), 2)

        steps = [
            f"Vector u = {u.tolist()}, Vector v = {v.tolist()}",
            f"Compute scalar dot product u · v = u_x*v_x + u_y*v_y + u_z*v_z = {dot_clean}",
            f"Angle between vectors: θ = {angle_deg}° ({round(angle_rad, 4)} rad)"
        ]
        answer = f"u · v = {dot_clean}\nIncluded Angle θ = {angle_deg}°"
        latex_answer = f"\\vec{{u}} \\cdot \\vec{{v}} = {dot_clean}, \\quad \\theta = {angle_deg}^\\circ"

    # 5. CROSS PRODUCT
    elif "cross" in topic_clean:
        cross = np.cross(u, v)
        cross_clean = [int(x) if float(x).is_integer() else round(x, 4) for x in cross]
        steps = [
            f"Vector u = {u.tolist()}, Vector v = {v.tolist()}",
            "Form 3x3 determinant with unit vectors i, j, k",
            f"u × v = ({u[1]}*{v[2]} - {u[2]}*{v[1]})i - ({u[0]}*{v[2]} - {u[2]}*{v[0]})j + ({u[0]}*{v[1]} - {u[1]}*{v[0]})k",
            f"Result u × v = {cross_clean}"
        ]
        answer = f"u × v = {cross_clean}"
        latex_answer = f"\\vec{{u}} \\times \\vec{{v}} = {sp.latex(sp.Matrix(cross_clean))}"
        out_vectors.append({"name": "u x v", "coords": cross_clean, "color": "#00ff88"})

    # 6. SCALAR PROJECTION
    elif "scalar-projection" in topic_clean:
        v_norm = float(np.linalg.norm(v))
        if v_norm == 0:
            raise ValueError("Scalar projection undefined: direction vector v has zero magnitude.")
        comp = float(np.dot(u, v) / v_norm)
        comp_clean = int(comp) if float(comp).is_integer() else round(comp, 4)
        steps = [
            f"Vector u = {u.tolist()}, Vector v = {v.tolist()}",
            f"1. Compute dot product u · v = {np.dot(u, v)}",
            f"2. Compute magnitude |v| = {round(v_norm, 4)}",
            f"3. Scalar projection comp_v(u) = (u · v) / |v| = {comp_clean}"
        ]
        answer = f"comp_v(u) = {comp_clean}"
        latex_answer = f"\\text{{comp}}_{{v}}u = {comp_clean}"

    # 7. VECTOR PROJECTION
    elif "vector-projection" in topic_clean or "projection" in topic_clean:
        v_sq = float(np.dot(v, v))
        if v_sq == 0:
            raise ValueError("Vector projection undefined: direction vector v has zero magnitude.")
        scale = np.dot(u, v) / v_sq
        proj = np.round(scale * v, 4)
        proj_clean = [int(x) if float(x).is_integer() else round(x, 4) for x in proj]
        steps = [
            f"Vector u = {u.tolist()}, Vector v = {v.tolist()}",
            f"1. Compute scalar multiplier (u · v) / |v|² = {round(scale, 4)}",
            f"2. Vector projection proj_v(u) = [(u · v) / |v|²] * v = {proj_clean}"
        ]
        answer = f"proj_v(u) = {proj_clean}"
        latex_answer = f"\\text{{proj}}_{{v}}u = {sp.latex(sp.Matrix(proj_clean))}"
        out_vectors.append({"name": "proj_v(u)", "coords": proj_clean, "color": "#00ff88"})

    # 8. SCALAR TRIPLE PRODUCT
    elif "scalar-triple" in topic_clean:
        out_vectors.append({"name": "w", "coords": w.tolist(), "color": "#ffaa00"})
        v_cross_w = np.cross(v, w)
        stp = float(np.dot(u, v_cross_w))
        stp_clean = int(stp) if float(stp).is_integer() else round(stp, 4)
        steps = [
            f"Vectors u={u.tolist()}, v={v.tolist()}, w={w.tolist()}",
            f"1. Cross product v × w = {v_cross_w.tolist()}",
            f"2. Dot product u · (v × w) = {stp_clean}",
            f"Geometric Meaning: Volume of parallelepiped = {abs(stp_clean)}"
        ]
        answer = f"u · (v × w) = {stp_clean}\nParallelepiped Volume = {abs(stp_clean)}"
        latex_answer = f"\\vec{{u}} \\cdot (\\vec{{v}} \\times \\vec{{w}}) = {stp_clean}"

    # 9. VECTOR TRIPLE PRODUCT
    elif "vector-triple" in topic_clean:
        out_vectors.append({"name": "w", "coords": w.tolist(), "color": "#ffaa00"})
        v_cross_w = np.cross(v, w)
        vtp = np.cross(u, v_cross_w)
        vtp_clean = [int(x) if float(x).is_integer() else round(x, 4) for x in vtp]
        steps = [
            f"Vectors u={u.tolist()}, v={v.tolist()}, w={w.tolist()}",
            f"1. Compute v × w = {v_cross_w.tolist()}",
            f"2. Compute u × (v × w) = {vtp_clean}",
            "Vector Identity Check: (u · w)v - (u · v)w"
        ]
        answer = f"u × (v × w) = {vtp_clean}"
        latex_answer = f"\\vec{{u}} \\times (\\vec{{v}} \\times \\vec{{w}}) = {sp.latex(sp.Matrix(vtp_clean))}"
        out_vectors.append({"name": "u x (v x w)", "coords": vtp_clean, "color": "#00ff88"})

    # 10. LINE EQUATION IN 3D
    elif "line" in topic_clean:
        p0 = u.tolist()
        d = v.tolist()
        steps = [
            f"Point P0 = ({p0[0]}, {p0[1]}, {p0[2]}), Direction d = ({d[0]}, {d[1]}, {d[2]})",
            "Vector Form: r(t) = P0 + t * d",
            f"Parametric Form: x(t) = {p0[0]} + {d[0]}t, y(t) = {p0[1]} + {d[1]}t, z(t) = {p0[2]} + {d[2]}t",
            f"Symmetric Form: (x - {p0[0]})/{d[0]} = (y - {p0[1]})/{d[1]} = (z - {p0[2]})/{d[2]}" if not any(x == 0 for x in d) else "Symmetric form contains zero direction component"
        ]
        answer = f"Vector Line Equation:\nr(t) = ({p0[0]} + {d[0]}t, {p0[1]} + {d[1]}t, {p0[2]} + {d[2]}t)"
        latex_answer = f"\\vec{{r}}(t) = {sp.latex(sp.Matrix(p0))} + t {sp.latex(sp.Matrix(d))}"

    # 11. PLANE EQUATION
    elif "plane" in topic_clean:
        norm = np.cross(u, v)
        if np.all(norm == 0):
            norm = np.array([0.0, 0.0, 1.0])
        norm_clean = [int(x) if float(x).is_integer() else round(x, 4) for x in norm]
        d_val = float(np.dot(norm, u))
        d_clean = int(d_val) if float(d_val).is_integer() else round(d_val, 4)
        steps = [
            f"Point P0 = {u.tolist()}, Normal N = u × v = {norm_clean}",
            "Plane equation: a(x - x0) + b(y - y0) + c(z - z0) = 0",
            f"Standard Form: {norm_clean[0]}x + {norm_clean[1]}y + {norm_clean[2]}z = {d_clean}"
        ]
        answer = f"Plane Equation:\n{norm_clean[0]}x + {norm_clean[1]}y + {norm_clean[2]}z = {d_clean}"
        latex_answer = f"{norm_clean[0]}x + {norm_clean[1]}y + {norm_clean[2]}z = {d_clean}"
        viz_type = "PLANE_3D"
        out_vectors.append({"name": "Normal N", "coords": norm_clean, "color": "#00ff88"})

    else:
        answer = f"Vector Result: u = {u.tolist()}, v = {v.tolist()}"
        latex_answer = f"\\vec{{u}} = {sp.latex(sp.Matrix(u.tolist()))}"
        steps = ["Evaluated vector operation"]

    return {
        "answer": answer,
        "latexAnswer": latex_answer,
        "steps": steps,
        "visualization": {
            "type": viz_type,
            "title": f"Vector Mathematics — {topic_clean.replace('-', ' ').title()}",
            "data": {
                "vectors": out_vectors,
                "planeNormal": u.tolist()
            }
        }
    }

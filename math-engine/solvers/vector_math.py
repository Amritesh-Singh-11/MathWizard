import numpy as np
import sympy as sp

def solve_vector_math(topic: str, expression: str, params: dict = None):
    params = params or {}
    topic_lower = topic.lower()

    vec_u = np.array(params.get("vectorU", [1, 2, 3]), dtype=float)
    vec_v = np.array(params.get("vectorV", [4, 5, 6]), dtype=float)
    vec_w = np.array(params.get("vectorW", [7, 8, 9]), dtype=float)

    steps = []
    answer = ""
    latex_answer = ""
    out_vectors = [
        {"name": "u", "coords": vec_u.tolist(), "color": "#00f2fe"},
        {"name": "v", "coords": vec_v.tolist(), "color": "#a855f7"}
    ]
    viz_type = "VECTOR_3D"

    if "addition" in topic_lower:
        res = vec_u + vec_v
        steps = [
            f"Add corresponding components of u={vec_u.tolist()} and v={vec_v.tolist()}",
            f"Result u + v = {res.tolist()}"
        ]
        answer = f"u + v = {res.tolist()}"
        latex_answer = f"\\vec{{u}} + \\vec{{v}} = {sp.latex(sp.Matrix(res))}"
        out_vectors.append({"name": "u+v", "coords": res.tolist(), "color": "#00ff88"})

    elif "subtraction" in topic_lower:
        res = vec_u - vec_v
        steps = [
            f"Subtract vector v from u componentwise",
            f"Result u - v = {res.tolist()}"
        ]
        answer = f"u - v = {res.tolist()}"
        latex_answer = f"\\vec{{u}} - \\vec{{v}} = {sp.latex(sp.Matrix(res))}"
        out_vectors.append({"name": "u-v", "coords": res.tolist(), "color": "#ff007f"})

    elif "cross product" in topic_lower:
        cross = np.cross(vec_u, vec_v)
        steps = [
            "Form 3x3 determinant with unit vectors i, j, k",
            f"Result u × v = {cross.tolist()}"
        ]
        answer = f"u × v = {cross.tolist()}"
        latex_answer = f"\\vec{{u}} \\times \\vec{{v}} = {sp.latex(sp.Matrix(cross))}"
        out_vectors.append({"name": "u x v", "coords": cross.tolist(), "color": "#00ff88"})

    elif "plane" in topic_lower:
        norm = np.cross(vec_u, vec_v)
        steps = [
            f"Normal vector to plane N = {norm.tolist()}",
            f"Plane Equation: {norm[0]}x + {norm[1]}y + {norm[2]}z = 0"
        ]
        answer = f"Plane Equation: {norm[0]}x + {norm[1]}y + {norm[2]}z = 0"
        latex_answer = f"{norm[0]}x + {norm[1]}y + {norm[2]}z = 0"
        viz_type = "PLANE_3D"
        out_vectors.append({"name": "Normal N", "coords": norm.tolist(), "color": "#00ff88"})

    else:
        dot = float(np.dot(vec_u, vec_v))
        steps = [
            "Compute scalar dot product: u · v = u_x*v_x + u_y*v_y + u_z*v_z",
            f"Result: {dot}"
        ]
        answer = f"u · v = {dot}"
        latex_answer = f"\\vec{{u}} \\cdot \\vec{{v}} = {dot}"

    return {
        "answer": answer,
        "latexAnswer": latex_answer,
        "steps": steps,
        "visualization": {
            "type": viz_type,
            "title": f"3D Vector Geometry - {topic}",
            "data": {
                "vectors": out_vectors,
                "planeNormal": vec_u.tolist()
            }
        }
    }

import numpy as np
import sympy as sp

def solve_linear_algebra_topic(topic_id: str, expression: str, params: dict):
    mat_a_raw = params.get("matrixA", [[1, 2], [3, 4]])
    mat_b_raw = params.get("matrixB", [[5, 6], [7, 8]])

    try:
        mat_A = np.array(mat_a_raw, dtype=float)
        mat_B = np.array(mat_b_raw, dtype=float)
    except Exception:
        mat_A = np.array([[1.0, 2.0], [3.0, 4.0]], dtype=float)
        mat_B = np.array([[5.0, 6.0], [7.0, 8.0]], dtype=float)

    topic_clean = topic_id.lower().strip()

    # 1. MATRIX ADDITION
    if "addition" in topic_clean:
        if mat_A.shape != mat_B.shape:
            raise ValueError(f"Matrix addition undefined: dimensions {mat_A.shape[0]}x{mat_A.shape[1]} and {mat_B.shape[0]}x{mat_B.shape[1]} do not match.")
        res = mat_A + mat_B
        steps = [
            f"Check dimensions: Matrix A is {mat_A.shape[0]}x{mat_A.shape[1]}, Matrix B is {mat_B.shape[0]}x{mat_B.shape[1]}",
            "Add corresponding elements: c_ij = a_ij + b_ij",
            f"Result Matrix C = A + B computed"
        ]
        answer = f"C = A + B =\n{res.tolist()}"
        latex_answer = f"A + B = {sp.latex(sp.Matrix(res))}"
        viz_type = "MATRIX_OPERATION"
        viz_data = {
            "matrixA": mat_A.tolist(),
            "matrixB": mat_B.tolist(),
            "matrixC": res.tolist(),
            "operator": "+",
            "stepsInfo": [f"a{r+1}{c+1} + b{r+1}{c+1} = {res[r][c]}" for r in range(res.shape[0]) for c in range(res.shape[1])]
        }

    # 2. MATRIX SUBTRACTION
    elif "subtraction" in topic_clean:
        if mat_A.shape != mat_B.shape:
            raise ValueError(f"Matrix subtraction undefined: dimensions {mat_A.shape[0]}x{mat_A.shape[1]} and {mat_B.shape[0]}x{mat_B.shape[1]} do not match.")
        res = mat_A - mat_B
        steps = [
            f"Check dimensions: Matrix A is {mat_A.shape[0]}x{mat_A.shape[1]}, Matrix B is {mat_B.shape[0]}x{mat_B.shape[1]}",
            "Subtract corresponding elements: c_ij = a_ij - b_ij",
            f"Result Matrix C = A - B computed"
        ]
        answer = f"C = A - B =\n{res.tolist()}"
        latex_answer = f"A - B = {sp.latex(sp.Matrix(res))}"
        viz_type = "MATRIX_OPERATION"
        viz_data = {
            "matrixA": mat_A.tolist(),
            "matrixB": mat_B.tolist(),
            "matrixC": res.tolist(),
            "operator": "-",
            "stepsInfo": [f"a{r+1}{c+1} - b{r+1}{c+1} = {res[r][c]}" for r in range(res.shape[0]) for c in range(res.shape[1])]
        }

    # 3. MATRIX MULTIPLICATION
    elif "multiplication" in topic_clean:
        if mat_A.shape[1] != mat_B.shape[0]:
            raise ValueError(f"Matrix multiplication undefined: columns of A ({mat_A.shape[1]}) do not equal rows of B ({mat_B.shape[0]}).")
        res = np.dot(mat_A, mat_B)
        steps = [
            f"Check dimension compatibility: A is {mat_A.shape[0]}x{mat_A.shape[1]}, B is {mat_B.shape[0]}x{mat_B.shape[1]}",
            "Compute row-by-column dot products c_ik = Σ a_ij * b_jk",
            f"Result Matrix C = A × B computed ({res.shape[0]}x{res.shape[1]})"
        ]
        answer = f"C = A × B =\n{res.tolist()}"
        latex_answer = f"A \\cdot B = {sp.latex(sp.Matrix(res))}"
        viz_type = "MATRIX_OPERATION"
        viz_data = {
            "matrixA": mat_A.tolist(),
            "matrixB": mat_B.tolist(),
            "matrixC": res.tolist(),
            "operator": "×",
            "stepsInfo": [f"Row {r+1} × Col {c+1} = {res[r][c]}" for r in range(res.shape[0]) for c in range(res.shape[1])]
        }

    # 4. MATRIX TRANSPOSE
    elif "transpose" in topic_clean:
        res = mat_A.T
        steps = [
            f"Input Matrix A ({mat_A.shape[0]}x{mat_A.shape[1]})",
            "Swap rows and columns: element at (i, j) moves to (j, i)",
            f"Result Transpose A^T computed ({res.shape[0]}x{res.shape[1]})"
        ]
        answer = f"A^T =\n{res.tolist()}"
        latex_answer = f"A^T = {sp.latex(sp.Matrix(res))}"
        viz_type = "MATRIX_OPERATION"
        viz_data = {
            "matrixA": mat_A.tolist(),
            "matrixB": mat_A.tolist(),
            "matrixC": res.tolist(),
            "operator": "T",
            "stepsInfo": ["Swapped rows and columns"]
        }

    # 5. MATRIX INVERSE
    elif "inverse" in topic_clean:
        if mat_A.shape[0] != mat_A.shape[1]:
            raise ValueError(f"Matrix inverse requires a square matrix, but got {mat_A.shape[0]}x{mat_A.shape[1]}.")
        det = float(np.linalg.det(mat_A))
        if abs(det) < 1e-9:
            raise ValueError("Matrix is singular (det(A) = 0) and does not have an inverse.")
        inv = np.linalg.inv(mat_A)
        inv_rounded = np.round(inv, 4).tolist()
        steps = [
            f"1. Compute determinant det(A) = {round(det, 4)}",
            "2. Since det(A) ≠ 0, matrix A is non-singular and invertible",
            "3. Compute inverse A^-1 = adj(A) / det(A)",
            f"Result Inverse A^-1 computed"
        ]
        answer = f"A^-1 =\n{inv_rounded}"
        latex_answer = f"A^{{-1}} = {sp.latex(sp.Matrix(inv_rounded))}"
        viz_type = "MATRIX_TRANSFORMATION"
        viz_data = {
            "matrix": mat_A.tolist(),
            "determinant": round(det, 4),
            "eigenvalues": [1.0, 1.0]
        }

    # 6. DETERMINANT CALCULATION
    elif "determinant" in topic_clean:
        if mat_A.shape[0] != mat_A.shape[1]:
            raise ValueError(f"Determinant requires a square matrix, but got {mat_A.shape[0]}x{mat_A.shape[1]}.")
        det = float(np.linalg.det(mat_A))
        det_clean = int(det) if float(det).is_integer() else round(det, 4)
        steps = [
            f"Square Matrix A ({mat_A.shape[0]}x{mat_A.shape[1]})",
            "Apply cofactor expansion along row/column",
            f"Result Determinant det(A) = {det_clean}"
        ]
        answer = f"det(A) = {det_clean}"
        latex_answer = f"\\det(A) = {det_clean}"
        viz_type = "MATRIX_TRANSFORMATION"
        viz_data = {
            "matrix": mat_A.tolist(),
            "determinant": round(det, 4),
            "eigenvalues": [1.0, 1.0]
        }

    # 7. RANK OF MATRIX
    elif "rank" in topic_clean:
        sp_mat = sp.Matrix(mat_A)
        rank = sp_mat.rank()
        rref_mat, pivots = sp_mat.rref()
        steps = [
            f"Input Matrix A ({mat_A.shape[0]}x{mat_A.shape[1]})",
            f"Perform Gaussian elimination to reach Row Echelon Form: {rref_mat.tolist()}",
            f"Pivot columns found: {list(pivots)}",
            f"Rank (number of non-zero rows) = {rank}"
        ]
        answer = f"Rank(A) = {rank}\nRow Echelon Form:\n{rref_mat.tolist()}"
        latex_answer = f"\\text{{Rank}}(A) = {rank}, \\quad \\text{{RREF}} = {sp.latex(rref_mat)}"
        viz_type = "MATRIX_TRANSFORMATION"
        viz_data = {
            "matrix": mat_A.tolist(),
            "determinant": rank,
            "eigenvalues": [rank, rank]
        }

    # 8. GAUSSIAN ELIMINATION
    elif "gaussian" in topic_clean:
        sp_mat = sp.Matrix(mat_A)
        rref_mat, pivots = sp_mat.rref()
        steps = [
            f"Augmented Matrix A: {mat_A.tolist()}",
            "Apply elementary row operations (scale, swap, row addition)",
            f"Reduced Row Echelon Form (RREF): {rref_mat.tolist()}",
            f"Pivots at columns: {list(pivots)}"
        ]
        answer = f"Row Echelon Form:\n{rref_mat.tolist()}"
        latex_answer = f"\\text{{RREF}} = {sp.latex(rref_mat)}"
        viz_type = "MATRIX_OPERATION"
        viz_data = {
            "matrixA": mat_A.tolist(),
            "matrixB": rref_mat.tolist(),
            "matrixC": rref_mat.tolist(),
            "operator": "RREF",
            "stepsInfo": ["Row operations completed"]
        }

    # 9 & 10. EIGENVALUES & EIGENVECTORS
    elif "eigenvalue" in topic_clean or "eigenvector" in topic_clean or "eigen" in topic_clean:
        if mat_A.shape[0] != mat_A.shape[1]:
            raise ValueError(f"Eigenvalue/Eigenvector solver requires a square matrix, but got {mat_A.shape[0]}x{mat_A.shape[1]}.")
        eigenvals, eigenvecs = np.linalg.eig(mat_A)
        evals_raw = np.round(np.real(eigenvals), 4).tolist()
        evals = [int(x) if float(x).is_integer() else x for x in evals_raw]
        evecs = np.round(np.real(eigenvecs), 4).tolist()
        steps = [
            "1. Form characteristic polynomial det(A - λI) = 0",
            f"2. Solve characteristic equation -> Eigenvalues λ = {evals}",
            f"3. Solve homogeneous system (A - λI)v = 0 -> Eigenvectors v"
        ]
        answer = f"Eigenvalues λ = {evals}\nEigenvectors v =\n{evecs}"
        latex_answer = f"\\lambda = {sp.latex(sp.Matrix(evals))}, \\quad v = {sp.latex(sp.Matrix(evecs))}"
        viz_type = "MATRIX_TRANSFORMATION"
        viz_data = {
            "matrix": mat_A.tolist(),
            "determinant": round(float(np.linalg.det(mat_A)), 4),
            "eigenvalues": evals
        }

    # 11. LINEAR EQUATION SOLVER (AX = B)
    elif "linear-equation" in topic_clean or "solver" in topic_clean:
        if mat_A.shape[0] != mat_A.shape[1]:
            raise ValueError(f"Coefficient matrix A must be square, but got {mat_A.shape[0]}x{mat_A.shape[1]}.")
        b_vec = params.get("rhsB", [mat_B[i][0] if len(mat_B[i]) > 0 else 0 for i in range(min(len(mat_B), mat_A.shape[0]))])
        if len(b_vec) < mat_A.shape[0]:
            b_vec = [1.0] * mat_A.shape[0]
        try:
            x_sol = np.linalg.solve(mat_A, b_vec)
            x_clean = [int(v) if float(v).is_integer() else round(v, 4) for v in x_sol]
            steps = [
                f"Coefficient Matrix A = {mat_A.tolist()}, Constant Vector B = {b_vec}",
                "Calculate det(A) to verify unique solution",
                f"Solve system X = A^-1 * B -> Solution X = {x_clean}"
            ]
            answer = f"Unique Solution X = {x_clean}"
            latex_answer = f"X = {sp.latex(sp.Matrix(x_clean))}"
        except np.linalg.LinAlgError:
            answer = "System is inconsistent or has infinitely many solutions (det(A) = 0)."
            latex_answer = "\\text{No unique solution (Singular matrix)}"
            steps = ["Matrix A is singular. Unique solution does not exist."]
        viz_type = "MATRIX_TRANSFORMATION"
        viz_data = {
            "matrix": mat_A.tolist(),
            "determinant": round(float(np.linalg.det(mat_A)), 4),
            "eigenvalues": [1.0, 1.0]
        }

    else:
        # Default matrix fallback
        det = float(np.linalg.det(mat_A))
        answer = f"Matrix A:\n{mat_A.tolist()}\ndet(A) = {round(det, 4)}"
        latex_answer = f"\\det(A) = {round(det, 4)}"
        steps = [f"Evaluated matrix operation for {topic_clean}"]
        viz_type = "MATRIX_TRANSFORMATION"
        viz_data = {"matrix": mat_A.tolist(), "determinant": round(det, 4), "eigenvalues": [1.0, 1.0]}

    return {
        "answer": answer,
        "latexAnswer": latex_answer,
        "steps": steps,
        "visualization": {
            "type": viz_type,
            "title": f"Linear Algebra Solution — {topic_clean.replace('-', ' ').title()}",
            "data": viz_data
        }
    }

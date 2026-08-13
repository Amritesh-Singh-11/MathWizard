import numpy as np
import scipy.stats as stats
import sympy as sp
from typing import Dict, Any

def solve_stats(topic: str, expression: str, params: dict = None):
    params = params or {}
    topic_clean = (topic or "").lower().strip().replace(" ", "-")

    # Parsing dataset array
    data_str = params.get("dataArray", expression or "12, 15, 18, 22, 25")
    try:
        data = [float(x.strip()) for x in data_str.replace(";", ",").split(",") if x.strip()]
    except Exception:
        data = [12.0, 15.0, 18.0, 22.0, 25.0]

    if not data:
        data = [12.0, 15.0, 18.0, 22.0, 25.0]

    arr = np.array(data)
    mean_val = float(np.mean(arr))
    median_val = float(np.median(arr))

    # Population vs Sample DDof option
    is_sample = params.get("isSample", True)
    ddof_val = 1 if (is_sample and len(arr) > 1) else 0

    std_val = float(np.std(arr, ddof=ddof_val))
    var_val = float(np.var(arr, ddof=ddof_val))

    try:
        mode_res = stats.mode(arr, keepdims=True)
        mode_val = float(mode_res.mode[0])
    except Exception:
        mode_val = mean_val

    # 1. PROBABILITY CALCULATION
    if "probability" in topic_clean and "calc" in topic_clean:
        pa = float(params.get("pa", 0.5))
        pb = float(params.get("pb", 0.3))
        p_union = min(1.0, round(pa + pb - (pa * pb), 4))
        steps = [
            f"Given event probabilities P(A) = {pa}, P(B) = {pb}",
            "Assuming independent events: P(A ∩ B) = P(A) * P(B) = " + str(round(pa * pb, 4)),
            f"Union Probability P(A ∪ B) = P(A) + P(B) - P(A ∩ B) = {p_union}"
        ]
        answer = f"P(A) = {pa}\nP(B) = {pb}\nP(A ∩ B) = {round(pa * pb, 4)}\nP(A ∪ B) = {p_union}"
        latex_answer = f"P(A \\cup B) = {p_union}"
        viz_type = "STATISTICS_DISTRIBUTION"

    # 2. PERMUTATIONS
    elif "permutation" in topic_clean:
        n = int(params.get("n", 5))
        r = int(params.get("r", 2))
        if r > n:
            raise ValueError(f"Permutation undefined: r ({r}) cannot exceed total items n ({n}).")
        perm_val = int(sp.factorial(n) / sp.factorial(n - r))
        steps = [
            f"Formula: P(n, r) = n! / (n - r)!",
            f"P({n}, {r}) = {n}! / ({n} - {r})! = {n}! / {n - r}! = {perm_val}"
        ]
        answer = f"P({n}, {r}) = {perm_val}"
        latex_answer = f"P({n}, {r}) = {perm_val}"
        viz_type = "STATISTICS_DISTRIBUTION"

    # 3. COMBINATIONS
    elif "combination" in topic_clean:
        n = int(params.get("n", 5))
        r = int(params.get("r", 2))
        if r > n:
            raise ValueError(f"Combination undefined: r ({r}) cannot exceed total items n ({n}).")
        comb_val = int(sp.binomial(n, r))
        steps = [
            f"Formula: C(n, r) = n! / (r! * (n - r)!)",
            f"C({n}, {r}) = {n}! / ({r}! * ({n} - {r})!) = {comb_val}"
        ]
        answer = f"C({n}, {r}) = {comb_val}"
        latex_answer = f"C({n}, {r}) = {comb_val}"
        viz_type = "STATISTICS_DISTRIBUTION"

    # 4. MEAN
    elif topic_clean == "mean":
        answer = f"Mean μ = {round(mean_val, 4)}"
        steps = [f"Sample dataset N = {len(data)}: {data}", f"Sum = {sum(data)}", f"Mean μ = Sum / N = {sum(data)} / {len(data)} = {round(mean_val, 4)}"]
        latex_answer = f"\\mu = {round(mean_val, 4)}"
        viz_type = "STATISTICS_DISTRIBUTION"

    # 5. MEDIAN
    elif topic_clean == "median":
        sorted_arr = sorted(data)
        answer = f"Median = {round(median_val, 4)}"
        steps = [f"Ordered Dataset: {sorted_arr}", f"Sample size N = {len(data)}", f"Median (middle value) = {round(median_val, 4)}"]
        latex_answer = f"\\text{{Median}} = {round(median_val, 4)}"
        viz_type = "STATISTICS_DISTRIBUTION"

    # 6. MODE
    elif topic_clean == "mode":
        answer = f"Mode = {round(mode_val, 4)}"
        steps = [f"Dataset: {data}", f"Mode (most frequent value) = {round(mode_val, 4)}"]
        latex_answer = f"\\text{{Mode}} = {round(mode_val, 4)}"
        viz_type = "STATISTICS_DISTRIBUTION"

    # 7. VARIANCE
    elif topic_clean == "variance":
        answer = f"Variance ({'Sample s²' if is_sample else 'Population σ²'}) = {round(var_val, 4)}"
        steps = [
            f"Dataset N = {len(data)}, Mean μ = {round(mean_val, 4)}",
            f"Formula: {'s² = Σ(x - μ)² / (N-1)' if is_sample else 'σ² = Σ(x - μ)² / N'}",
            f"Evaluated Variance = {round(var_val, 4)}"
        ]
        latex_answer = f"{'s^2' if is_sample else '\\sigma^2'} = {round(var_val, 4)}"
        viz_type = "STATISTICS_DISTRIBUTION"

    # 8. STANDARD DEVIATION
    elif "standard" in topic_clean or "deviation" in topic_clean:
        answer = f"Standard Deviation ({'Sample s' if is_sample else 'Population σ'}) = {round(std_val, 4)}"
        steps = [
            f"Calculated Variance = {round(var_val, 4)}",
            f"Apply Square Root: Standard Deviation = √({round(var_val, 4)}) = {round(std_val, 4)}"
        ]
        latex_answer = f"{'s' if is_sample else '\\sigma'} = {round(std_val, 4)}"
        viz_type = "STATISTICS_DISTRIBUTION"

    # 9. NORMAL DISTRIBUTION
    elif "normal" in topic_clean:
        mean_p = float(params.get("mean", 0.0))
        std_p = float(params.get("std", 1.0))
        if std_p <= 0:
            raise ValueError("Standard deviation σ must be strictly positive (> 0).")
        x_p = float(params.get("xVal", 1.96))

        z_score = (x_p - mean_p) / std_p
        cdf_val = float(stats.norm.cdf(x_p, loc=mean_p, scale=std_p))
        pdf_val = float(stats.norm.pdf(x_p, loc=mean_p, scale=std_p))

        steps = [
            f"Gaussian Distribution N(μ={mean_p}, σ²={std_p**2})",
            f"Calculate Z-score = (X - μ) / σ = ({x_p} - {mean_p}) / {std_p} = {round(z_score, 4)}",
            f"PDF value f({x_p}) = {round(pdf_val, 5)}",
            f"Cumulative Probability P(X ≤ {x_p}) = {round(cdf_val, 5)}"
        ]
        answer = f"Z-score = {round(z_score, 4)}\nP(X ≤ {x_p}) = {round(cdf_val, 5)}\nPDF f({x_p}) = {round(pdf_val, 5)}"
        latex_answer = f"P(X \\le {x_p}) = {round(cdf_val, 4)}, \\quad Z = {round(z_score, 4)}"
        viz_type = "STATISTICS_DISTRIBUTION"
        mean_val = mean_p
        std_val = std_p

    # 10. REGRESSION ANALYSIS
    elif "regression" in topic_clean:
        # X and Y data arrays
        x_data = [1.0, 2.0, 3.0, 4.0, 5.0]
        y_data = [2.0, 4.0, 5.0, 8.0, 10.0]
        try:
            if "xData" in params and "yData" in params:
                x_data = [float(v) for v in str(params["xData"]).split(",") if v.strip()]
                y_data = [float(v) for v in str(params["yData"]).split(",") if v.strip()]
        except Exception:
            pass

        slope, intercept, r_value, p_value, std_err = stats.linregress(x_data, y_data)
        r2 = r_value ** 2

        steps = [
            f"Pairs (X, Y): X = {x_data}, Y = {y_data}",
            f"Compute slope β1 = Cov(X,Y)/Var(X) = {round(slope, 4)}",
            f"Compute intercept β0 = Y_bar - β1 * X_bar = {round(intercept, 4)}",
            f"Coefficient of Determination R² = {round(r2, 4)}"
        ]
        answer = f"Fitted Regression Line:\ny = {round(slope, 4)}*x + ({round(intercept, 4)})\nR² = {round(r2, 4)}\nSlope β1 = {round(slope, 4)}\nIntercept β0 = {round(intercept, 4)}"
        latex_answer = f"y = {round(slope, 4)}x + {round(intercept, 4)}, \\quad R^2 = {round(r2, 4)}"
        viz_type = "STATISTICS_DISTRIBUTION"

    else:
        answer = f"Summary Statistics for N = {len(data)}:\nMean: {round(mean_val, 4)}\nStd Dev: {round(std_val, 4)}"
        latex_answer = f"\\mu = {round(mean_val, 4)}, \\quad s = {round(std_val, 4)}"
        steps = [f"Computed descriptive statistics for dataset: {data}"]
        viz_type = "STATISTICS_DISTRIBUTION"

    x_curve = np.linspace(mean_val - 3.5 * (std_val or 1.0), mean_val + 3.5 * (std_val or 1.0), 80).tolist()
    y_curve = stats.norm.pdf(x_curve, loc=mean_val, scale=(std_val or 1.0)).tolist()

    return {
        "answer": answer,
        "latexAnswer": latex_answer,
        "steps": steps,
        "visualization": {
            "type": viz_type,
            "title": f"Statistical Analysis — {topic_clean.replace('-', ' ').title()}",
            "data": {
                "x": x_curve,
                "y": y_curve,
                "mean": round(mean_val, 4),
                "std": round(std_val, 4),
                "histogramData": data
            }
        }
    }

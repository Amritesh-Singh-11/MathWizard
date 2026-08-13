import json
import os
import sys
import re
import sympy as sp
import numpy as np
from typing import Dict, Any, List

# Fix UTF-8 encoding for Windows stdout console output
if sys.stdout.encoding != 'utf-8':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

from main import solve_math, MathSolveRequest
from parser import parse_math_expression, ExpressionParseError

def evaluate_symbolic_equivalence(actual_str: str, expected_str: str) -> bool:
    if expected_str in actual_str or expected_str.replace(" ", "") in actual_str.replace(" ", ""):
        return True
    try:
        act_clean = actual_str
        if "=" in actual_str and not actual_str.startswith("P_") and "Continuity Analysis" not in actual_str:
            act_clean = actual_str.split("=")[-1].strip()
        exp_clean = expected_str
        if "=" in expected_str:
            exp_clean = expected_str.split("=")[-1].strip()

        act_clean = act_clean.replace("+ C", "").replace("+C", "").strip()
        exp_clean = exp_clean.replace("+ C", "").replace("+C", "").strip()

        act_expr, _ = parse_math_expression(act_clean)
        exp_expr, _ = parse_math_expression(exp_clean)

        diff = sp.simplify(act_expr - exp_expr)
        return diff == 0
    except Exception:
        return expected_str.replace(" ", "").replace("*", "").lower() in actual_str.replace(" ", "").replace("*", "").lower()

def evaluate_classification(res_data: Dict[str, Any], test_case: Dict[str, Any]) -> bool:
    ans_text = (res_data.get("answer", "") + " " + " ".join(res_data.get("steps", []))).lower()
    exp_class = test_case.get("expected_classification", "").lower()
    exp_ans = test_case.get("expected_answer", "").lower()

    return (exp_class in ans_text or exp_ans in ans_text)

def evaluate_numerical(actual_str: str, expected_str: str) -> bool:
    if expected_str in actual_str:
        return True
    try:
        act_nums = [float(n) for n in re.findall(r"[-+]?\d*\.\d+|\d+", actual_str)]
        exp_num = float(expected_str)
        return any(abs(n - exp_num) < 1e-3 for n in act_nums)
    except Exception:
        return expected_str.lower() in actual_str.lower()

def evaluate_matrix(actual_str: str, expected_str: str) -> bool:
    if expected_str.replace(" ", "") in actual_str.replace(" ", ""):
        return True
    try:
        act_arr = json.loads(actual_str.split("=")[-1].strip())
        exp_arr = json.loads(expected_str.strip())
        return np.allclose(np.array(act_arr, dtype=float), np.array(exp_arr, dtype=float), atol=1e-3)
    except Exception:
        return expected_str.replace(" ", "") in actual_str.replace(" ", "")

def run_all_tests(json_filepath: str):
    if not os.path.exists(json_filepath):
        print(f"Test case file not found at: {json_filepath}")
        return

    with open(json_filepath, 'r', encoding='utf-8') as f:
        test_cases = json.load(f)

    total_tests = len(test_cases)
    passed_tests = 0
    failed_tests = 0

    topic_stats: Dict[str, Dict[str, int]] = {}
    failures = []

    print("==================================================")
    print("      MATHWIZARD ACCURACY REGRESSION SUITE        ")
    print("==================================================")
    print(f"Running {total_tests} test cases...\n")

    for tc in test_cases:
        tc_id = tc.get("id")
        topic = tc.get("topic")
        domain = tc.get("domain", "Calculus")
        expr_input = tc.get("input")
        params = tc.get("params", {})
        test_type = tc.get("test_type", "symbolic_equivalence")

        if topic not in topic_stats:
            topic_stats[topic] = {"total": 0, "passed": 0, "failed": 0}

        topic_stats[topic]["total"] += 1

        req = MathSolveRequest(domain=domain, topic=topic, expression=expr_input, params=params)

        try:
            res = solve_math(req)
            actual_answer = res.get("answer", "")

            is_pass = False
            if test_type == "symbolic_equivalence":
                is_pass = evaluate_symbolic_equivalence(actual_answer, tc.get("expected_answer"))
            elif test_type == "classification":
                is_pass = evaluate_classification(res, tc)
            elif test_type == "numerical":
                is_pass = evaluate_numerical(actual_answer, tc.get("expected_answer"))
            elif test_type == "matrix":
                is_pass = evaluate_matrix(actual_answer, tc.get("expected_answer"))
            else:
                is_pass = tc.get("expected_answer").lower() in actual_answer.lower()

            if is_pass:
                passed_tests += 1
                topic_stats[topic]["passed"] += 1
                print(f"[{tc_id}] PASS - Topic: {topic:<25} | Input: '{expr_input}'")
            else:
                failed_tests += 1
                topic_stats[topic]["failed"] += 1
                reason = f"Expected '{tc.get('expected_answer')}', got '{actual_answer}'"
                print(f"[{tc_id}] FAIL - Topic: {topic:<25} | Input: '{expr_input}' -> {reason}")
                failures.append({
                    "id": tc_id,
                    "topic": topic,
                    "input": expr_input,
                    "expected": tc.get("expected_answer"),
                    "actual": actual_answer,
                    "reason": reason
                })

        except Exception as e:
            failed_tests += 1
            topic_stats[topic]["failed"] += 1
            reason = f"Execution exception: {str(e)}"
            print(f"[{tc_id}] FAIL (ERROR) - Topic: {topic:<25} | Input: '{expr_input}' -> {reason}")
            failures.append({
                "id": tc_id,
                "topic": topic,
                "input": expr_input,
                "expected": tc.get("expected_answer"),
                "actual": "EXCEPTION",
                "reason": reason
            })

    accuracy_pct = (passed_tests / total_tests * 100) if total_tests > 0 else 0.0

    report = f"""
==================================================
            MATHWIZARD ACCURACY REPORT            
==================================================
Total Tests Run: {total_tests}
Passed:          {passed_tests}
Failed:          {failed_tests}
Overall Accuracy: {accuracy_pct:.2f}%

--------------------------------------------------
TOPIC-WISE ACCURACY BREAKDOWN
--------------------------------------------------
"""

    for top, stats in topic_stats.items():
        top_acc = (stats["passed"] / stats["total"] * 100) if stats["total"] > 0 else 0.0
        report += f"{top:<32} | Total: {stats['total']} | Passed: {stats['passed']} | Accuracy: {top_acc:.1f}%\n"

    if failures:
        report += "\n--------------------------------------------------\nFAILED TEST DETAILS\n--------------------------------------------------\n"
        for f in failures:
            report += f"[{f['id']}] Topic: {f['topic']}\n  Input:    {f['input']}\n  Expected: {f['expected']}\n  Actual:   {f['actual']}\n  Reason:   {f['reason']}\n\n"

    print("\n" + report)

    report_path = os.path.join(os.path.dirname(json_filepath), "MATHWIZARD_ACCURACY_REPORT.txt")
    with open(report_path, "w", encoding="utf-8") as rf:
        rf.write(report)
    print(f"Saved formal accuracy report to: {report_path}")

if __name__ == "__main__":
    dataset_path = os.path.join(os.path.dirname(__file__), "MathWizard_178_Accuracy_Test_Cases.json")
    run_all_tests(dataset_path)

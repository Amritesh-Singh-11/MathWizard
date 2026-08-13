import sympy as sp
from sympy.parsing.sympy_parser import (
    parse_expr,
    standard_transformations,
    implicit_multiplication_application,
    convert_xor,
    function_exponentiation
)
from typing import Tuple, List, Optional

class ExpressionParseError(Exception):
    def __init__(self, message: str, example: str = "2x+5"):
        self.message = message
        self.example = example
        super().__init__(self.message)

TRANSFORMATIONS = standard_transformations + (
    implicit_multiplication_application,
    convert_xor,
    function_exponentiation,
)

def normalize_symbol_string(s: str) -> str:
    if not s:
        return s
    replacements = [
        ("π", "pi"),
        ("−∞", "-oo"),
        ("∞", "oo"),
        ("×", "*"),
        ("÷", "/"),
        ("√", "sqrt"),
        ("²", "**2"),
        ("³", "**3"),
        ("ⁿ", "**n"),
        ("⁻¹", "**(-1)"),
        ("−", "-"),
    ]
    for old_sym, new_sym in replacements:
        s = s.replace(old_sym, new_sym)
    return s

def parse_math_expression(expr_str: str, var_symbols: Optional[List[str]] = None) -> Tuple[sp.Expr, List[sp.Symbol]]:
    if not expr_str or not expr_str.strip():
        raise ExpressionParseError("Please enter a valid mathematical expression.", example="2x + 5")

    s = normalize_symbol_string(expr_str.strip())

    # Define custom local symbols and functions
    local_dict = {
        'e': sp.E,
        'E': sp.E,
        'pi': sp.pi,
        'I': sp.I,
        'i': sp.I,
        'ln': sp.log,
        'log': sp.log,
        'sqrt': sp.sqrt,
        'exp': sp.exp,
        'sin': sp.sin,
        'cos': sp.cos,
        'tan': sp.tan,
        'sec': sp.sec,
        'csc': sp.csc,
        'cot': sp.cot,
        'asin': sp.asin,
        'acos': sp.acos,
        'atan': sp.atan,
        'abs': sp.Abs,
        'Abs': sp.Abs,
    }

    if var_symbols:
        for v in var_symbols:
            local_dict[v] = sp.Symbol(v)

    try:
        parsed_expr = parse_expr(s, transformations=TRANSFORMATIONS, local_dict=local_dict)
        symbols = list(parsed_expr.free_symbols)
        return parsed_expr, symbols
    except Exception as err:
        raise ExpressionParseError(
            f"Invalid mathematical expression syntax near '{expr_str}'.",
            example="2x + 5 or x^2 - 6x + 5"
        )

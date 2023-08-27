import { TokenType } from "./token.js";
/**
 * Traverses the AST employing the visitor pattern.
 * Returns the evaluated expression value.
 */
export class Evaluator {
  constructor(text) {
    this.text = text;
  }

  visitBinary(binary) {
    const left = binary.left.accept(this);
    const right = binary.right.accept(this);
    switch (binary.operator.type) {
      case TokenType.PLUS:
        return left + right;
      case TokenType.MINUS:
        return left - right;
      case TokenType.MULT:
        return left * right;
      case TokenType.DIV:
        if (right == 0) throw "Can not divide by 0!";
        return left / right;
    }
  }

  visitUnary(unary) {
    return -unary.operand.accept(this);
  }

  visitExpr(expr) {
    const val = expr.expr.accept(this);
    return val;
  }

  visitValue(value) {
    const start = value.value.start_idx;
    const end = value.value.width + start;
    return value.type == TokenType.INT
      ? parseInt(this.text.slice(start, end))
      : parseFloat(this.text.slice(start, end));
  }
}

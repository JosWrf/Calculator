/**
 * Contains all AST nodes and an interface, that allows a 
 * visitor to add functionality.
 */
class AST {}

class Expr extends AST {
  constructor(expr) {
    super();
    this.expr = expr;
  }

  accept(visitor) {
    return visitor.visitExpr(this);
  }
}

class Binary extends AST {
  constructor(left, right, operator) {
    super();
    this.left = left;
    this.right = right;
    this.operator = operator;
  }

  accept(visitor) {
    return visitor.visitBinary(this);
  }
}

class Unary extends AST {
  constructor(operand, operator) {
    super();
    this.operand = operand;
    this.operator = operator;
  }

  accept(visitor) {
    return visitor.visitUnary(this);
  }
}

class Value extends AST {
  constructor(value) {
    super();
    this.value = value;
  }

  accept(visitor) {
    return visitor.visitValue(this);
  }
}

export {Binary, Expr, Unary, Value};
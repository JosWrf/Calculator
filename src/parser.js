import {TokenType} from "./token.js";
import { Unary,Binary,Value,Expr } from "./ast.js";
/**
 * Parses the given token stream produced by the scanner.
 */
export class Parser {
  tokens = [];
  currPos = 0;
  text = "";

  isAtEnd() {
    return this.peek().type == TokenType.EOF;
  }

  isTokenTypeIn(...types) {
    if (this.isAtEnd()) return false;
    for (const typ of types) {
      if (typ == this.peek().type) return true;
    }
    return false;
  }

  peek() {
    return this.tokens[this.currPos];
  }

  consume() {
    return this.tokens[this.currPos++];
  }

  parse(tokens, text) {
    this.tokens = tokens;
    this.text = text;
    this.currPos = 0;
    return this.linear();
  }

  // factor (('-' | '+') factor)*
  linear() {
    let sum = this.factor();
    while (this.isTokenTypeIn(TokenType.MINUS, TokenType.PLUS)) {
      const operator = this.consume();
      const rightOperand = this.factor();
      sum = new Binary(sum, rightOperand, operator);
    }
    return sum;
  }
  // unary (('/' | '*') unary)*
  factor() {
    let mult = this.unary();
    while (this.isTokenTypeIn(TokenType.DIV, TokenType.MULT)) {
      const operator = this.consume();
      const rightOperand = this.unary();
      mult = new Binary(mult, rightOperand, operator);
    }
    return mult;
  }
  // '-' unary | parennum
  unary() {
    if (this.isTokenTypeIn(TokenType.MINUS)) {
      const operator = this.consume();
      const operand = this.unary();
      return new Unary(operand, operator);
    }
    return this.parennum();
  }
  // NUM | (NUM)
  parennum() {
    if (this.isTokenTypeIn(TokenType.FP, TokenType.INT))
      return new Value(this.consume());
    if (this.isTokenTypeIn(TokenType.OPPAR)) {
      this.consume();
      const term = this.linear();
      if (this.peek().type != TokenType.CPAR) {
        throw "Expect closing parenthesis.";
      }
      this.consume();
      return new Expr(term);
    }
    throw `Unexpected tokentype ${this.peek().type}.`;
  }
}
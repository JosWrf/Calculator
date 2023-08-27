/**
 * Defines all the different token types for the calculator
 */
const TokenType = {
  EOF: "EOF",
  FP: "Floating Point",
  INT: "Integer",
  PLUS: "+",
  MINUS: "-",
  DIV: "/",
  MULT: "*",
  OPPAR: "(",
  CPAR: ")",
};

/**
 * Encapsulates all information related to the different tokens, like type and
 * view into text buffer.
 */
class Token {
  constructor(type, start_idx, width = 1) {
    this.type = type;
    this.start_idx = start_idx;
    this.width = width;
  }
}

export {Token, TokenType};
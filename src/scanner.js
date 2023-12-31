import { Token, TokenType } from "./token.js";
/**
 * Scanns the given input text and produces a list of tokens, which can be consumed
 * by the parser.
 */
export class Scanner {
  currPos = 0;
  text = "";

  isAtEnd() {
    return this.currPos == this.text.length;
  }

  isNumeric(char) {
    return !isNaN(parseInt(char));
  }

  peak() {
    return this.text[this.currPos];
  }

  consume() {
    return this.text[this.currPos++];
  }

  handleOperands() {
    const start = this.currPos - 1;
    while (!this.isAtEnd() && this.isNumeric(this.peak())) {
      this.consume();
    }

    // Consumed the numeric input -> Either an operand or EOF is encountered for INT
    if (this.isAtEnd() || this.peak() != ".") {
      return new Token(TokenType.INT, start, this.currPos - start);
    }

    // Remove the "." and check for further integers
    this.consume();
    if (this.isAtEnd() || !this.isNumeric(this.peak())) {
      throw `Invalid Floating point number ${this.text.slice(
        start,
        this.currPos - start
      )}!`;
    }

    while (!this.isAtEnd() && this.isNumeric(this.peak())) {
      this.consume();
    }
    return new Token(TokenType.FP, start, this.currPos - start);
  }

  scan() {
    const currChar = this.consume();
    switch (currChar) {
      case "+":
        return new Token(TokenType.PLUS, this.currPos - 1);
      case "-":
        return new Token(TokenType.MINUS, this.currPos - 1);
      case "/":
        return new Token(TokenType.DIV, this.currPos - 1);
      case "*":
        return new Token(TokenType.MULT, this.currPos - 1);
      case "(":
        return new Token(TokenType.OPPAR, this.currPos - 1);
      case ")":
        return new Token(TokenType.CPAR, this.currPos - 1);
      default:
        break;
    }
    if (this.isNumeric(currChar)) {
      return this.handleOperands();
    } else {
      throw `Invalid Character encountered ${currChar} at position ${this.currPos} of the input.`;
    }
  }

  scanInput(text) {
    this.currPos = 0;
    this.text = text;
    const tokens = [];
    while (!this.isAtEnd()) {
      const token = this.scan();
      tokens.push(token);
    }
    tokens.push(new Token(TokenType.EOF, this.text.length));
    return tokens;
  }
}
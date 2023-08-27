import { Evaluator } from "./evaluator.js";
import {Scanner} from "./scanner.js";
import {Parser} from "./parser.js";

export class Interpreter {
  scanner = new Scanner();
  parser = new Parser();

  interpret(text) {
    if (text.length === 0)
        return;
    try {
      const tokens = this.scanner.scanInput(text);
      const ast = this.parser.parse(tokens, text);
      const evaluator = new Evaluator(text);
      const value = ast.accept(evaluator);
      return value;
    } catch (exception) {
        alert(exception);
        return "";
    }
  }
}
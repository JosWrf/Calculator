/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/ast.js":
/*!********************!*\
  !*** ./src/ast.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Binary: () => (/* binding */ Binary),\n/* harmony export */   Expr: () => (/* binding */ Expr),\n/* harmony export */   Unary: () => (/* binding */ Unary),\n/* harmony export */   Value: () => (/* binding */ Value)\n/* harmony export */ });\n/**\r\n * Contains all AST nodes and an interface, that allows a \r\n * visitor to add functionality.\r\n */\r\nclass AST {}\r\n\r\nclass Expr extends AST {\r\n  constructor(expr) {\r\n    super();\r\n    this.expr = expr;\r\n  }\r\n\r\n  accept(visitor) {\r\n    return visitor.visitExpr(this);\r\n  }\r\n}\r\n\r\nclass Binary extends AST {\r\n  constructor(left, right, operator) {\r\n    super();\r\n    this.left = left;\r\n    this.right = right;\r\n    this.operator = operator;\r\n  }\r\n\r\n  accept(visitor) {\r\n    return visitor.visitBinary(this);\r\n  }\r\n}\r\n\r\nclass Unary extends AST {\r\n  constructor(operand, operator) {\r\n    super();\r\n    this.operand = operand;\r\n    this.operator = operator;\r\n  }\r\n\r\n  accept(visitor) {\r\n    return visitor.visitUnary(this);\r\n  }\r\n}\r\n\r\nclass Value extends AST {\r\n  constructor(value) {\r\n    super();\r\n    this.value = value;\r\n  }\r\n\r\n  accept(visitor) {\r\n    return visitor.visitValue(this);\r\n  }\r\n}\r\n\r\n\n\n//# sourceURL=webpack://calculator/./src/ast.js?");

/***/ }),

/***/ "./src/calculator.js":
/*!***************************!*\
  !*** ./src/calculator.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _interpreter_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./interpreter.js */ \"./src/interpreter.js\");\n\r\n\r\nconst interpreter = new _interpreter_js__WEBPACK_IMPORTED_MODULE_0__.Interpreter();\r\nconst buttonContainer = document.querySelector(\".buttons\");\r\nconst display = document.querySelector(\"#display\");\r\n\r\nbuttonContainer.addEventListener(\"click\", function(event){\r\n    const trget = event.target;\r\n    const input = trget.getAttribute(\"class\");\r\n    switch(input){\r\n        case \"remove\":\r\n            display.value = display.value.slice(0, -1);\r\n            break;\r\n        case \"clear\":\r\n            display.value = \"\";\r\n            break;\r\n        case \"equals\":\r\n            const value = interpreter.interpret(display.value);\r\n            display.value = (value !== null) ? value:display.value;\r\n            break;\r\n        case \"operator\":\r\n        case \"number\":\r\n            display.value += trget.textContent\r\n            break;\r\n        default:\r\n            break;\r\n    }\r\n});\r\n\n\n//# sourceURL=webpack://calculator/./src/calculator.js?");

/***/ }),

/***/ "./src/evaluator.js":
/*!**************************!*\
  !*** ./src/evaluator.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Evaluator: () => (/* binding */ Evaluator)\n/* harmony export */ });\n/* harmony import */ var _token_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./token.js */ \"./src/token.js\");\n\r\n/**\r\n * Traverses the AST employing the visitor pattern.\r\n * Returns the evaluated expression value.\r\n */\r\nclass Evaluator {\r\n  constructor(text) {\r\n    this.text = text;\r\n  }\r\n\r\n  visitBinary(binary) {\r\n    const left = binary.left.accept(this);\r\n    const right = binary.right.accept(this);\r\n    switch (binary.operator.type) {\r\n      case _token_js__WEBPACK_IMPORTED_MODULE_0__.TokenType.PLUS:\r\n        return left + right;\r\n      case _token_js__WEBPACK_IMPORTED_MODULE_0__.TokenType.MINUS:\r\n        return left - right;\r\n      case _token_js__WEBPACK_IMPORTED_MODULE_0__.TokenType.MULT:\r\n        return left * right;\r\n      case _token_js__WEBPACK_IMPORTED_MODULE_0__.TokenType.DIV:\r\n        if (right == 0) throw \"Can not divide by 0!\";\r\n        return left / right;\r\n    }\r\n  }\r\n\r\n  visitUnary(unary) {\r\n    return -unary.operand.accept(this);\r\n  }\r\n\r\n  visitExpr(expr) {\r\n    const val = expr.expr.accept(this);\r\n    return val;\r\n  }\r\n\r\n  visitValue(value) {\r\n    const start = value.value.start_idx;\r\n    const end = value.value.width + start;\r\n    return value.type == _token_js__WEBPACK_IMPORTED_MODULE_0__.TokenType.INT\r\n      ? parseInt(this.text.slice(start, end))\r\n      : parseFloat(this.text.slice(start, end));\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack://calculator/./src/evaluator.js?");

/***/ }),

/***/ "./src/interpreter.js":
/*!****************************!*\
  !*** ./src/interpreter.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Interpreter: () => (/* binding */ Interpreter)\n/* harmony export */ });\n/* harmony import */ var _evaluator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./evaluator.js */ \"./src/evaluator.js\");\n/* harmony import */ var _scanner_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scanner.js */ \"./src/scanner.js\");\n/* harmony import */ var _parser_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./parser.js */ \"./src/parser.js\");\n\r\n\r\n\r\n\r\nclass Interpreter {\r\n  scanner = new _scanner_js__WEBPACK_IMPORTED_MODULE_1__.Scanner();\r\n  parser = new _parser_js__WEBPACK_IMPORTED_MODULE_2__.Parser();\r\n\r\n  interpret(text) {\r\n    if (text.length === 0)\r\n        return \"\";\r\n    try {\r\n      const tokens = this.scanner.scanInput(text);\r\n      const ast = this.parser.parse(tokens, text);\r\n      const evaluator = new _evaluator_js__WEBPACK_IMPORTED_MODULE_0__.Evaluator(text);\r\n      const value = ast.accept(evaluator);\r\n      return value;\r\n    } catch (exception) {\r\n        alert(exception);\r\n        return null;\r\n    }\r\n  }\r\n}\n\n//# sourceURL=webpack://calculator/./src/interpreter.js?");

/***/ }),

/***/ "./src/parser.js":
/*!***********************!*\
  !*** ./src/parser.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Parser: () => (/* binding */ Parser)\n/* harmony export */ });\n/* harmony import */ var _token_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./token.js */ \"./src/token.js\");\n/* harmony import */ var _ast_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ast.js */ \"./src/ast.js\");\n\r\n\r\n/**\r\n * Parses the given token stream produced by the scanner.\r\n */\r\nclass Parser {\r\n  tokens = [];\r\n  currPos = 0;\r\n  text = \"\";\r\n\r\n  isAtEnd() {\r\n    return this.peek().type == _token_js__WEBPACK_IMPORTED_MODULE_0__.TokenType.EOF;\r\n  }\r\n\r\n  isTokenTypeIn(...types) {\r\n    if (this.isAtEnd()) return false;\r\n    for (const typ of types) {\r\n      if (typ == this.peek().type) return true;\r\n    }\r\n    return false;\r\n  }\r\n\r\n  peek() {\r\n    return this.tokens[this.currPos];\r\n  }\r\n\r\n  consume() {\r\n    return this.tokens[this.currPos++];\r\n  }\r\n\r\n  parse(tokens, text) {\r\n    this.tokens = tokens;\r\n    this.text = text;\r\n    this.currPos = 0;\r\n    return this.linear();\r\n  }\r\n\r\n  // factor (('-' | '+') factor)*\r\n  linear() {\r\n    let sum = this.factor();\r\n    while (this.isTokenTypeIn(_token_js__WEBPACK_IMPORTED_MODULE_0__.TokenType.MINUS, _token_js__WEBPACK_IMPORTED_MODULE_0__.TokenType.PLUS)) {\r\n      const operator = this.consume();\r\n      const rightOperand = this.factor();\r\n      sum = new _ast_js__WEBPACK_IMPORTED_MODULE_1__.Binary(sum, rightOperand, operator);\r\n    }\r\n    return sum;\r\n  }\r\n  // unary (('/' | '*') unary)*\r\n  factor() {\r\n    let mult = this.unary();\r\n    while (this.isTokenTypeIn(_token_js__WEBPACK_IMPORTED_MODULE_0__.TokenType.DIV, _token_js__WEBPACK_IMPORTED_MODULE_0__.TokenType.MULT)) {\r\n      const operator = this.consume();\r\n      const rightOperand = this.unary();\r\n      mult = new _ast_js__WEBPACK_IMPORTED_MODULE_1__.Binary(mult, rightOperand, operator);\r\n    }\r\n    return mult;\r\n  }\r\n  // '-' unary | parennum\r\n  unary() {\r\n    if (this.isTokenTypeIn(_token_js__WEBPACK_IMPORTED_MODULE_0__.TokenType.MINUS)) {\r\n      const operator = this.consume();\r\n      const operand = this.unary();\r\n      return new _ast_js__WEBPACK_IMPORTED_MODULE_1__.Unary(operand, operator);\r\n    }\r\n    return this.parennum();\r\n  }\r\n  // NUM | (NUM)\r\n  parennum() {\r\n    if (this.isTokenTypeIn(_token_js__WEBPACK_IMPORTED_MODULE_0__.TokenType.FP, _token_js__WEBPACK_IMPORTED_MODULE_0__.TokenType.INT))\r\n      return new _ast_js__WEBPACK_IMPORTED_MODULE_1__.Value(this.consume());\r\n    if (this.isTokenTypeIn(_token_js__WEBPACK_IMPORTED_MODULE_0__.TokenType.OPPAR)) {\r\n      this.consume();\r\n      const term = this.linear();\r\n      if (this.peek().type != _token_js__WEBPACK_IMPORTED_MODULE_0__.TokenType.CPAR) {\r\n        throw \"Expect closing parenthesis.\";\r\n      }\r\n      this.consume();\r\n      return new _ast_js__WEBPACK_IMPORTED_MODULE_1__.Expr(term);\r\n    }\r\n    throw `Unexpected tokentype ${this.peek().type}.`;\r\n  }\r\n}\n\n//# sourceURL=webpack://calculator/./src/parser.js?");

/***/ }),

/***/ "./src/scanner.js":
/*!************************!*\
  !*** ./src/scanner.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Scanner: () => (/* binding */ Scanner)\n/* harmony export */ });\n/* harmony import */ var _token_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./token.js */ \"./src/token.js\");\n\r\n/**\r\n * Scanns the given input text and produces a list of tokens, which can be consumed\r\n * by the parser.\r\n */\r\nclass Scanner {\r\n  currPos = 0;\r\n  text = \"\";\r\n\r\n  isAtEnd() {\r\n    return this.currPos == this.text.length;\r\n  }\r\n\r\n  isNumeric(char) {\r\n    return !isNaN(parseInt(char));\r\n  }\r\n\r\n  peak() {\r\n    return this.text[this.currPos];\r\n  }\r\n\r\n  consume() {\r\n    return this.text[this.currPos++];\r\n  }\r\n\r\n  handleOperands() {\r\n    const start = this.currPos - 1;\r\n    while (!this.isAtEnd() && this.isNumeric(this.peak())) {\r\n      this.consume();\r\n    }\r\n\r\n    // Consumed the numeric input -> Either an operand or EOF is encountered for INT\r\n    if (this.isAtEnd() || this.peak() != \".\") {\r\n      return new _token_js__WEBPACK_IMPORTED_MODULE_0__.Token(_token_js__WEBPACK_IMPORTED_MODULE_0__.TokenType.INT, start, this.currPos - start);\r\n    }\r\n\r\n    // Remove the \".\" and check for further integers\r\n    this.consume();\r\n    if (this.isAtEnd() || !this.isNumeric(this.peak())) {\r\n      throw `Invalid Floating point number ${this.text.slice(\r\n        start,\r\n        this.currPos - start\r\n      )}!`;\r\n    }\r\n\r\n    while (!this.isAtEnd() && this.isNumeric(this.peak())) {\r\n      this.consume();\r\n    }\r\n    return new _token_js__WEBPACK_IMPORTED_MODULE_0__.Token(_token_js__WEBPACK_IMPORTED_MODULE_0__.TokenType.FP, start, this.currPos - start);\r\n  }\r\n\r\n  scan() {\r\n    const currChar = this.consume();\r\n    switch (currChar) {\r\n      case \"+\":\r\n        return new _token_js__WEBPACK_IMPORTED_MODULE_0__.Token(_token_js__WEBPACK_IMPORTED_MODULE_0__.TokenType.PLUS, this.currPos - 1);\r\n      case \"-\":\r\n        return new _token_js__WEBPACK_IMPORTED_MODULE_0__.Token(_token_js__WEBPACK_IMPORTED_MODULE_0__.TokenType.MINUS, this.currPos - 1);\r\n      case \"/\":\r\n        return new _token_js__WEBPACK_IMPORTED_MODULE_0__.Token(_token_js__WEBPACK_IMPORTED_MODULE_0__.TokenType.DIV, this.currPos - 1);\r\n      case \"*\":\r\n        return new _token_js__WEBPACK_IMPORTED_MODULE_0__.Token(_token_js__WEBPACK_IMPORTED_MODULE_0__.TokenType.MULT, this.currPos - 1);\r\n      case \"(\":\r\n        return new _token_js__WEBPACK_IMPORTED_MODULE_0__.Token(_token_js__WEBPACK_IMPORTED_MODULE_0__.TokenType.OPPAR, this.currPos - 1);\r\n      case \")\":\r\n        return new _token_js__WEBPACK_IMPORTED_MODULE_0__.Token(_token_js__WEBPACK_IMPORTED_MODULE_0__.TokenType.CPAR, this.currPos - 1);\r\n      default:\r\n        break;\r\n    }\r\n    if (this.isNumeric(currChar)) {\r\n      return this.handleOperands();\r\n    } else {\r\n      throw `Invalid Character encountered ${currChar} at position ${this.currPos} of the input.`;\r\n    }\r\n  }\r\n\r\n  scanInput(text) {\r\n    this.currPos = 0;\r\n    this.text = text;\r\n    const tokens = [];\r\n    while (!this.isAtEnd()) {\r\n      const token = this.scan();\r\n      tokens.push(token);\r\n    }\r\n    tokens.push(new _token_js__WEBPACK_IMPORTED_MODULE_0__.Token(_token_js__WEBPACK_IMPORTED_MODULE_0__.TokenType.EOF, this.text.length));\r\n    return tokens;\r\n  }\r\n}\n\n//# sourceURL=webpack://calculator/./src/scanner.js?");

/***/ }),

/***/ "./src/token.js":
/*!**********************!*\
  !*** ./src/token.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Token: () => (/* binding */ Token),\n/* harmony export */   TokenType: () => (/* binding */ TokenType)\n/* harmony export */ });\n/**\r\n * Defines all the different token types for the calculator\r\n */\r\nconst TokenType = {\r\n  EOF: \"EOF\",\r\n  FP: \"Floating Point\",\r\n  INT: \"Integer\",\r\n  PLUS: \"+\",\r\n  MINUS: \"-\",\r\n  DIV: \"/\",\r\n  MULT: \"*\",\r\n  OPPAR: \"(\",\r\n  CPAR: \")\",\r\n};\r\n\r\n/**\r\n * Encapsulates all information related to the different tokens, like type and\r\n * view into text buffer.\r\n */\r\nclass Token {\r\n  constructor(type, start_idx, width = 1) {\r\n    this.type = type;\r\n    this.start_idx = start_idx;\r\n    this.width = width;\r\n  }\r\n}\r\n\r\n\n\n//# sourceURL=webpack://calculator/./src/token.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/calculator.js");
/******/ 	
/******/ })()
;
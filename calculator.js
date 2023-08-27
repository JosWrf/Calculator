/** 
 * Defines all the different token types for the calculator
*/
const TokenType = {
    EOF: 'EOF',
    FP: 'Floating Point',
    INT: 'Integer',
    PLUS: '+',
    MINUS: '-',
    DIV: '/',
    MULT: '*',
    OPPAR: '(',
    CPAR: ')',
}

/**
 * Encapsulates all information related to the different tokens, like type and
 * view into text buffer.
 */
class Token{
    constructor(type, start_idx, width=1){
        this.type = type;
        this.start_idx = start_idx;
        this.width = width;
    }
}

/**
 * Scanns the given input text and produces a list of tokens, which can be consumed
 * by the parser.
 */
class Scanner{
    currPos = 0;
    text= "";

    isAtEnd(){
        return this.currPos == this.text.length;
    }

    isNumeric(char){
        return !isNaN(parseInt(char))
    }

    peak(){
        return this.text[this.currPos];
    }

    consume(){
        return this.text[this.currPos++];
    }

    handleOperands(){
        const start = this.currPos - 1;
        while (!this.isAtEnd() && this.isNumeric(this.peak())) {
            this.consume();
        }

        // Consumed the numeric input -> Either an operand or EOF is encountered for INT 
        if (this.isAtEnd() || this.peak() != "."){
            return new Token(TokenType.INT, start, this.currPos-start);
        }

        // Remove the "." and check for further integers
        this.consume();
        if (this.isAtEnd() || !this.isNumeric(this.peak())){
            throw `Invalid Floating point number ${this.text.slice(start,this.currPos-start)}!`;
        }

        while (!this.isAtEnd() && this.isNumeric(this.peak())) {
            this.consume();
        }
        return new Token(TokenType.FP, start, this.currPos-start);

    }

    scan(){
        const currChar = this.consume();
        switch (currChar){
            case "+":
                return new Token(TokenType.PLUS,this.currPos-1);
            case "-":
                return new Token(TokenType.MINUS,this.currPos-1);
            case "/":
                return new Token(TokenType.DIV,this.currPos-1);
            case "*":
                return new Token(TokenType.MULT,this.currPos-1);
            case "(":
                return new Token(TokenType.OPPAR, this.currPos-1);
            case ")":
                return new Token(TokenType.CPAR, this.currPos-1);
            default:
                break;
        }
        if (this.isNumeric(currChar)){
            return this.handleOperands();
        }
        else {
            throw `Invalid Character encountered ${currChar} at position ${this.currPos}.`
        }
    }

    scanInput(text){
        this.currPos = 0;
        this.text = text;
        const tokens = [];
        while (!this.isAtEnd()){
            const token = this.scan();
            tokens.push(token);
        }
        tokens.push(new Token(TokenType.EOF, this.text.length));
        return tokens;
    }
}

class AST{
}

class Expr extends AST{
    constructor(expr){
        super()
        this.expr = expr;
    }

    accept(visitor){
        return visitor.visitExpr(this);
    }
}

class Binary extends AST{
    constructor(left, right, operator){
        super()
        this.left = left;
        this.right = right;
        this.operator = operator;
    }

    accept(visitor){
        return visitor.visitBinary(this);
    }
}

class Unary extends AST{
    constructor(operand, operator){
        super()
        this.operand = operand;
        this.operator = operator;
    }

    accept(visitor){
        return visitor.visitUnary(this);
    }
}


class Value extends AST{
    constructor(value){
        super()
        this.value = value;
    }

    accept(visitor){
        return visitor.visitValue(this);
    }
}

class Evaluator{
    constructor(text){
        this.text = text;
    }

    visitBinary(binary){
        const left = binary.left.accept(this);
        const right = binary.right.accept(this);
        switch (binary.operator.type){
            case TokenType.PLUS:
                return left + right;
            case TokenType.MINUS:
                return left - right;
            case TokenType.MULT:
                return left * right;
            case TokenType.DIV:
                if (right == 0)
                    throw "Can not divide by 0!";
                return left / right;
        }
    }

    visitUnary(unary){
        return - unary.operand.accept(this);
    }

    visitExpr(expr){
        const val = expr.expr.accept(this);
        return val;
    }

    visitValue(value){
        const start = value.value.start_idx;
        const end = value.value.width + start;
        return parseInt(this.text.slice(start,end));
    }
}

class Parser{
    tokens = [];
    currPos = 0;

    isAtEnd(){
        return this.peek().type == TokenType.EOF;
    }

    isTokenTypeIn(...types){
        if (this.isAtEnd())
            return false;
        for (const typ of types){
            if (typ == this.peek().type)
                return true;
        }
        return false;
    }

    peek(){
        return this.tokens[this.currPos];
    }

    consume(){
        return this.tokens[this.currPos++];
    }

    parse(tokens){
        this.tokens = tokens;
        this.currPos = 0;
        return this.linear();
    }

    // factor (('-' | '+') factor)*
    linear(){
        let sum = this.factor();
        while(this.isTokenTypeIn(TokenType.MINUS, TokenType.PLUS)){
            const operator = this.consume();
            const rightOperand = this.factor();
            sum = new Binary(sum, rightOperand, operator);
        }
        return sum;
    }
    // unary (('/' | '*') unary)*
    factor(){
        let mult = this.unary();
        while(this.isTokenTypeIn(TokenType.DIV, TokenType.MULT)){
            const operator = this.consume();
            const rightOperand = this.unary();
            mult = new Binary(mult, rightOperand, operator);
        }
        return mult;
    }
    // '-' unary | parennum
    unary(){
        if (this.isTokenTypeIn(TokenType.MINUS)){
            const operator = this.consume();
            const operand = this.unary();
            return new Unary(operand, operator);
        }
        return this.parennum();
    }
    // NUM | (NUM)
    parennum(){
        if (this.isTokenTypeIn(TokenType.FP, TokenType.INT)) 
            return new Value(this.consume());
        if (this.isTokenTypeIn(TokenType.OPPAR)){
            this.consume();
            const term = this.linear();
            if (this.peek().type != TokenType.CPAR){
                throw "Expect closing parenthesis.";
            }
            this.consume();
            return new Expr(term);
        }
    }
}

class Interpreter{
    scanner = new Scanner();
    parser = new Parser();

    interpret(text){
        const tokens = this.scanner.scanInput(text);
        const ast = this.parser.parse(tokens);
        const evaluator = new Evaluator(text);
        const value = ast.accept(evaluator);
        return value;
    }
}
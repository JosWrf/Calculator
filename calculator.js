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
    constructor(text){
        this.currPos = 0;
        this.text = text;
        this.tokens = [];
    }

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
                return new Token(TokenType.PLUS,this.currPos);
            case "-":
                return new Token(TokenType.MINUS,this.currPos);
            case "/":
                return new Token(TokenType.DIV,this.currPos);
            case "*":
                return new Token(TokenType.MULT,this.currPos);
            case "(":
                return new Token(TokenType.OPPAR, this.currPos);
            case ")":
                return new Token(TokenType.CPAR, this.currPos);
            default:
                break;
        }
        if (this.isNumeric(currChar)){
            return this.handleOperands();
        }
        else {
            throw `Invalid Character encountered ${currChar} at position ${self.currPos}.`
        }
    }

    scanInput(){
        while (!this.isAtEnd()){
            const token = this.scan();
            this.tokens.push(token);
        }
        this.tokens.push(new Token(TokenType.EOF, this.text.length));
        return this.tokens;
    }
}

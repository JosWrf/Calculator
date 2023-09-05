import { Interpreter } from "./interpreter.js";

const interpreter = new Interpreter();
const buttonContainer = document.querySelector(".buttons");
const display = document.querySelector("#display");

buttonContainer.addEventListener("click", function(event){
    const trget = event.target;
    const input = trget.getAttribute("class");
    switch(input){
        case "remove":
            display.value = display.value.slice(0, -1);
            break;
        case "clear":
            display.value = "";
            break;
        case "equals":
            const value = interpreter.interpret(display.value);
            display.value = (value !== null) ? value:display.value;
            break;
        case "operator":
        case "number":
            display.value += trget.textContent
            break;
        default:
            break;
    }
});

import Dispatcher from "../dispatcher/dispatcher.js";
import OutputDispatcher from "./output_dispatcher.js";

class UIDispatcher {
    constructor() {
        this.initNumbers();
        this.initBinaryOperations();
        this.initUnaryOperations();
        this.initClearOperations();
        this.initResultOperation();

        this.outputDispatcher = new OutputDispatcher();
        this.dispatcher = new Dispatcher();
    }

    initNumbers = function() {
        const zero_button = document.getElementById("zero_button");
        zero_button.addEventListener("click", () => {
            this.outputDispatcher.update("0");
        });
        
        const one_button = document.getElementById("one_button");
        one_button.addEventListener("click", () => {
            this.outputDispatcher.update("1");
        });
        
        const two_button = document.getElementById("two_button");
        two_button.addEventListener("click", () => {
            this.outputDispatcher.update("2");
        });
        
        const three_button = document.getElementById("three_button");
        three_button.addEventListener("click", () => {
            this.outputDispatcher.update("3");
        });
        
        const four_button = document.getElementById("four_button");
        four_button.addEventListener("click", () => {
            this.outputDispatcher.update("4");
        });
        
        const five_button = document.getElementById("five_button");
        five_button.addEventListener("click", () => {
            this.outputDispatcher.update("5");
        });
        
        const six_button = document.getElementById("six_button");
        six_button.addEventListener("click", () => {
            this.outputDispatcher.update("6");
        });
        
        const seven_button = document.getElementById("seven_button");
        seven_button.addEventListener("click", () => {
            this.outputDispatcher.update("7");
        });
        
        const eight_button = document.getElementById("eight_button");
        eight_button.addEventListener("click", () => {
            this.outputDispatcher.update("8");
        });
        
        const nine_button = document.getElementById("nine_button");
        nine_button.addEventListener("click", () => {
            this.outputDispatcher.update("9");
        });

        const comma_button = document.getElementById("comma_button");
        comma_button.addEventListener("click", () => {
            this.outputDispatcher.update(".");
        });
    };

    initBinaryOperations = function() {
        const add_button = document.getElementById("add_button");
        this.onUpdateOperation(add_button, "+");

        const substract_button = document.getElementById("substract_button");
        this.onUpdateOperation(substract_button, "-");

        const multiply_button = document.getElementById("multiply_button");
        this.onUpdateOperation(multiply_button, "*");

        const divide_button = document.getElementById("divide_button");
        this.onUpdateOperation(divide_button, "/");
    };

    initUnaryOperations = function() {

    };

    initClearOperations = function() {
        const clear_button = document.getElementById("clear_button");
        clear_button.addEventListener("click", () => {
            this.outputDispatcher.clear();
        });
    };

    initResultOperation = function() {
        const result_button = document.getElementById("result_button");
        result_button.addEventListener("click", () => {
            let left = parseFloat(this.outputDispatcher.getLeft());
            let operation = this.outputDispatcher.getOperation();
            let right = parseFloat(this.outputDispatcher.getRight());

            let result = this.dispatcher.getResult(left, operation, right);
            this.outputDispatcher.updateResult(result);
        });
    };

    onUpdateOperation = function(button, operation) {
        const result_button = document.getElementById("result_button");
        button.addEventListener("click", () => {
            if (this.outputDispatcher.isNeedToCalculate()) {
                result_button.click();
            }
            
            this.outputDispatcher.updateOperation(operation);
        });
    };
}

new UIDispatcher();

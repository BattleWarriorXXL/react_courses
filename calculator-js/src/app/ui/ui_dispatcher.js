import Dispatcher from "../dispatcher/dispatcher.js";
import OutputDispatcher from "./output_dispatcher.js";

class UIDispatcher {
    constructor() {
        this.initNumbers();
        this.initBinaryOperations();
        this.initUnaryOperations();
        this.initConstantOperations();
        this.initClearOperations();
        this.initResultOperation();
        this.initUndoOperation();

        this.outputDispatcher = new OutputDispatcher();
        this.dispatcher = new Dispatcher();
    }

    initNumbers = function () {
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

    initBinaryOperations = function () {
        const add_button = document.getElementById("add_button");
        this.onUpdateOperation(add_button, "+");

        const substract_button = document.getElementById("substract_button");
        this.onUpdateOperation(substract_button, "-");

        const multiply_button = document.getElementById("multiply_button");
        this.onUpdateOperation(multiply_button, "*");

        const divide_button = document.getElementById("divide_button");
        this.onUpdateOperation(divide_button, "/");

        const x_in_y_button = document.getElementById("x_in_y_button");
        this.onUpdateOperation(x_in_y_button, "^");

        const y_root_x_button = document.getElementById("y_root_x_button");
        this.onUpdateOperation(y_root_x_button, "root");
    };

    initUnaryOperations = function () {
        const percentage_button = document.getElementById("percentage_button");
        this.onUpdateOperation(percentage_button, "%");

        const negative_button = document.getElementById("negative_button");
        this.onUpdateOperation(negative_button, "negative");

        const square_button = document.getElementById("square_button");
        this.onUpdateOperation(square_button, "square");

        const cube_button = document.getElementById("cube_button");
        this.onUpdateOperation(cube_button, "cube");

        const e_in_x_button = document.getElementById("e_in_x_button");
        this.onUpdateOperation(e_in_x_button, "e_in_x");

        const x_in_e_button = document.getElementById("x_in_e_button");
        this.onUpdateOperation(x_in_e_button, "x_in_e");

        const ten_in_x_button = document.getElementById("ten_in_x_button");
        this.onUpdateOperation(ten_in_x_button, "ten_in_x");

        const inverse_button = document.getElementById("inverse_button");
        this.onUpdateOperation(inverse_button, "inverse");

        const square_root_button =
            document.getElementById("square_root_button");
        this.onUpdateOperation(square_root_button, "square_root");

        const cube_root_button = document.getElementById("cube_root_button");
        this.onUpdateOperation(cube_root_button, "cube_root");

        const ln_button = document.getElementById("ln_button");
        this.onUpdateOperation(ln_button, "ln");

        const log_button = document.getElementById("log_button");
        this.onUpdateOperation(log_button, "log");

        const factorial_button = document.getElementById("factorial_button");
        this.onUpdateOperation(factorial_button, "factorial");

        const sin_button = document.getElementById("sin_button");
        this.onUpdateOperation(sin_button, "sin");

        const cos_button = document.getElementById("cos_button");
        this.onUpdateOperation(cos_button, "cos");

        const tan_button = document.getElementById("tan_button");
        this.onUpdateOperation(tan_button, "tan");

        const ee_button = document.getElementById("ee_button");
        this.onUpdateOperation(ee_button, "ee");

        const rad_button = document.getElementById("rad_button");
        this.onUpdateOperation(rad_button, "rad");

        const sinh_button = document.getElementById("sinh_button");
        this.onUpdateOperation(sinh_button, "sinh");

        const cosh_button = document.getElementById("cosh_button");
        this.onUpdateOperation(cosh_button, "cosh");

        const tanh_button = document.getElementById("tanh_button");
        this.onUpdateOperation(tanh_button, "tanh");
    };

    initConstantOperations = function () {
        const e_button = document.getElementById("e_button");
        this.onUpdateOperation(e_button, "e");

        const pi_button = document.getElementById("pi_button");
        this.onUpdateOperation(pi_button, "pi");

        const random_button = document.getElementById("random_button");
        this.onUpdateOperation(random_button, "random");
    };

    initClearOperations = function () {
        const clear_button = document.getElementById("clear_button");
        clear_button.addEventListener("click", () => {
            this.outputDispatcher.clear();
        });
    };

    initResultOperation = function () {
        const result_button = document.getElementById("result_button");
        result_button.addEventListener("click", () => {
            let left = parseFloat(this.outputDispatcher.getLeft());
            let operation = this.outputDispatcher.getOperation();
            let right = parseFloat(this.outputDispatcher.getRight());

            let result = this.dispatcher.getResult(left, operation, right);
            this.outputDispatcher.updateResult(result);
        });
    };

    initUndoOperation = function () {
        const undo_button = document.getElementById("undo_button");
        undo_button.addEventListener("click", () => {
            let result = this.dispatcher.getResult(null, "undo");
            this.outputDispatcher.updateResult(result);
        });
    };

    onUpdateOperation = function (button, operation) {
        const result_button = document.getElementById("result_button");
        button.addEventListener("click", () => {
            if (this.outputDispatcher.isNeedToCalculate()) {
                result_button.click();
            }

            if (this.outputDispatcher.isUnaryOperation(operation)) {
                let left = parseFloat(this.outputDispatcher.getLeft());
                let result = this.dispatcher.getResult(left, operation);
                this.outputDispatcher.updateResult(result);

                return;
            }

            if (this.outputDispatcher.isConstantOperation(operation)) {
                let result = this.dispatcher.getResult(null, operation);
                this.outputDispatcher.updateConstantResult(result);

                return;
            }

            this.outputDispatcher.updateOperation(operation);
        });
    };
}

new UIDispatcher();

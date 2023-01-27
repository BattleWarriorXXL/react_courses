import Dispatcher from "../dispatcher/dispatcher.js";
import OutputDispatcher from "./output-dispatcher.js";

class UIDispatcher {
    constructor() {
        this.initNumbers();
        this.initOperations();
        this.initClearOperations();
        this.initResultOperation();
        this.initUndoOperation();
        this.initMemoryOperations();

        this.outputDispatcher = new OutputDispatcher();
        this.dispatcher = new Dispatcher();
    }

    initNumbers = function () {
        numberButtons.forEach(item => {
            document.getElementById(item.id).addEventListener("click", () => {
                this.outputDispatcher.update(item.operation);
            });
        });
    };

    initOperations = function () {
        binaryOperationButtons.forEach(item => {
            let button = document.getElementById(item.id);
            this.onUpdateOperation(button, item.operation);
            
        });
    };

    initClearOperations = function () {
        const clearButton = document.getElementById("clear_button");
        clearButton.addEventListener("click", () => {
            this.outputDispatcher.clear();
        });
    };

    initResultOperation = function () {
        const resultButton = document.getElementById("result_button");
        resultButton.addEventListener("click", () => {
            let left = parseFloat(this.outputDispatcher.getLeft());
            let operation = this.outputDispatcher.getOperation();
            let right = parseFloat(this.outputDispatcher.getRight());

            let result = this.dispatcher.getResult(left, operation, right);
            this.outputDispatcher.updateResult(result);
        });
    };

    initUndoOperation = function () {
        const undoButton = document.getElementById("undo_button");
        undoButton.addEventListener("click", () => {
            let result = this.dispatcher.getResult(null, "undo");
            this.outputDispatcher.updateResult(result);
        });
    };

    initMemoryOperations = function () {
        memoryButtons.forEach(item => {
            document.getElementById(item.id).addEventListener("click", () => {
                let result = this.dispatcher.getResult(this.outputDispatcher.left, item.operation);

                if (item.operation == "recall_memory") {
                    this.outputDispatcher.updateConstantResult(result);
                }
            });
        });
    };

    onUpdateOperation = function (button, operation) {
        const resultButton = document.getElementById("result_button");
        button.addEventListener("click", () => {
            if (this.outputDispatcher.isNeedToCalculate()) {
                resultButton.click();
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

const numberButtons = [
    {
        id: "zero_button",
        operation: "0"
    },
    {
        id: "one_button",
        operation: "1"
    },
    {
        id: "two_button",
        operation: "2"
    },
    {
        id: "three_button",
        operation: "3"
    },
    {
        id: "four_button",
        operation: "4"
    },
    {
        id: "five_button",
        operation: "5"
    },
    {
        id: "six_button",
        operation: "6"
    },
    {
        id: "seven_button",
        operation: "7"
    },
    {
        id: "nine_button",
        operation: "8"
    },
    {
        id: "eight_button",
        operation: "9"
    },
    {
        id: "comma_button",
        operation: "."
    }
];

const binaryOperationButtons = [
    {
        id: "add_button",
        operation: "+"
    },
    {
        id: "substract_button",
        operation: "-"
    },
    {
        id: "multiply_button",
        operation: "*"
    },
    {
        id: "divide_button",
        operation: "/"
    },
    {
        id: "x_in_y_button",
        operation: "^"
    },
    {
        id: "y_root_x_button",
        operation: "sqrt"
    },
    {
        id: "percentage_button",
        operation: "%"
    },
    {
        id: "negative_button",
        operation: "negative"
    },
    {
        id: "square_button",
        operation: "square"
    },
    {
        id: "cube_button",
        operation: "cube"
    },
    {
        id: "e_in_x_button",
        operation: "e_in_x"
    },
    {
        id: "x_in_e_button",
        operation: "x_in_e"
    },
    {
        id: "ten_in_x_button",
        operation: "ten_in_x"
    },
    {
        id: "inverse_button",
        operation: "inverse"
    },
    {
        id: "square_root_button",
        operation: "square_root"
    },
    {
        id: "cube_root_button",
        operation: "cube_root"
    },
    {
        id: "ln_button",
        operation: "ln"
    },
    {
        id: "log_button",
        operation: "log"
    },
    {
        id: "factorial_button",
        operation: "factorial"
    },
    {
        id: "sin_button",
        operation: "sin"
    },
    {
        id: "cos_button",
        operation: "cos"
    },
    {
        id: "tan_button",
        operation: "tan"
    },
    {
        id: "ee_button",
        operation: "ee"
    },
    {
        id: "rad_button",
        operation: "rad"
    },
    {
        id: "sinh_button",
        operation: "sinh"
    },
    {
        id: "cosh_button",
        operation: "cosh"
    },
    {
        id: "tanh_button",
        operation: "tanh"
    },
    {
        id: "e_button",
        operation: "e"
    },
    {
        id: "pi_button",
        operation: "pi"
    },
    {
        id: "random_button",
        operation: "random"
    }
];

const memoryButtons = [
    {
        id: "memory_clear_button",
        operation: "clear_memory"
    },
    {
        id: "memory_add_button",
        operation: "add_memory"
    },
    {
        id: "memory_substract_button",
        operation: "substract_memory"
    },
    {
        id: "memory_recall_button",
        operation: "recall_memory"
    }
];

export default UIDispatcher;

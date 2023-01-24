class OutputDispatcher {
    constructor() {
        this.left = "";
        this.right = "";
        this.operation = "";

        this.output = document.getElementById("output");

        this.updateLeft = function (value) {
            if (this.left === "0" && value === "0"){
                return;
            }

            if (this.left.includes(".") && value === ".") {
                return;
            }

            this.left += value;
        };

        this.updateRight = function (value) {
            if (this.right === "0" && value === "0"){
                return;
            }

            if (this.right.includes(".") && value === ".") {
                return;
            }

            this.right += value;
        };

        this.update = function (value) {
            if (!this.isOperationEntered()) {
                this.updateLeft(value);
                this.output.value = this.left;
            } else {
                this.updateRight(value);
                this.output.value = this.left + this.operation + this.right;
            }
        };

        this.updateOperation = function (operation) {
            if (!this.left) {
                return;
            }

            if (this.isOperationEntered()) {
                if (!this.right) {
                    this.output.value = this.output.value.replace(this.operation, operation);
                    this.operation = operation;
                } else {
                    return;
                }
            }

            this.operation = operation;
            this.output.value = this.left + this.operation;
        };

        this.updateUnaryOperation = function (operation) {
            if (!this.left) {
                return;
            }

            this.operation = operation;
        };

        this.updateResult = function (result) {
            if (!this.left) {
                return;
            }

            this.left = result.toString();
            this.operation = "";
            this.right = "";
            this.output.value = result;
        };

        this.updateConstantResult = function (result) {
            if (!this.left && !this.operation) {
                this.left = result.toString();
                this.output.value = result;

                return;
            }

            this.right = result;
            this.output.value = this.left + this.operation + this.right;
        };

        this.clear = function () {
            this.left = "";
            this.right = "";
            this.output.value = "";
        };

        this.getLeft = function () {
            return this.left;
        };

        this.getOperation = function () {
            return this.operation;
        };

        this.getRight = function () {
            return this.right;
        };

        this.isOperationEntered = function () {
            return (
                this.output.value.includes("+") ||
                this.output.value.includes("-") ||
                this.output.value.includes("*") ||
                this.output.value.includes("/") ||
                this.output.value.includes("^") ||
                this.output.value.includes("root")
            );
        };

        this.isNeedToCalculate = function () {
            return this.left && this.operation && this.right;
        };

        this.isUnaryOperation = function (operation) {
            return (
                operation.includes("%") ||
                operation.includes("negative") ||
                operation.includes("square") ||
                operation.includes("cube") ||
                operation.includes("e_in_x") ||
                operation.includes("x_in_e") ||
                operation.includes("ten_in_x") ||
                operation.includes("inverse") ||
                operation.includes("square_root") ||
                operation.includes("cube_root") ||
                operation.includes("ln") ||
                operation.includes("log") ||
                operation.includes("factorial") ||
                operation.includes("sin") ||
                operation.includes("cos") ||
                operation.includes("tan") ||
                operation.includes("ee") ||
                operation.includes("rad") ||
                operation.includes("sinh") ||
                operation.includes("cosh") ||
                operation.includes("tanh")
            );
        };

        this.isConstantOperation = function (operation) {
            return (
                operation.includes("e") ||
                operation.includes("pi") ||
                operation.includes("random")
            );
        };
    }
}

export default OutputDispatcher;

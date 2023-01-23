class OutputDispatcher {
    constructor() {
        this.left = "";
        this.right = "";
        this.operation = "";

        this.output = document.getElementById("output");

        this.updateLeft = function(value) {
            if (this.left === "" && value == "0") {
                return;
            }

            if (this.left === "" && value == ".") {
                this.left = "0";
            }

            if (this.left === "0") {
                this.left = value;
            }

            this.left += value;
        };

        this.updateRight = function(value) {
            if (this.right === "" && value == "0") {
                return;
            }

            if (this.right === "" && value == ".") {
                this.right = "0";
            }

            this.right += value;
        };

        this.update = function(value) {
            if (!this.isOperationEntered()){
                this.updateLeft(value);
                this.output.value = this.left;
            } else {
                this.updateRight(value);
                this.output.value = this.left + this.operation + this.right;
            }
        };

        this.updateOperation = function(operation) {
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

        this.updateResult = function(result) {
            if (!this.left) {
                return;
            }

            this.left = result.toString();
            this.operation = "";
            this.right = "";
            this.output.value = result;
        };

        this.clear = function() {
            this.left = "";
            this.right = "";
            this.output.value = "";
        };

        this.getLeft = function() {
            return this.left;
        };

        this.getOperation = function() {
            return this.operation;
        };

        this.getRight = function() {
            return this.right;
        };

        this.isOperationEntered = function() {
            return this.output.value.includes("+") ||
                   this.output.value.includes("-") ||
                   this.output.value.includes("*") ||
                   this.output.value.includes("/");
        };

        this.isNeedToCalculate = function() {
            return this.left && this.operation && this.right;
        };
    }
}

export default OutputDispatcher;

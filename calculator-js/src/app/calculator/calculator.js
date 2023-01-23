class Calculator {
    constructor() {
        this.result = 0;

        this.add = function (left, right) {
            if (!left) {
                left = this.result;
            }

            this.result = left + right;
        };

        this.substract = function (left, right) {
            if (!left) {
                left = this.result;
            }

            this.result = left - right;
        };

        this.multiply = function (left, right) {
            if (!left) {
                left = this.result;
            }

            this.result = left * right;
        };

        this.divide = function (left, right) {
            if (!left) {
                left = this.result;
            }

            if (right === 0) {
                throw new Error("Divide by zero is forbidden.");
            }

            this.result = left / right;
        };

        this.getResult = function () {
            return this.result;
        };

        this.setResult = function (value) {
            this.result = value;
        };
    }
}

export default Calculator;

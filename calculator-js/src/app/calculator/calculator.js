class Calculator {
    constructor() {
        this.result = 0;

        this.add = function (value) {
            this.result += value;
        };

        this.substract = function (value) {
            this.result -= value;
        };

        this.multiply = function (value) {
            this.result *= value;
        };

        this.divide = function (value) {
            if (value === 0) {
                throw new Error("Divide by zero is forbidden.");
            }

            this.result /= value;
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

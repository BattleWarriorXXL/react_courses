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

        this.xPowY = function (left, right) {
            if (!left) {
                left = this.result;
            }

            this.result = Math.pow(left, right);
        };

        this.xRootY = function (left, right) {
            if (!left) {
                left = this.result;
            }

            this.result = Math.pow(left, 1 / right);
        };

        this.percentage = function (value) {
            this.result = value / 100.0;
        };

        this.negative = function (value) {
            this.result = value * (-1);
        };

        this.square = function (value) {
            this.result = value * value;
        };

        this.cube = function (value) {
            this.result = value * value * value;
        };

        this.ePowX = function (value) {
            this.result = Math.pow(Math.E, value);
        };

        this.xPowE = function (value) {
            this.result = Math.pow(value, Math.E);
        };

        this.tenPowX = function (value) {
            this.result = Math.pow(10, value);
        };

        this.inverse = function (value) {
            this.result = 1 / value;
        };

        this.squareRoot = function (value) {
            this.result = Math.sqrt(value);
        };

        this.cubeRoot = function (value) {
            this.result = Math.cbrt(value);
        };

        this.ln = function (value) {
            this.result = Math.log(value);
        };

        this.log = function (value) {
            this.result = Math.log10(value);
        };

        this.factorial = function (value) {
            let temp = 1;
            for (let i = value; i > 1; i--) {
                temp *= i;
            }

            this.result = temp;
        };

        this.sin = function (value) {
            this.result = Math.sin(value);
        };

        this.cos = function (value) {
            this.result = Math.cos(value);
        };

        this.tan = function (value) {
            this.result = Math.tan(value);
        };

        this.ee = function (value) {
            this.result = Math.expm1(value);
        };

        this.rad = function (value) {
            this.result = Math.PI / 180 * value;
        };

        this.sinh = function (value) {
            this.result = Math.sinh(value);
        };

        this.cosh = function (value) {
            this.result = Math.cosh(value);
        };

        this.tanh = function (value) {
            this.result = Math.tanh(value);
        };

        this.pi = function () {
            this.result = Math.PI;
        };

        this.e = function () {
            this.result = Math.E;
        };

        this.random = function () {
            this.result = Math.random();
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

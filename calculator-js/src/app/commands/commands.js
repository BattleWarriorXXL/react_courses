import Command from "./command_base.js";

class AddCommand extends Command {
    constructor(calculator, left, right) {
        super();

        var undoResult = calculator.getResult();

        this.execute = function() {
            calculator.add(left, right);
        };

        this.undo = function() {
            calculator.setResult(undoResult);
        };
    }
}

class SubstractCommand extends Command {
    constructor(calculator, left, right) {
        super();

        var undoResult = calculator.getResult();

        this.execute = function() {
            calculator.substract(left, right);
        };

        this.undo = function() {
            calculator.setResult(undoResult);
        };
    }
}

class MultiplyCommand extends Command {
    constructor(calculator, left, right) {
        super();

        var undoResult = calculator.getResult();

        this.execute = function() {
            calculator.multiply(left, right);
        };

        this.undo = function() {
            calculator.setResult(undoResult);
        };
    }
}

class DivideCommand extends Command {
    constructor(calculator, left, right) {
        super();

        var undoResult = calculator.getResult();

        this.execute = function() {
            calculator.divide(left, right);
        };

        this.undo = function() {
            calculator.setResult(undoResult);
        };
    }
}

export {
    AddCommand,
    SubstractCommand,
    MultiplyCommand,
    DivideCommand
};

import Command from "./command_base.js";

class AddCommand extends Command {
    constructor(calculator, value) {
        super();

        var undoResult = calculator.getResult();

        this.execute = function () {
            calculator.add(value);
        };

        this.undo = function () {
            calculator.setResult(undoResult);
        };
    }
}

class SubstractCommand extends Command {
    constructor(calculator, value) {
        super();

        var undoResult = calculator.getResult();

        this.execute = function () {
            calculator.substract(value);
        };

        this.undo = function () {
            calculator.setResult(undoResult);
        };
    }
}

class MultiplyCommand extends Command {
    constructor(calculator, value) {
        super();

        var undoResult = calculator.getResult();

        this.execute = function () {
            calculator.add(value);
        };

        this.undo = function () {
            calculator.setResult(undoResult);
        };
    }
}

class DivideCommand extends Command {
    constructor(calculator, value) {
        super();

        var undoResult = calculator.getResult();

        this.execute = function () {
            calculator.add(value);
        };

        this.undo = function () {
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

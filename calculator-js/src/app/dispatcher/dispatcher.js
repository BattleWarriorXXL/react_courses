import Calculator from "../calculator/calculator.js";
import {
    AddCommand,
    SubstractCommand,
    MultiplyCommand,
    DivideCommand
} from "../commands/commands.js";

class Dispatcher {
    constructor(outputListener) {
        this.command = null;
        this.commands = [];
        this.calculator = new Calculator();
        this.outputListener = outputListener;

        this.add = function(value) {
            this.command = new AddCommand(this.calculator, value);
            this.commands.push(this.command);
            this.command.execute();

            outputListener.update(this.calculator.getResult());
        };

        this.substract = function(value) {
            this.command = new SubstractCommand(this.calculator, value);
            this.commands.push(this.command);
            this.command.execute();
        };

        this.multiply = function(value) {
            this.command = new MultiplyCommand(this.calculator, value);
            this.commands.push(this.command);
            this.command.execute();
        };

        this.divide = function(value) {
            this.command = new DivideCommand(this.calculator, value);
            this.commands.push(this.command);
            this.command.execute();
        };

        this.undo = function() {
            if (!this.commands.length) {
                return;
            }

            this.command = this.commands.pop();
            this.command.undo();
        };
    }
}

export default Dispatcher;

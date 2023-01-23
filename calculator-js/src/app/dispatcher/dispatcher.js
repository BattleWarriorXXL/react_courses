import Calculator from "../calculator/calculator.js";
import {
    AddCommand,
    SubstractCommand,
    MultiplyCommand,
    DivideCommand
} from "../commands/commands.js";

class Dispatcher {
    constructor() {
        this.command = null;
        this.commands = [];
        this.calculator = new Calculator();

        this.add = function(left, right) {
            this.command = new AddCommand(this.calculator, left, right);
            this.commands.push(this.command);
            this.command.execute();
        };

        this.substract = function(left, right) {
            this.command = new SubstractCommand(this.calculator, left, right);
            this.commands.push(this.command);
            this.command.execute();
        };

        this.multiply = function(left, right) {
            this.command = new MultiplyCommand(this.calculator, left, right);
            this.commands.push(this.command);
            this.command.execute();
        };

        this.divide = function(left, right) {
            this.command = new DivideCommand(this.calculator, left, right);
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

        this.getResult = function(left, command, right = null) {
            switch (command) {
            case "+":
                this.add(left, right);
                break; 
            case "-":
                this.substract(left, right);
                break;
            case "*":
                this.multiply(left, right);
                break;
            case "/":
                this.divide(left, right);
                break;
            }

            
            return this.calculator.getResult();
        };
    }
}

export default Dispatcher;

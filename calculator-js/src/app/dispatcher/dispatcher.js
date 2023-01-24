import Calculator from "../calculator/calculator.js";
import {
    AddCommand,
    SubstractCommand,
    MultiplyCommand,
    DivideCommand,
    PercentageCommand,
    NegativeCommand,
    SquareCommand,
    CubeCommand,
    EPowXCommand,
    XPowECommand,
    TenPowXCommand,
    InverseCommand,
    SquareRootCommand,
    CubeRootCommand,
    LnCommand,
    LogCommand,
    FactorialCommand,
    SinCommand,
    CosCommand,
    TanCommand,
    EECommand,
    SinhCommand,
    CoshCommand,
    TanhCommand,
    RadCommand,
    XPowYCommand,
    XRootYCommand,
    ECommand,
    PICommand,
    RandomCommand
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

        this.xPowY = function(left, right) {
            this.command = new XPowYCommand(this.calculator, left, right);
            this.commands.push(this.command);
            this.command.execute();
        };

        this.xRootY = function(left, right) {
            this.command = new XRootYCommand(this.calculator, left, right);
            this.commands.push(this.command);
            this.command.execute();
        };


        this.percentage = function(value) {
            this.command = new PercentageCommand(this.calculator, value);
            this.commands.push(this.command);
            this.command.execute();
        };

        this.negative = function(value) {
            this.command = new NegativeCommand(this.calculator, value);
            this.commands.push(this.command);
            this.command.execute();
        };

        this.square = function(value) {
            this.command = new SquareCommand(this.calculator, value);
            this.commands.push(this.command);
            this.command.execute();
        };

        this.cube = function(value) {
            this.command = new CubeCommand(this.calculator, value);
            this.commands.push(this.command);
            this.command.execute();
        };

        this.ePowX = function(value) {
            this.command = new EPowXCommand(this.calculator, value);
            this.commands.push(this.command);
            this.command.execute();
        };

        this.xPowE = function(value) {
            this.command = new XPowECommand(this.calculator, value);
            this.commands.push(this.command);
            this.command.execute();
        };

        this.tenPowX = function(value) {
            this.command = new TenPowXCommand(this.calculator, value);
            this.commands.push(this.command);
            this.command.execute();
        };

        this.inverse = function(value) {
            this.command = new InverseCommand(this.calculator, value);
            this.commands.push(this.command);
            this.command.execute();
        };

        this.squareRoot = function(value) {
            this.command = new SquareRootCommand(this.calculator, value);
            this.commands.push(this.command);
            this.command.execute();
        };

        this.cubeRoot = function(value) {
            this.command = new CubeRootCommand(this.calculator, value);
            this.commands.push(this.command);
            this.command.execute();
        };

        this.ln = function(value) {
            this.command = new LnCommand(this.calculator, value);
            this.commands.push(this.command);
            this.command.execute();
        };

        this.log = function(value) {
            this.command = new LogCommand(this.calculator, value);
            this.commands.push(this.command);
            this.command.execute();
        };

        this.factorial = function(value) {
            this.command = new FactorialCommand(this.calculator, value);
            this.commands.push(this.command);
            this.command.execute();
        };

        this.sin = function(value) {
            this.command = new SinCommand(this.calculator, value);
            this.commands.push(this.command);
            this.command.execute();
        };

        this.cos = function(value) {
            this.command = new CosCommand(this.calculator, value);
            this.commands.push(this.command);
            this.command.execute();
        };

        this.tan = function(value) {
            this.command = new TanCommand(this.calculator, value);
            this.commands.push(this.command);
            this.command.execute();
        };

        this.ee = function(value) {
            this.command = new EECommand(this.calculator, value);
            this.commands.push(this.command);
            this.command.execute();
        };

        this.rad = function(value) {
            this.command = new RadCommand(this.calculator, value);
            this.commands.push(this.command);
            this.command.execute();
        };

        this.sinh = function(value) {
            this.command = new SinhCommand(this.calculator, value);
            this.commands.push(this.command);
            this.command.execute();
        };

        this.cosh = function(value) {
            this.command = new CoshCommand(this.calculator, value);
            this.commands.push(this.command);
            this.command.execute();
        };

        this.tanh = function(value) {
            this.command = new TanhCommand(this.calculator, value);
            this.commands.push(this.command);
            this.command.execute();
        };

        this.e = function() {
            this.command = new ECommand(this.calculator);
            this.commands.push(this.command);
            this.command.execute();
        };

        this.pi = function() {
            this.command = new PICommand(this.calculator);
            this.commands.push(this.command);
            this.command.execute();
        };

        this.random = function() {
            this.command = new RandomCommand(this.calculator);
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
            case "^":
                this.xPowY(left, right);
                break;
            case "root":
                this.xRootY(left, right);
                break;
            case "%":
                this.percentage(left);
                break;
            case "negative":
                this.negative(left);
                break;
            case "square":
                this.square(left);
                break;
            case "cube":
                this.cube(left);
                break;
            case "e_in_x":
                this.ePowX(left);
                break;
            case "x_in_e":
                this.xPowE(left);
                break;
            case "ten_in_x":
                this.tenPowX(left);
                break;
            case "inverse":
                this.inverse(left);
                break;
            case "square_root":
                this.squareRoot(left);
                break;
            case "cube_root":
                this.cubeRoot(left);
                break;
            case "ln":
                this.ln(left);
                break;
            case "log":
                this.log(left);
                break;
            case "factorial":
                this.factorial(left);
                break;
            case "sin":
                this.sin(left);
                break;
            case "cos":
                this.cos(left);
                break;
            case "tan":
                this.tan(left);
                break;
            case "ee":
                this.ee(left);
                break;
            case "rad":
                this.rad(left);
                break;
            case "sinh":
                this.sinh(left);
                break;
            case "cosh":
                this.cosh(left);
                break;
            case "tanh":
                this.tanh(left);
                break;
            case "e":
                this.e();
                break;
            case "pi":
                this.pi();
                break;
            case "random":
                this.random();
                break;
            case "undo":
                this.undo();
                break;
            default:
                throw new Error("Unexpected operation.");
            }

            return this.calculator.getResult();
        };
    }
}

export default Dispatcher;

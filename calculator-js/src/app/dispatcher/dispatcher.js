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
    RandomCommand,
    AddMemoryCommand,
    SubstractMemoryCommand,
    RecallMemoryCommand,
    ClearMemoryCommand
} from "../commands/commands.js";

class Dispatcher {
    constructor() {
        this.command = null;
        this.commands = [];
        this.calculator = new Calculator();

        this.process = function(command, value1, value2) {
            this.command = new command(this.calculator, value1, value2);
            this.commands.push(this.command);
            this.command.execute();
        };

        this.undo = function() {
            if (!this.commands.length) {
                return 0;
            }

            this.command = this.commands.pop();
            this.command.undo();
        };

        this.getResult = function(left, command, right = null) {
            switch (command) {
            case "+":
                this.process(AddCommand, left, right);
                break; 
            case "-":
                this.process(SubstractCommand, left, right);
                break;
            case "*":
                this.process(MultiplyCommand, left, right);
                break;
            case "/":
                this.process(DivideCommand, left, right);
                break;
            case "^":
                this.process(XPowYCommand, left, right);
                break;
            case "root":
                this.process(XRootYCommand, left, right);
                break;
            case "%":
                this.process(PercentageCommand, left);
                break;
            case "negative":
                this.process(NegativeCommand, left);
                break;
            case "square":
                this.process(SquareCommand, left);
                break;
            case "cube":
                this.process(CubeCommand, left);
                break;
            case "e_in_x":
                this.process(EPowXCommand, left);
                break;
            case "x_in_e":
                this.process(XPowECommand, left);
                break;
            case "ten_in_x":
                this.process(TenPowXCommand, left);
                break;
            case "inverse":
                this.process(InverseCommand, left);
                break;
            case "square_root":
                this.process(SquareRootCommand, left);
                break;
            case "cube_root":
                this.process(CubeRootCommand, left);
                break;
            case "ln":
                this.process(LnCommand, left);
                break;
            case "log":
                this.process(LogCommand, left);
                break;
            case "factorial":
                this.process(FactorialCommand, left);
                break;
            case "sin":
                this.process(SinCommand, left);
                break;
            case "cos":
                this.process(CosCommand, left);
                break;
            case "tan":
                this.process(TanCommand, left);
                break;
            case "ee":
                this.process(EECommand, left);
                break;
            case "rad":
                this.process(RadCommand, left);
                break;
            case "sinh":
                this.process(SinhCommand, left);
                break;
            case "cosh":
                this.process(CoshCommand, left);
                break;
            case "tanh":
                this.process(TanhCommand, left);
                break;
            case "e":
                this.process(ECommand);
                break;
            case "pi":
                this.process(PICommand);
                break;
            case "random":
                this.process(RandomCommand);
                break;
            case "add_memory":
                this.process(AddMemoryCommand, parseFloat(left));
                return;
            case "substract_memory":
                this.process(SubstractMemoryCommand, parseFloat(left));
                return;
            case "recall_memory":
                this.process(RecallMemoryCommand);
                break;
            case "clear_memory":
                this.process(ClearMemoryCommand);
                return;
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

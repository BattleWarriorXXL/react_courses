import Command from "./command_base.js";

class AddMemoryCommand extends Command {
    constructor(calculator, value) {
        super();

        var undoResult = calculator.getResult();

        this.execute = function () {
            calculator.addMemory(value);
        };

        this.undo = function () {
            calculator.setResult(undoResult);
        };
    }
}

class SubstractMemoryCommand extends Command {
    constructor(calculator, value) {
        super();

        var undoResult = calculator.getResult();

        this.execute = function () {
            calculator.substractMemory(value);
        };

        this.undo = function () {
            calculator.setResult(undoResult);
        };
    }
}

class RecallMemoryCommand extends Command {
    constructor(calculator) {
        super();

        var undoResult = calculator.getResult();

        this.execute = function () {
            calculator.recallMemory();
        };

        this.undo = function () {
            calculator.setResult(undoResult);
        };
    }
}

class ClearMemoryCommand extends Command {
    constructor(calculator) {
        super();

        var undoResult = calculator.getResult();

        this.execute = function () {
            calculator.clearMemory();
        };

        this.undo = function () {
            calculator.setResult(undoResult);
        };
    }
}

class AddCommand extends Command {
    constructor(calculator, left, right) {
        super();

        var undoResult = calculator.getResult();

        this.execute = function () {
            calculator.add(left, right);
        };

        this.undo = function () {
            calculator.setResult(undoResult);
        };
    }
}

class SubstractCommand extends Command {
    constructor(calculator, left, right) {
        super();

        var undoResult = calculator.getResult();

        this.execute = function () {
            calculator.substract(left, right);
        };

        this.undo = function () {
            calculator.setResult(undoResult);
        };
    }
}

class MultiplyCommand extends Command {
    constructor(calculator, left, right) {
        super();

        var undoResult = calculator.getResult();

        this.execute = function () {
            calculator.multiply(left, right);
        };

        this.undo = function () {
            calculator.setResult(undoResult);
        };
    }
}

class DivideCommand extends Command {
    constructor(calculator, left, right) {
        super();

        var undoResult = calculator.getResult();

        this.execute = function () {
            calculator.divide(left, right);
        };

        this.undo = function () {
            calculator.setResult(undoResult);
        };
    }
}

class XPowYCommand extends Command {
    constructor(calculator, left, right) {
        super();

        var undoResult = calculator.getResult();

        this.execute = function () {
            calculator.xPowY(left, right);
        };

        this.undo = function () {
            calculator.setResult(undoResult);
        };
    }
}

class XRootYCommand extends Command {
    constructor(calculator, left, right) {
        super();

        var undoResult = calculator.getResult();

        this.execute = function () {
            calculator.xRootY(left, right);
        };

        this.undo = function () {
            calculator.setResult(undoResult);
        };
    }
}

class PercentageCommand extends Command {
    constructor(calculator, value) {
        super();

        var undoResult = calculator.getResult();

        this.execute = function () {
            calculator.percentage(value);
        };

        this.undo = function () {
            calculator.setResult(undoResult);
        };
    }
}

class NegativeCommand extends Command {
    constructor(calculator, value) {
        super();

        var undoResult = calculator.getResult();

        this.execute = function () {
            calculator.negative(value);
        };

        this.undo = function () {
            calculator.setResult(undoResult);
        };
    }
}

class SquareCommand extends Command {
    constructor(calculator, value) {
        super();

        var undoResult = calculator.getResult();

        this.execute = function () {
            calculator.square(value);
        };

        this.undo = function () {
            calculator.setResult(undoResult);
        };
    }
}

class CubeCommand extends Command {
    constructor(calculator, value) {
        super();

        var undoResult = calculator.getResult();

        this.execute = function () {
            calculator.cube(value);
        };

        this.undo = function () {
            calculator.setResult(undoResult);
        };
    }
}

class EPowXCommand extends Command {
    constructor(calculator, value) {
        super();

        var undoResult = calculator.getResult();

        this.execute = function () {
            calculator.ePowX(value);
        };

        this.undo = function () {
            calculator.setResult(undoResult);
        };
    }
}

class XPowECommand extends Command {
    constructor(calculator, value) {
        super();

        var undoResult = calculator.getResult();

        this.execute = function () {
            calculator.xPowE(value);
        };

        this.undo = function () {
            calculator.setResult(undoResult);
        };
    }
}

class TenPowXCommand extends Command {
    constructor(calculator, value) {
        super();

        var undoResult = calculator.getResult();

        this.execute = function () {
            calculator.tenPowX(value);
        };

        this.undo = function () {
            calculator.setResult(undoResult);
        };
    }
}

class InverseCommand extends Command {
    constructor(calculator, value) {
        super();

        var undoResult = calculator.getResult();

        this.execute = function () {
            calculator.inverse(value);
        };

        this.undo = function () {
            calculator.setResult(undoResult);
        };
    }
}

class SquareRootCommand extends Command {
    constructor(calculator, value) {
        super();

        var undoResult = calculator.getResult();

        this.execute = function () {
            calculator.squareRoot(value);
        };

        this.undo = function () {
            calculator.setResult(undoResult);
        };
    }
}

class CubeRootCommand extends Command {
    constructor(calculator, value) {
        super();

        var undoResult = calculator.getResult();

        this.execute = function () {
            calculator.cubeRoot(value);
        };

        this.undo = function () {
            calculator.setResult(undoResult);
        };
    }
}

class LnCommand extends Command {
    constructor(calculator, value) {
        super();

        var undoResult = calculator.getResult();

        this.execute = function () {
            calculator.ln(value);
        };

        this.undo = function () {
            calculator.setResult(undoResult);
        };
    }
}

class LogCommand extends Command {
    constructor(calculator, value) {
        super();

        var undoResult = calculator.getResult();

        this.execute = function () {
            calculator.log(value);
        };

        this.undo = function () {
            calculator.setResult(undoResult);
        };
    }
}

class FactorialCommand extends Command {
    constructor(calculator, value) {
        super();

        var undoResult = calculator.getResult();

        this.execute = function () {
            calculator.factorial(value);
        };

        this.undo = function () {
            calculator.setResult(undoResult);
        };
    }
}

class SinCommand extends Command {
    constructor(calculator, value) {
        super();

        var undoResult = calculator.getResult();

        this.execute = function () {
            calculator.sin(value);
        };

        this.undo = function () {
            calculator.setResult(undoResult);
        };
    }
}

class CosCommand extends Command {
    constructor(calculator, value) {
        super();

        var undoResult = calculator.getResult();

        this.execute = function () {
            calculator.cos(value);
        };

        this.undo = function () {
            calculator.setResult(undoResult);
        };
    }
}

class TanCommand extends Command {
    constructor(calculator, value) {
        super();

        var undoResult = calculator.getResult();

        this.execute = function () {
            calculator.tan(value);
        };

        this.undo = function () {
            calculator.setResult(undoResult);
        };
    }
}

class EECommand extends Command {
    constructor(calculator, value) {
        super();

        var undoResult = calculator.getResult();

        this.execute = function () {
            calculator.ee(value);
        };

        this.undo = function () {
            calculator.setResult(undoResult);
        };
    }
}

class RadCommand extends Command {
    constructor(calculator, value) {
        super();

        var undoResult = calculator.getResult();

        this.execute = function () {
            calculator.rad(value);
        };

        this.undo = function () {
            calculator.setResult(undoResult);
        };
    }
}

class SinhCommand extends Command {
    constructor(calculator, value) {
        super();

        var undoResult = calculator.getResult();

        this.execute = function () {
            calculator.sinh(value);
        };

        this.undo = function () {
            calculator.setResult(undoResult);
        };
    }
}

class CoshCommand extends Command {
    constructor(calculator, value) {
        super();

        var undoResult = calculator.getResult();

        this.execute = function () {
            calculator.cosh(value);
        };

        this.undo = function () {
            calculator.setResult(undoResult);
        };
    }
}

class TanhCommand extends Command {
    constructor(calculator, value) {
        super();

        var undoResult = calculator.getResult();

        this.execute = function () {
            calculator.tanh(value);
        };

        this.undo = function () {
            calculator.setResult(undoResult);
        };
    }
}

class ECommand extends Command {
    constructor(calculator) {
        super();

        var undoResult = calculator.getResult();

        this.execute = function () {
            calculator.e();
        };

        this.undo = function () {
            calculator.setResult(undoResult);
        };
    }
}

class PICommand extends Command {
    constructor(calculator) {
        super();

        var undoResult = calculator.getResult();

        this.execute = function () {
            calculator.pi();
        };

        this.undo = function () {
            calculator.setResult(undoResult);
        };
    }
}

class RandomCommand extends Command {
    constructor(calculator) {
        super();

        var undoResult = calculator.getResult();

        this.execute = function () {
            calculator.random();
        };

        this.undo = function () {
            calculator.setResult(undoResult);
        };
    }
}

export {
    AddMemoryCommand,
    SubstractMemoryCommand,
    RecallMemoryCommand,
    ClearMemoryCommand,
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
    RadCommand,
    SinhCommand,
    CoshCommand,
    TanhCommand,
    XPowYCommand,
    XRootYCommand,
    ECommand,
    PICommand,
    RandomCommand,
};

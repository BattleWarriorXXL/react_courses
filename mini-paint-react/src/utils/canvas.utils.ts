interface CanvasUtilsParams {
    context: CanvasRenderingContext2D | null;
    setStartX: (x: number) => void;
    setStartY: (y: number) => void;
    saveDrawedImage: () => void;
    isDrawing: boolean;
}

class CanvasUtils {
    private context: CanvasRenderingContext2D | null;
    private setStartX: (x: number) => void;
    private setStartY: (y: number) => void;
    private saveDrawedImage: () => void;
    private isDrawing: boolean;

    constructor(private params: CanvasUtilsParams) {
        this.context = params.context;
        this.setStartX = params.setStartX;
        this.setStartY = params.setStartY;
        this.saveDrawedImage = params.saveDrawedImage;
        this.isDrawing = params.isDrawing;
    }

    public drawLine(startX: number, startY: number, x: number, y: number) {
        if (!this.context)
            throw new Error("Canvas context is not initialized.");
    
        this.context.beginPath();
        this.context.moveTo(startX, startY);
        this.context.lineTo(x, y);
        this.setStartX(x);
        this.setStartY(y);
        this.context.stroke();
        this.saveDrawedImage();
    }

    public drawStraightLine(startX: number, startY: number, x: number, y: number) {
        if (!this.context)
            throw new Error("Canvas context is not initialized.");
    
        this.context.beginPath();
        this.context.moveTo(startX, startY);
        this.context.lineTo(x, y);
        this.context.stroke();
    }
    
    public drawCircle(startX: number, startY: number, x: number, y: number) {
        if (!this.context)
            throw new Error("Canvas context is not initialized.");
    
        const radius = Math.sqrt(Math.pow(x - startX, 2) + Math.pow(y - startY, 2));
        this.context.beginPath();
        this.context.arc(startX, startY, radius, 0, Math.PI * 2);
        this.context.stroke();
    }
    
    public drawTriangle(startX: number, startY: number, x: number, y: number) {
        if (!this.context)
            throw new Error("Canvas context is not initialized.");
    
        const x1 = startX;
        const y1 = y;
        const x2 = x1 + (x - startX) / 2;
        const y2 = startY;
        const x3 = x;
        const y3 = y;
    
        this.context.beginPath();
        this.context.lineTo(x1, y1);
        this.context.lineTo(x2, y2);
        this.context.lineTo(x3, y3);
        this.context.closePath();
        this.context.stroke();
    }
    
    public drawSquare(startX: number, startY: number, x: number, y: number) {
        if (!this.context)
            throw new Error("Canvas context is not initialized.");
    
        const width = x - startX;
        const height = y - startY;
        this.context.strokeRect(startX, startY, width, height);
        this.context.fillRect(startX, startY, width, height);
    }
    
    public drawStar(startX: number, startY: number, x: number, y: number) {
        if (!this.context)
            throw new Error("Canvas context is not initialized.");
                
        const x1 = startX;
        const y1 = startY;
        const x2 = x1 + (x - x1) / 3;
        const y2 = y1 - (y - y1) / 8;
        const x3 = x1 + (x - x1) / 2;
        const y3 = y1 - (y - y1) / 1.5;
        const x4 = x1 + (x - x2);
        const y4 = y2;
        const x5 = x;
        const y5 = y1;
        const x6 = x4 + (x5 - x4) / 2;
        const y6 = y1 + (y - y4) / 3;
        const x7 = x5;
        const y7 = y;
        const x8 = x3;
        const y8 = y1 + (y - y4) / 1.7;
        const x9 = x1;
        const y9 = y7;
        const x10 = x1 + (x5 - x4) / 2;
        const y10 = y6;
    
        this.context.beginPath();
        this.context.lineTo(x1, y1);
        this.context.lineTo(x2, y2);
        this.context.lineTo(x3, y3);
        this.context.lineTo(x4, y4);
        this.context.lineTo(x5, y5);
        this.context.lineTo(x6, y6);
        this.context.lineTo(x7, y7);
        this.context.lineTo(x8, y8);
        this.context.lineTo(x9, y9);
        this.context.lineTo(x10, y10);
        this.context.closePath();
        this.context.stroke();
    }
    
    public drawPolygon(startX: number, startY: number, x: number, y: number) {
        if (!this.context)
            throw new Error("Canvas context is not initialized.");
    
        const x1 = startX;
        const y1 = startY;
        const x2 = x1 + (x - x1) / 3;
        const y2 = y1 - (y - y1) / 3;
        const x3 = x1 + (x - x1) / 3 * 2;
        const y3 = y2;
        const x4 = x;
        const y4 = y1;
        const x5 = x4;
        const y5 = y - (y - y1) / 3;
        const x6 = x3;
        const y6 = y;
        const x7 = x2;
        const y7 = y6;
        const x8 = x1;
        const y8 = y5;
    
        this.context.beginPath();
        this.context.lineTo(x1, y1);
        this.context.lineTo(x2, y2);
        this.context.lineTo(x3, y3);
        this.context.lineTo(x4, y4);
        this.context.lineTo(x5, y5);
        this.context.lineTo(x6, y6);
        this.context.lineTo(x7, y7);
        this.context.lineTo(x8, y8);
        this.context.closePath();
        this.context.stroke();
    }
    
    public erase(startX: number, startY: number, x: number, y: number) {
        if (!this.context)
            throw new Error("Canvas context is not initialized.");
    
        const eraseSize = this.context.lineWidth * 10;
        this.context.clearRect(startX - eraseSize / 2, startY - eraseSize / 2, eraseSize, eraseSize);

        const xDiff = x - startX;
        const yDiff = y - startY;
        const interpolatedXValues: number[] = [];
        const interpolatedYValues: number[] = [];
        const step = eraseSize;

        if (xDiff > 0)
            interpolatedXValues.push(...Array.from({length: (xDiff + step) / step}, (_, i) => startX + (i * step)));
        else
            interpolatedXValues.push(...Array.from({length: (-xDiff + step) / eraseSize}, (_, i) => startX - (i * step)));

        if (yDiff > 0)
            interpolatedYValues.push(...Array.from({length: (yDiff + step) / step}, (_, i) => startY + (i * step)));
        else
            interpolatedYValues.push(...Array.from({length: (-yDiff + step) / step}, (_, i) => startY - (i * step)));
            
        if (interpolatedXValues.length > interpolatedYValues.length) {
            interpolatedYValues.push(
                ...Array.from({length: interpolatedXValues.length - interpolatedYValues.length},
                    () => interpolatedYValues[interpolatedYValues.length - 1] ?? y));
        } else if (interpolatedXValues.length < interpolatedYValues.length) {
            interpolatedXValues.push(
                ...Array.from({length: interpolatedYValues.length - interpolatedXValues.length},
                    () => interpolatedXValues[interpolatedXValues.length - 1] ?? x));
        }

        for (let i = 0; i < interpolatedXValues.length; i++) {
            this.context.clearRect(interpolatedXValues[i] - eraseSize / 2, interpolatedYValues[i] - eraseSize / 2, eraseSize, eraseSize);
        }
    
        this.setStartX(x);
        this.setStartY(y);
    
        this.saveDrawedImage();
    }
}

export default CanvasUtils;

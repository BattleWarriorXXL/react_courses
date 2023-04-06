import React, { useEffect, useRef, useState } from "react";

import CanvasTools from "./CanvasTools/CanvasTools";
import CanvasActions from "./CanvasActions/CanvasActions";
import Tool from "../../enums/tool.enum";
import Color from "../../enums/color.enum";
import Width from "../../enums/width.enum";

import "./Canvas.css";

const Canvas = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [selectedTool, setSelectedTool] = useState<Tool>(Tool.Hand);
    const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
    const [drawedImage, setDrawedImage] = useState<ImageData | null>(null);
    const [isDrawing, setIsDrawing] = useState<boolean>(false);
    const [startX, setStartX] = useState<number>(0);
    const [startY, setStartY] = useState<number>(0);
    const [canvasWidth, setCanvasWidth] = useState<number>(window.innerWidth);
    const [canvasHeight, setCanvasHeight] = useState<number>(window.innerHeight - 40);

    const handleMouseDown = (e: MouseEvent) => {
        setIsDrawing(true);
        setStartX(e.offsetX);
        setStartY(e.offsetY);
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (!isDrawing)
            return;

        if (!context)
            throw new Error("Canvas context is null.");

        if (!canvasRef.current)
            throw new Error("Canvas is not initialized.");

        const x = e.offsetX;
        const y = e.offsetY;

        context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height - 40);
        restoreDrawedImage();

        switch (selectedTool) {
        case Tool.Hand:
            drawLine(x, y);
            break;
        case Tool.Pencil:
            drawLine(x, y);
            break;
        case Tool.Line:
            drawStraightLine(x, y);
            break;
        case Tool.Circle:
            drawCircle(x, y);
            break;
        case Tool.Triangle:
            drawTriangle(x, y);
            break;
        case Tool.Square:
            drawSquare(x, y);
            break;
        case Tool.Star:
            drawStar(x, y);
            break;
        case Tool.Polygon:
            drawPolygon(x, y);
            break;
        case Tool.Eraser:
            erase(x, y);
            break;
        }

        context.fill();
    };

    const handleMouseUp = () => {
        setIsDrawing(false);
        saveDrawedImage();
    };

    const saveDrawedImage = () => {
        const imageData = context?.getImageData(0, 0, canvasWidth, canvasHeight);
        
        if (imageData)
            setDrawedImage(imageData);
    };

    const restoreDrawedImage = () => {
        if (!drawedImage)
            return;
            
        context?.putImageData(drawedImage, 0, 0);
    };

    const handleCanvasClear = () => {
        context?.clearRect(0, 0, canvasWidth, canvasHeight);
        setDrawedImage(null);
    };

    const handleCanvasColorSelect = (color: Color) => {
        if (!context)
            throw new Error("Canvas context is not initialized.");

        context.strokeStyle = color.toString();
    };

    const handleCanvasFillColorSelect = (color: Color) => {
        if (!context)
            throw new Error("Canvas context is not initialized.");

        context.fillStyle = color.toString();
    };

    const handleCanvasLineWidthSelect = (width: Width) => {
        if (!context)
            throw new Error("Canvas context is not initialized.");

        context.lineWidth = width;
    };

    const drawLine = (x: number, y: number) => {
        if (!context)
            throw new Error("Canvas context is not initialized.");

        context.beginPath();
        context.moveTo(startX, startY);
        context.lineTo(x, y);
        setStartX(x);
        setStartY(y);
        context.stroke();
        saveDrawedImage();
    };

    const drawStraightLine = (x: number, y: number) => {
        if (!context)
            throw new Error("Canvas context is not initialized.");

        context.beginPath();
        context.moveTo(startX, startY);
        context.lineTo(x, y);
        context.stroke();
    };

    const drawCircle = (x: number, y: number) => {
        if (!context)
            throw new Error("Canvas context is not initialized.");

        const radius = Math.sqrt(Math.pow(x - startX, 2) + Math.pow(y - startY, 2));
        context.beginPath();
        context.arc(startX, startY, radius, 0, Math.PI * 2);
        context.stroke();
    };

    const  drawTriangle = (x: number, y: number) => {
        if (!context)
            throw new Error("Canvas context is not initialized.");

        const x1 = startX;
        const y1 = y;
        const x2 = x1 + (x - startX) / 2;
        const y2 = startY;
        const x3 = x;
        const y3 = y;

        context.beginPath();
        context.lineTo(x1, y1);
        context.lineTo(x2, y2);
        context.lineTo(x3, y3);
        context.closePath();
        context.stroke();
    };

    const drawSquare = (x: number, y: number) => {
        if (!context)
            throw new Error("Canvas context is not initialized.");

        const width = x - startX;
        const height = y - startY;
        context.strokeRect(startX, startY, width, height);
        context.fillRect(startX, startY, width, height);
    };

    const drawStar = (x: number, y: number) => {
        if (!context)
            throw new Error("Canvas context is not initialized.");

        context.beginPath();
        context.moveTo(startX, startY);
        context.lineTo(x, y);
        context.stroke();
    };

    const drawPolygon = (x: number, y: number) => {
        if (!context)
            throw new Error("Canvas context is not initialized.");

        context.beginPath();
        context.moveTo(startX, startY);
        context.lineTo(x, y);
        context.stroke();
    };

    const erase = (x: number, y: number) => {
        if (!context)
            throw new Error("Canvas context is not initialized.");

        context.beginPath();
        context.moveTo(startX, startY);
        context.lineTo(x, y);
        context.stroke();
    };

    useEffect(() => {
        setCanvasWidth(window.innerWidth);
        setCanvasHeight(window.innerHeight- 40);
    }, [canvasWidth, canvasHeight]);

    useEffect(() => {
        const canvas = canvasRef.current;

        canvas?.addEventListener("mousedown", handleMouseDown);
        canvas?.addEventListener("mousemove", handleMouseMove);
        canvas?.addEventListener("mouseup", handleMouseUp);

        setContext(canvasRef.current?.getContext("2d") ?? null);
        
        return () => {
            canvas?.removeEventListener("mousedown", handleMouseDown);
            canvas?.removeEventListener("mousemove", handleMouseMove);
            canvas?.removeEventListener("mouseup", handleMouseUp);
        };
    }, [startX, startY, isDrawing]);

    return (
        <div className="canvas-wrapper">
            <CanvasActions 
                onCanvasColorSelected={handleCanvasColorSelect}
                onCanvasFillColorSelected={handleCanvasFillColorSelect}
                onCanvasLineWidthSelected={handleCanvasLineWidthSelect}
                onCanvasSave={() => console.log("save")}
                onCanvasClear={handleCanvasClear} />
            <CanvasTools
                selectedTool={selectedTool}
                onToolClick={(tool) => setSelectedTool(tool)} />
            <canvas
                ref={canvasRef}
                width={canvasWidth}
                height={canvasHeight}
                style={{ width: canvasWidth, height: canvasHeight }}></canvas>
        </div>
    );
};

export default Canvas;

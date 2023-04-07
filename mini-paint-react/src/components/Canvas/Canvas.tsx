import React, { useEffect, useRef, useState, useContext } from "react";

import CanvasTools from "./CanvasTools/CanvasTools";
import CanvasActions from "./CanvasActions/CanvasActions";
import Tool from "../../enums/tool.enum";
import Color from "../../enums/color.enum";
import Width from "../../enums/width.enum";
import Image from "../../models/image.model";
import AuthContext from "../../contexts/auth.context";
import ImageService from "../../services/image.service";
import Modal from "../Layout/Modal/Modal";

import "./Canvas.css";

const Canvas = () => {
    const { authUser } = useContext(AuthContext);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [selectedTool, setSelectedTool] = useState<Tool>(Tool.Pencil);
    const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
    const [drawedImage, setDrawedImage] = useState<ImageData | null>(null);
    const [isDrawing, setIsDrawing] = useState<boolean>(false);
    const [startX, setStartX] = useState<number>(0);
    const [startY, setStartY] = useState<number>(0);
    const [canvasWidth, setCanvasWidth] = useState<number>(window.innerWidth);
    const [canvasHeight, setCanvasHeight] = useState<number>(window.innerHeight - 40);
    const [isImageSuccessfulSaved, setIsImageSuccessfulSaved] = useState<boolean>(false);

    const handleMouseDown = (e: MouseEvent) => {
        handleStartDrawing(e.offsetX, e.offsetY);
    };

    const handleStartTouch = (e: TouchEvent) => {
        const canvas = canvasRef.current;
        if (!canvas)
            throw new Error("Canvas is not initialized.");

        handleStartDrawing(e.touches[0].pageX - canvas.offsetLeft, e.touches[0].pageY - canvas.offsetTop);
    };

    const handleStartDrawing = (x: number, y: number) => {
        setIsDrawing(true);
        setStartX(x);
        setStartY(y);
    };

    const handleMouseMove = (e: MouseEvent) => {
        handleMove(e.offsetX, e.offsetY);
    };

    const handleTouchMove = (e: TouchEvent) => {
        const canvas = canvasRef.current;
        if (!canvas)
            throw new Error("Canvas is not initialized.");

        handleMove(e.touches[0].pageX - canvas.offsetLeft, e.touches[0].pageY - canvas.offsetTop);
    };

    const handleMove = (x: number, y: number) => {
        if (!isDrawing)
            return;

        if (!context)
            throw new Error("Canvas context is null.");

        if (!canvasRef.current)
            throw new Error("Canvas is not initialized.");

        context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height - 40);
        restoreDrawedImage();

        switch (selectedTool) {
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
        handleEndDrawing();
    };

    const handleTouchEnd = () => {
        handleEndDrawing();
    };

    const handleEndDrawing = () => {
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

    const handleCanvasSave = async (title: string) => {
        const canvas = canvasRef.current;
        if (!canvas)
            throw new Error("Canvas is not initialized.");

        const image: Image = {
            title: title,
            data: canvasRef.current.toDataURL(),
            userEmail: authUser!.email,
            userName: authUser!.username,
            createdDate: Date().toString()
        };

        await ImageService.create(image);
        setIsImageSuccessfulSaved(true);
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

    const drawTriangle = (x: number, y: number) => {
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

        const x1 = startX;
        const y1 = startY;
        const x2 = x;
        const y2 = startY;
        const x3 = startX + (x - x1) / 8;
        const y3 = y;
        const x4 = x1 + (x - x1) / 2;
        const y4 = y1 - (y - y1) / 2;
        const x5 = x - (x - x1) / 8;
        const y5 = y;

        context.beginPath();
        context.lineTo(x1, y1);
        context.lineTo(x2, y2);
        context.lineTo(x3, y3);
        context.lineTo(x4, y4);
        context.lineTo(x5, y5);
        context.closePath();
        context.stroke();
    };

    const drawPolygon = (x: number, y: number) => {
        if (!context)
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

        context.beginPath();
        context.lineTo(x1, y1);
        context.lineTo(x2, y2);
        context.lineTo(x3, y3);
        context.lineTo(x4, y4);
        context.lineTo(x5, y5);
        context.lineTo(x6, y6);
        context.lineTo(x7, y7);
        context.lineTo(x8, y8);
        context.closePath();
        context.stroke();
    };

    const erase = (x: number, y: number) => {
        if (!context)
            throw new Error("Canvas context is not initialized.");

        const eraseSize = context.lineWidth * 10;
        context.clearRect(startX - eraseSize / 2, startY - eraseSize / 2, eraseSize, eraseSize);
        
        setStartX(x);
        setStartY(y);

        saveDrawedImage();
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

        canvas?.addEventListener("touchstart", handleStartTouch);
        canvas?.addEventListener("touchmove", handleTouchMove);
        canvas?.addEventListener("touchend", handleTouchEnd);

        setContext(canvasRef.current?.getContext("2d") ?? null);
        
        return () => {
            canvas?.removeEventListener("mousedown", handleMouseDown);
            canvas?.removeEventListener("mousemove", handleMouseMove);
            canvas?.removeEventListener("mouseup", handleMouseUp);

            canvas?.removeEventListener("touchstart", handleStartTouch);
            canvas?.removeEventListener("touchmove", handleTouchMove);
            canvas?.removeEventListener("touchend", handleTouchEnd);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [startX, startY, isDrawing]);

    return (
        <div className="canvas-wrapper">
            <CanvasActions 
                onCanvasColorSelected={handleCanvasColorSelect}
                onCanvasFillColorSelected={handleCanvasFillColorSelect}
                onCanvasLineWidthSelected={handleCanvasLineWidthSelect}
                onCanvasSave={(title) => handleCanvasSave(title)}
                onCanvasClear={handleCanvasClear} />
            <CanvasTools
                selectedTool={selectedTool}
                onToolClick={(tool) => setSelectedTool(tool)} />
            <canvas
                ref={canvasRef}
                width={canvasWidth}
                height={canvasHeight}
                style={{ width: canvasWidth, height: canvasHeight }}></canvas>
            <Modal
                title="Image saved"
                isOpen={isImageSuccessfulSaved}
                onClose={() => setIsImageSuccessfulSaved(false)}>
                <h4>Image was successful saved</h4>
            </Modal>
        </div>
    );
};

export default Canvas;

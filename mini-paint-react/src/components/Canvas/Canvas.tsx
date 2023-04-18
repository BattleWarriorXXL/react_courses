import React, { useEffect, useRef, useState, useContext } from "react";

import CanvasTools from "./CanvasTools/CanvasTools";
import CanvasActions from "./CanvasActions/CanvasActions";
import Tool from "../../enums/tool.enum";
import Color from "../../enums/color.enum";
import Width from "../../enums/width.enum";
import Image from "../../types/image.type";
import AuthContext from "../../contexts/auth.context";
import ImageService from "../../services/image.service";
import Modal from "../../shared/Modal/Modal";
import CanvasUtils from "../../utils/canvas.utils";

import "./Canvas.css";
import ToolsConfig from "../../configs/tools-config";

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
    const [canvasUtils, setCanvasUtils] = useState<CanvasUtils | null>(null);

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

        if (!canvasUtils)
            throw new Error("Canvas utils is not initialized.");

        context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height - 40);
        restoreDrawedImage();

        switch (selectedTool) {
        case Tool.Pencil:
            canvasUtils.drawLine(startX, startY, x, y);
            break;
        case Tool.Line:
            canvasUtils.drawStraightLine(startX, startY, x, y);
            break;
        case Tool.Circle:
            canvasUtils.drawCircle(startX, startY, x, y);
            break;
        case Tool.Triangle:
            canvasUtils.drawTriangle(startX, startY, x, y);
            break;
        case Tool.Square:
            canvasUtils.drawSquare(startX, startY, x, y);
            break;
        case Tool.Star:
            canvasUtils.drawStar(startX, startY, x, y);
            break;
        case Tool.Polygon:
            canvasUtils.drawPolygon(startX, startY, x, y);
            break;
        case Tool.Eraser:
            canvasUtils.erase(startX, startY, x, y);
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

        if (!authUser)
            throw new Error("Cannot find authenticated user.");

        const image: Image = {
            title: title,
            data: canvasRef.current.toDataURL(),
            userEmail: authUser.email,
            userName: authUser.username,
            createdDate: Date().toString()
        };

        await ImageService.create(image);
        setIsImageSuccessfulSaved(true);
    };

    const onWindowSizeChange = () => {
        setCanvasWidth(window.innerWidth);
        setCanvasHeight(window.innerHeight- 40);
    };

    useEffect(() => {
        window.addEventListener("resize", onWindowSizeChange);

        return () => {
            window.removeEventListener("resize", onWindowSizeChange);
        };
    }, [canvasWidth, canvasHeight]);

    useEffect(() => {
        const canvas = canvasRef.current;

        canvas?.addEventListener("mousedown", handleMouseDown);
        canvas?.addEventListener("mousemove", handleMouseMove);
        canvas?.addEventListener("mouseup", handleMouseUp);

        canvas?.addEventListener("touchstart", handleStartTouch);
        canvas?.addEventListener("touchmove", handleTouchMove);
        canvas?.addEventListener("touchend", handleTouchEnd);

        const currentContext = canvas?.getContext("2d") ?? null;
        setContext(currentContext);
        setCanvasUtils(new CanvasUtils({ context: currentContext, setStartX, setStartY, saveDrawedImage, isDrawing }));

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
                onToolClick={(tool) => setSelectedTool(tool)}
                tools={ToolsConfig}/>
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

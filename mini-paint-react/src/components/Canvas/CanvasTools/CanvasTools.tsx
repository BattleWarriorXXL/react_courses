import React from "react";
import { BsTriangle, BsSquare, BsStar, BsCircle, BsEraser } from "react-icons/bs";
import { FaSlash } from "react-icons/fa";
import { BiPolygon, BiPencil } from "react-icons/bi";

import Tool from "../../../enums/tool.enum";

import "./CanvasTools.css";

interface ICanvasToolsProps {
    selectedTool: Tool;
    onToolClick: (tool: Tool) => void;
}

const CanvasTools = (props: ICanvasToolsProps) => {
    return (
        <div className="canvas-tools">
            <BiPencil
                className={`canvas-tool ${props.selectedTool == Tool.Pencil ? "active" : ""}`}
                size={28}
                onClick={() => props.onToolClick(Tool.Pencil)} />
            <FaSlash
                className={`canvas-tool ${props.selectedTool == Tool.Line ? "active" : ""}`}
                size={24}
                onClick={() => props.onToolClick(Tool.Line)} />
            <BsCircle
                className={`canvas-tool ${props.selectedTool == Tool.Circle ? "active" : ""}`}
                size={28}
                onClick={() => props.onToolClick(Tool.Circle)} />
            <BsTriangle
                className={`canvas-tool ${props.selectedTool == Tool.Triangle ? "active" : ""}`}
                size={28}
                onClick={() => props.onToolClick(Tool.Triangle)} />
            <BsSquare
                className={`canvas-tool ${props.selectedTool == Tool.Square ? "active" : ""}`}
                size={28}
                onClick={() => props.onToolClick(Tool.Square)} />
            <BsStar
                className={`canvas-tool ${props.selectedTool == Tool.Star ? "active" : ""}`}
                size={28}
                onClick={() => props.onToolClick(Tool.Star)} />
            <BiPolygon
                className={`canvas-tool ${props.selectedTool == Tool.Polygon ? "active" : ""}`}
                size={32}
                onClick={() => props.onToolClick(Tool.Polygon)} />
            <BsEraser
                className={`canvas-tool ${props.selectedTool == Tool.Eraser ? "active" : ""}`}
                size={32}
                onClick={() => props.onToolClick(Tool.Eraser)} />
        </div>
    );
};

export default CanvasTools;

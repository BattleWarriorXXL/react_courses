import React from "react";

import Tool from "../../../enums/tool.enum";
import { ToolConfiguration } from "../../../configs/tools-config";

import "./CanvasTools.css";

interface ICanvasToolsProps {
    selectedTool: Tool;
    onToolClick: (tool: Tool) => void;
    tools: ToolConfiguration[];
}

const CanvasTools = (props: ICanvasToolsProps) => {
    return (
        <div className="canvas-tools">
            {props.tools.map((toolConfig) => 
                <div
                    key={toolConfig.tool}
                    className={`canvas-tool ${props.selectedTool == toolConfig.tool ? "active" : ""}`}
                    onClick={() => props.onToolClick(toolConfig.tool)}>
                    {toolConfig.component}
                </div>
            )}
        </div>
    );
};

export default CanvasTools;

import React from "react";
import { BsTriangle, BsSquare, BsStar, BsCircle, BsEraser } from "react-icons/bs";
import { FaSlash } from "react-icons/fa";
import { BiPolygon, BiPencil } from "react-icons/bi";

import Tool from "../enums/tool.enum";

export interface ToolConfiguration {
    tool: Tool;
    component: React.ReactNode;
}

const ToolsConfig: ToolConfiguration[] = [
    {
        tool: Tool.Pencil,
        component: <BiPencil size={28} />
    },
    {
        tool: Tool.Line,
        component: <FaSlash size={24} />
    },
    {
        tool: Tool.Circle,
        component: <BsCircle size={28} />
    },
    {
        tool: Tool.Triangle,
        component: <BsTriangle size={28} />
    },
    {
        tool: Tool.Square,
        component: <BsSquare size={28} />
    },
    {
        tool: Tool.Star,
        component: <BsStar size={28} />
    },
    {
        tool: Tool.Polygon,
        component: <BiPolygon size={32} />
    },
    {
        tool: Tool.Eraser,
        component: <BsEraser size={32} />
    }
];

export default ToolsConfig;

import React, { useMemo } from "react";

import Width from "../../../../enums/width.enum";

import "./CanvasLineWidthItem.css";

interface ICanvasLineWidthItemProps {
    width: Width;
    isSelected: boolean;
    onClick: () => void;
}

const CanvasLineWidthItem = (props: ICanvasLineWidthItemProps) => {
    const getLine = useMemo(() => {
        switch (props.width) {
        case Width.XSmall:
            return (<span>XS</span>);
        case Width.Small:
            return (<span>S</span>);
        case Width.Medium:
            return (<span>M</span>);
        case Width.Large:
            return (<span>L</span>);
        case Width.XLarge:
            return (<span>XL</span>);
        default:
            return (<span style={{fontWeight: 900}}>/</span>);
        }
        
    }, [props.width]);

    return (
        <div className={`canvas-line-width-item ${props.isSelected ? "active" : ""}`} onClick={props.onClick}>
            {getLine}
        </div>
    );
};

export default CanvasLineWidthItem;

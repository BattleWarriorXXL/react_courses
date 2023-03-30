import React from "react";

import "./MenuItem.css";

interface IMenuItemProps {
    title: string;
    path: string;
    icon?: React.ReactElement | null;
}

const MenuItem = (props: IMenuItemProps) => {
    return (
        <div className="menu-item">
            {props.icon}
            <span className="menu-item_title">{props.title}</span>
        </div>
    );
};

export default MenuItem;

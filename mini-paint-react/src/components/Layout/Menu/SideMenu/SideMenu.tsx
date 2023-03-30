import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MenuItem from "../MenuItem/MenuItem";

import "./SideMenu.css";

interface ISideMenuProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const SideMenu = (props: ISideMenuProps) => {
    const [selectedMenuItemIndex, setSelectedMenuItemIndex] = useState<number | null>(null);
    const navigate = useNavigate();

    const onMenuItemClick = (index: number, path: string) => {
        setSelectedMenuItemIndex(index);
        navigate(path);
    };

    return (
        <div className={`side-menu ${props.isOpen ? "open" : ""}`}>
            <div className="side-menu_container">
                {React.Children.map(props.children, (child, index) => {
                    if (React.isValidElement(child) && child.type === MenuItem) {
                        const isActive = selectedMenuItemIndex === index;

                        return (
                            <div className={`side-menu_menu-item ${isActive ? "active" : ""}`} onClick={() => onMenuItemClick(index, child.props["path"])}>
                                {child}
                            </div>
                        );
                    }

                    return null;
                })}
            </div>
        </div>
    );
};

export default SideMenu;

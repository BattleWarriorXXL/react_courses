import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import MenuItem, { IMenuItemProps } from "../MenuItem/MenuItem";

import "./SideMenu.css";

interface ISideMenuProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const SideMenu = (props: ISideMenuProps) => {
    const [selectedMenuItemIndex, setSelectedMenuItemIndex] = useState<number | null>(null);
    const sideMenuRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (sideMenuRef.current &&
                props.isOpen &&
                !sideMenuRef.current.contains(e.target as Node)) {
                props.onClose();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };

    });

    const onMenuItemClick = (index: number, path: string) => {
        setSelectedMenuItemIndex(index);
        navigate(path);
    };

    return (
        <div ref={sideMenuRef} className={`side-menu ${props.isOpen ? "open" : ""}`}>
            <div className="side-menu_container">
                {React.Children.map(props.children, (child, index) => {
                    if (React.isValidElement(child) && child.type === MenuItem) {
                        const isActive = selectedMenuItemIndex === index;
                        const menuItemProps = child.props as IMenuItemProps;
                        return (
                            <div
                                className={`side-menu_menu-item ${isActive ? "active" : ""}`}
                                onClick={() => onMenuItemClick(index, menuItemProps.path)}>
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

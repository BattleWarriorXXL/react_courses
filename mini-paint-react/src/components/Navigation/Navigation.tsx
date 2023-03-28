import React, { useState } from "react";

import "./Navigation.css";

interface INavigationProps {
    children: React.ReactNode;
}

const Navigation = (props: INavigationProps) => {
    const [selectedItem, setSelectedItem] = useState<number | null>(null);
    
    const handleClick = (index: number) => {
        setSelectedItem(index);
        console.log(index);
    };

    return (
        <div className="navigation-container">
            {React.Children.map(props.children, (child, index) => {
                const isSelected = selectedItem === index;
                return React.cloneElement(child as React.ReactElement, {
                    onClick: () => handleClick(index),
                    isSelected
                });
            })}
        </div>
    );
};

export default Navigation;

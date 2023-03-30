import React from "react";
import { AiOutlineMenuUnfold, AiOutlineMenuFold } from "react-icons/ai";

import "./Header.css";

interface IHeaderProps {
    isOpen: boolean;
    onToggleMenu: () => void;
}

const Header = (props: IHeaderProps) => {
    return (
        <div className="header-container">
            <div className="header_menu-container" onClick={props.onToggleMenu}>
                {!props.isOpen
                    ? (<AiOutlineMenuUnfold size={28} />)
                    : (<AiOutlineMenuFold color="#ffffff" size={28} />)
                }
            </div>
        </div>
    );
};

export default Header;

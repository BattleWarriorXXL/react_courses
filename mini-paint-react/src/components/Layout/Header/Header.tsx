import React, { useContext } from "react";
import { AiOutlineMenuUnfold, AiOutlineMenuFold } from "react-icons/ai";

import AuthContext from "../../../contexts/auth.context";
import Profile from "../../Auth/Profile/Profile";

import "./Header.css";

interface IHeaderProps {
    isOpen: boolean;
    onToggleMenu: () => void;
}

const Header = (props: IHeaderProps) => {
    const { isAuthenticated } = useContext(AuthContext);

    return (
        <div className="header-container">
            {isAuthenticated && (
                <div className="header_menu-container" onClick={props.onToggleMenu}>
                    {!props.isOpen
                        ? (<AiOutlineMenuUnfold size={28} />)
                        : (<AiOutlineMenuFold color="#02d8f9" size={28} />)
                    }
                </div>
            )}
            
            {isAuthenticated &&
                <Profile />
            }
        </div>
    );
};

export default Header;

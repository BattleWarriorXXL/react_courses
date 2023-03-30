import React from "react";

import "./Main.css";

interface IMainProps {
    children: React.ReactNode;
}

const Main = (props: IMainProps) => {
    return (
        <div className="main">
            {props.children}
        </div>
    );
};

export default Main;

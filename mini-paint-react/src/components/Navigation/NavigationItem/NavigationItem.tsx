import React from "react";

export interface INavigationItemProps {
    title: string;
    path: string;
    icon: React.ReactNode | null;
}

const NavigationItem = (props: INavigationItemProps) => {
    return (
        <div>
            {props.title} - {props.path}
        </div>
    );
};

export default NavigationItem;

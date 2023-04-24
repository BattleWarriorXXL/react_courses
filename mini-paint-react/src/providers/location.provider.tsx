import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import LocationService from "../services/location.service";

interface ILocationProviderProps {
    children: React.ReactNode;
}

const LocationProvider = ({ children }: ILocationProviderProps) => {
    const location = useLocation();

    useEffect(() => {
        LocationService.setLocation(location.pathname);           
    }, [location.pathname]);
    
    return (
        <>
            {children}
        </>
    );
};

export default LocationProvider;


const locationLocalStorageName = "lastLocation";

const getLastLocation = (): string => {
    return localStorage.getItem(locationLocalStorageName) ?? "/";
};

const setLocation = (location: string) => {
    localStorage.setItem(locationLocalStorageName, location);
};

const LocationService = {
    getLastLocation,
    setLocation
};

export default LocationService;

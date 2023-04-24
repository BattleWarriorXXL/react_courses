export const getMenuIndexByLocation = (location: string | undefined | null) => {
    switch (location) {
    case "/images":
        return 0;
    case "/canvas":
        return 1;
    case "/users":
        return 2;
    default:
        return 0;
    }
};

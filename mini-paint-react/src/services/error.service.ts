import { FirebaseError } from "firebase/app";

const handleError = (error: unknown) => {
    if (error instanceof FirebaseError) {
        switch (error.code) {
        case "auth/invalid-email":
            throw Error("Please enter a valid email address.");
        case "auth/user-not-found":
            throw Error("User with such email doesn't found.");
        case "auth/wrong-password":
            throw Error("Wrong password.");
        case "auth/too-many-requests":
            throw Error(
                "Access to this account has been temporarily disabled due to many failed login attempts. " +
                "You can immediately restore it by resetting your password or you can try again later.");
        case "auth/email-already-in-use":
            throw Error("This email is already in use.");
        case "auth/weak-password":
            throw Error("Password should be at least 6 characters.");
        default:
            throw Error("An error occurred. Please try again later.");
        }
    } else {
        throw Error("An error occurred. Please try again later.");
    }
};

const ErrorService = {
    handleError
};

export default ErrorService;

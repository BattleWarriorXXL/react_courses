import Firebase from "../firebase/firebase";
import User from "../models/user.model";
import UserService from "./user.service";

const signUp = async (email: string, password: string, name: string): Promise<User> => {
    const userCredential = await Firebase.createUserWithEmailAndPassword(Firebase.auth, email, password);
    await Firebase.updateProfile(userCredential.user, { displayName: name });

    const user = {
        uid: userCredential.user.uid,
        username: userCredential.user.displayName ?? "",
        email: userCredential.user.email ?? ""
    };

    await UserService.create(user);

    localStorage.setItem("user", JSON.stringify(user));

    return user;
};

const signIn = async (email: string, password: string): Promise<User> => {
    const userCredential = await Firebase.signInWithEmailAndPassword(Firebase.auth, email, password);

    const user = {
        uid: userCredential.user.uid,
        username: userCredential.user.displayName ?? "",
        email: userCredential.user.email ?? ""
    };
    
    localStorage.setItem("user", JSON.stringify(user));

    return user;
};

const signOut = async () => {
    await Firebase.auth.signOut();
    localStorage.removeItem("user");
};

const getCurrentUser = (): User | null => {
    const user = localStorage.getItem("user");
    if (!user)
        return null;

    return JSON.parse(user);
};

const AuthService = {
    signUp,
    signIn,
    signOut,
    getCurrentUser
};

export default AuthService;

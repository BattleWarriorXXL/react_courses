import Firebase from "../firebase/firebase";
import User from "../models/user.model";

const signUp = async (email: string, password: string, name: string): Promise<User> => {
    const userCredential = await Firebase.createUserWithEmailAndPassword(Firebase.auth, email, password);
    await Firebase.updateProfile(userCredential.user, { displayName: name });

    return {
        uid: userCredential.user.uid,
        username: userCredential.user.displayName ?? "",
        email: userCredential.user.email ?? ""
    };
};

const signIn = async (email: string, password: string): Promise<User> => {
    const userCredential = await Firebase.signInWithEmailAndPassword(Firebase.auth, email, password);

    return {
        uid: userCredential.user.uid,
        username: userCredential.user.displayName ?? "",
        email: userCredential.user.email ?? ""
    };
};

const signOut = async () => {
    await Firebase.auth.signOut();
};

const getCurrentUser = (): User | null => {
    const currentUser = Firebase.auth.currentUser;
    if (!currentUser)
        return null;

    return {
        uid: currentUser.uid,
        username: currentUser.displayName ?? "",
        email: currentUser.email ?? ""   
    };
};

const AuthService = {
    signUp,
    signIn,
    signOut,
    getCurrentUser
};

export default AuthService;

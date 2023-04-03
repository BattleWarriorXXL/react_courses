import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import Firebase from "../firebase/firebase";
import User from "../models/user.model";

const usersCollection = collection(Firebase.db, "users");
const usersRef = doc(usersCollection);

const create = async (user: User): Promise<void> => {
    await setDoc(usersRef, user);
};

const getAll = async (): Promise<User[]> => {
    const users: User[] = [];
    const snapshot = await getDocs(usersCollection);

    snapshot.forEach((userDoc) => {
        users.push(userDoc.data() as User);
    });

    return users;
};

const UserService = {
    create,
    getAll
};

export default UserService;

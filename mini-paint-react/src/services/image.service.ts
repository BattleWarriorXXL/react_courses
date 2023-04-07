import { collection, doc, getDocs, addDoc, setDoc, query, where } from "firebase/firestore";
import Firebase from "../firebase/firebase";

import Image from "../models/image.model";

const imagesCollection = collection(Firebase.db, "images");
const imagesRef = doc(imagesCollection);

const create = async (image: Image): Promise<void> => {
    await addDoc(imagesCollection, image);
};

const update = async (image: Image): Promise<void> => {
    await setDoc(imagesRef, image);
};

const getByUsername = async (username: string): Promise<Image[]> => {
    const images: Image[] = [];
    const q = query(imagesCollection, where("userName", ">=", username), where("userName", "<=", username + "\uf8ff"));

    const snapshot = await getDocs(q);
    snapshot.forEach((imageDoc) => {
        images.push(imageDoc.data() as Image);
    });

    return images;
};

const getAll = async (): Promise<Image[]> => {
    const images: Image[] = [];
    const snapshot = await getDocs(imagesCollection);

    snapshot.forEach((imageDoc) => {
        images.push(imageDoc.data() as Image);
    });

    return images;
};

const ImageService = {
    create,
    update,
    getByUsername,
    getAll
};

export default ImageService;

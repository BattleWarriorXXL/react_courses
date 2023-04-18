import { collection, doc, getDocs, addDoc, setDoc, query, where } from "firebase/firestore";
import Firebase from "../firebase/firebase";

import Image from "../types/image.type";

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
    const q = query(imagesCollection,
        where("userName", ">=", username),
        where("userName", "<=", username + "\uf8ff"));

    const snapshot = await getDocs(q);
    snapshot.forEach((imageDoc) => {
        const image = imageDoc.data() as Image;
        image.createdDate = Date.parse(image.createdDate.toString());
        images.push(image);
    });

    return images.sort((a, b) => a.createdDate < b.createdDate ? 1 : -1);
};

const getAll = async (): Promise<Image[]> => {
    const images: Image[] = [];
    const q = query(imagesCollection);
    const snapshot = await getDocs(q);

    snapshot.forEach((imageDoc) => {
        const image = imageDoc.data() as Image;
        image.createdDate = Date.parse(image.createdDate.toString());
        images.push(image);
    });

    return images.sort((a, b) => a.createdDate < b.createdDate ? 1 : -1);
};

const ImageService = {
    create,
    update,
    getByUsername,
    getAll
};

export default ImageService;

import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import Firebase from "../firebase/firebase";

import Image from "../models/image.model";

const imagesCollection = collection(Firebase.db, "images");
const imagesRef = doc(imagesCollection);

const create = async (image: Image): Promise<void> => {
    await setDoc(imagesRef, image);
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
    getAll
};

export default ImageService;

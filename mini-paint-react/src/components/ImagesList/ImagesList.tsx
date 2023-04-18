import React, { useEffect, useState } from "react";

import Table, { TableColumn } from "../../shared/Table/Table";
import Image from "../../types/image.type";
import ImageService from "../../services/image.service";
import ColumnType from "../../enums/column-type.enum";
import Modal from "../../shared/Modal/Modal";
import Input from "../../shared/Input/Input";

import "./ImagesList.css";

const ImagesList = () => {
    const [images, setImages] = useState<Image[] | null>(null);
    const [selectedImage, setSelectedImage] = useState<Image | null>(null);
    const [isImageOpen, setIsImageOpen] = useState<boolean>(false);
    const [usernameToFind, setUsernameToFind] = useState<string>("");

    const tableColumns: TableColumn<Image>[] = [
        {
            key: "title",
            title: "Title",
            type: ColumnType.String
        },
        {
            key: "data",
            title: "Image",
            type: ColumnType.Image
        },
        {
            key: "userName",
            title: "Created By",
            type: ColumnType.String
        },
        {
            key: "createdDate",
            title: "Created At",
            type: ColumnType.Date
        }
    ];

    const handleItemClick = (image: Image) => {
        setSelectedImage(image);
        setIsImageOpen(true);
    };

    useEffect(() => {
        const getUsers = async () => {
            if (!usernameToFind)
                setImages(await ImageService.getAll());
            else
                setImages(await ImageService.getByUsername(usernameToFind));
        };

        getUsers();
    }, [images?.length, usernameToFind]);

    return (
        <div className="images-list-wrapper">
            <Input
                label="User name"
                onValueChanged={setUsernameToFind}
                delay={300} />
            <Table
                title="Images"
                columns={tableColumns}
                items={images ?? []}
                onItemClick={(image) => handleItemClick(image)}
            />
            <Modal
                title={`Image of ${selectedImage?.userName}`}
                isOpen={isImageOpen}
                onClose={() => setIsImageOpen(false)}>
                <img src={`${selectedImage?.data}`} />
            </Modal>
        </div>
        
    );
};

export default ImagesList;

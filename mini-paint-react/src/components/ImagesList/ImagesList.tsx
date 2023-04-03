import React, { useEffect, useState } from "react";

import Table, { TableColumn } from "../Layout/Table/Table";
import Image from "../../models/image.model";
import ImageService from "../../services/image.service";
import "./ImagesList.css";

const ImagesList = () => {
    const [images, setImages] = useState<Image[] | null>(null);
    
    const tableColumns: TableColumn<Image>[] = [
        {
            key: "title",
            title: "Title"
        },
        {
            key: "createdDate",
            title: "Created Date"
        }
    ];

    useEffect(() => {
        const getUsers = async () => {
            setImages(await ImageService.getAll());
        };

        getUsers();
    });

    return (
        <Table
            title="Images"
            columns={tableColumns}
            items={images ?? []}
            onItemClick={(item) => console.log(item)}
        />
    );
};

export default ImagesList;

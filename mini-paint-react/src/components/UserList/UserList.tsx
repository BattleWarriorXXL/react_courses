import React, { useEffect, useState } from "react";

import User from "../../models/user.model";
import UserService from "../../services/user.service";
import Table, { TableColumn } from "../Layout/Table/Table";
import ColumnType from "../../enums/column-type.enum";

import "./UserList.css";

const UserList = () => {
    const [users, setUsers] = useState<User[] | null>(null);
    
    const tableColumns: TableColumn<User>[] = [
        {
            key: "username",
            title: "Name",
            type: ColumnType.String
        },
        {
            key: "email",
            title: "Email",
            type: ColumnType.String
        }
    ];

    useEffect(() => {
        const getUsers = async () => {
            setUsers(await UserService.getAll());
        };
        
        getUsers();
    }, [users?.length]);
    
    return (
        <Table
            title="Users"
            columns={tableColumns}
            items={users ?? []}
            onItemClick={(item) => console.log(item)} />
    );
};

export default UserList;

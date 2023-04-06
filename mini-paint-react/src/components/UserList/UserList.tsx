import React, { useEffect, useState } from "react";

import User from "../../models/user.model";
import UserService from "../../services/user.service";
import Table, { TableColumn } from "../Layout/Table/Table";

import "./UserList.css";

const UserList = () => {
    const [users, setUsers] = useState<User[] | null>(null);
    
    const tableColumns: TableColumn<User>[] = [
        {
            key: "username",
            title: "Name"
        },
        {
            key: "email",
            title: "Email"
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

import React from "react";

import "./Table.css";

export interface TableColumn<T> {
    key: keyof T;
    title: string;
}

interface ITableProps<T> {
    title: string;
    columns: TableColumn<T>[];
    items: T[]
    onItemClick: (item: T) => void;
}

function Table<T>(props: ITableProps<T>) {
    return (
        <div className="table">
            <h3 className="table_title">{props.title}</h3>
            <div className="table_header">
                {props.columns.map(column => (
                    <div key={column.key.toString()} className="table_header-item">
                        {column.title}
                    </div>
                ))}
            </div>
            <div className="table_body">
                {props.items.map((item, itemIndex) => (
                    <div key={`item_${itemIndex}`} className="table_row" onClick={() => props.onItemClick(item)}>
                        {props.columns.map((column, columnIndex) => (
                            <div key={`column_${columnIndex}`} className="table_row-item">
                                {(item[column.key] as string)}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Table;

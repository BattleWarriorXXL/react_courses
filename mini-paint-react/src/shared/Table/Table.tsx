import React from "react";

import ColumnType from "../../enums/column-type.enum";

import "./Table.css";

export interface TableColumn<T> {
    key: keyof T;
    title: string;
    type: ColumnType;
}

interface ITableProps<T> {
    title: string;
    columns: TableColumn<T>[];
    items: T[]
    onItemClick: (item: T) => void;
}

function Table<T>(props: ITableProps<T>) {
    const resolveColumnData = (column: TableColumn<T>, item: T) => {
        switch (column.type) {
        case ColumnType.String:
            return (item[column.key] as string);
        case ColumnType.Date:
            return (new Date(item[column.key] as string).toLocaleString());
        case ColumnType.Image:
            return (<img style={{maxHeight: 300}} src={`${item[column.key] as string}`} />);
        default:
            return (item[column.key] as string);
        }
    };

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
                                {resolveColumnData(column, item)}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Table;

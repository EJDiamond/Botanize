import React from "react";
import { Dropdown } from "react-bootstrap";
import styles from "../styles/OptionDropdown.module.css";

const MoreOptions = React.forwardRef(({ onClick }, ref) => (
    <i
        className="fa-solid fa-ellipsis-vertical"
        ref={ref}
        onClick={(e) => {
            e.preventDefault();
            onClick(e);
        }}
    />
));

export const OptionDropdown = ({handleEdit, handleDelete}) => {
    return (
        <Dropdown className="ml-auto" drop="left">
            <Dropdown.Toggle as={MoreOptions} />
            <Dropdown.Menu
                className={`${styles.Dropdown} text-center`}
                popperConfig={{ strategy: "fixed" }}
            >
                <Dropdown.Item
                    className={styles.DropdownItem}
                    onClick={handleEdit}
                    aria-label="edit"
                >
                    <i className="fa-solid fa-pen"></i>
                </Dropdown.Item>
                <Dropdown.Item
                    className={styles.DropdownItem}
                    onClick={handleDelete}
                    aria-label="delete"
                >
                    <i className="fa-regular fa-trash-can"></i>
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}


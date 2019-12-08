import React from "react";
import styles from "./header.module.css";
import { SORTING_TYPES } from "../constants";


export default ({  activeTab, onActiveTabChange  }) => (
    <div className={styles.header}>
        <h1 className={styles.heading}>
            Discover
        </h1>
        <ul>
            {Object.values(SORTING_TYPES).map(sortingType => <li className={activeTab === sortingType ? styles.active : ""} key={sortingType}>
                <a href="javascript:void(0)" onClick={() => onActiveTabChange(sortingType)}>
                    {sortingType.replace("_", " ")}
                </a>
            </li>)}
        </ul>
        <section>
            Search
        </section>
    </div>
);

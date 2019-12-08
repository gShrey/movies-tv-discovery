import React from "react";
import styles from "./filter-section.module.css";
import GenreListStore from "../stores/genres";
import { observer, useLocalStore } from "mobx-react-lite";
import { TYPE_TV, TYPE_MOVIE } from "../constants";

const setQueryParams = (query, newParams) => {
    return Object.assign({}, query, newParams);
};

const generateOptionsTagForMap = (optionsMap) => {
    return Object.keys(optionsMap).map(optionKey =>{
        return (
            <option value={optionKey}>
                {optionsMap[optionKey]}
            </option>
        );
    });
};

const generateYearOptions = () => {
    const years = {};
    const maxYear = (new Date()).getFullYear();
    for(let  i = 2005;i <= maxYear; i++ ) {
        years[i] = i;
    }
    return generateOptionsTagForMap(years);
};

export default observer(({ query, onQueryChange, sortType }) => {
    const genresStore = useLocalStore(() => GenreListStore);
    const genresList = genresStore.getGenresFor(query.type);
    if(!genresStore.loaded) {
        return <div />
    }
    return (
        <section className={styles.filterSection}>
            <h3 className={styles.heading}>
                Discover Options
            </h3>
            <form className={styles.form}>
                <div className={styles.input}>
                    <label for="movies-type">
                        Type
                    </label>
                    <select className={styles.selectBox} value={query.type} onChange={(e) => {
                        onQueryChange(setQueryParams( query, { type: e.target.value } ));
                    }}>
                        <option value={TYPE_MOVIE}>
                            Movies
                        </option>
                        <option value={TYPE_TV}>
                            TV Series
                        </option>
                    </select>
                </div>
                <div className={styles.input}>
                    <label for="movies-type">
                        Genre
                    </label>
                    <select className={styles.selectBox}  value={query.withGenres} onChange={(e) => {
                        onQueryChange(setQueryParams( query, { withGenres: e.target.value } ));
                    }}>
                        <option>-Select-</option>
                        {generateOptionsTagForMap(genresList)}
                    </select>
                </div>
                <div className={[ styles.yearSelectorInput ]}>
                    <div className={styles.input}>
                        <label for="movies-type">
                            Start
                        </label>
                        <select>
                            <option>-Select-</option>
                            {generateYearOptions()}
                        </select>
                    </div>
                    <div className={styles.sperator}>

                    </div>
                    <div className={styles.input}>
                        <label for="movies-type">
                            End
                        </label>
                        <select>
                            <option>-Select-</option>
                            {generateYearOptions()}
                        </select>
                    </div>
                </div>
            </form>
        </section>
    );
});
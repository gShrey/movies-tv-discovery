import React from "react";
import PropTypes from "prop-types";
import styles from "./movie-tile.module.css";

export const MovieTile = ({ title, posterUrl, genre, year }) => (
    <div className={styles.tile}>
        <figure className={styles.poster} title={title}>
            <img title={title} src={posterUrl} alt={`Image for ${title}`} className={styles.poster} />
        </figure>
        <h3 className={styles.title} title={title}>
            {title}
        </h3>
        <div className={styles.detail}>
            {genre}, {year}
        </div>
    </div>
);

MovieTile.propTypes = {
    title: PropTypes.string.isRequired,
    posterUrl: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    year: PropTypes.string.isRequired
};

export default MovieTile;


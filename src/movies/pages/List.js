import React from "react";
import { Col, Row } from "react-grid-system";
import withMovieLoader from "../hoc/withMovieLoader";
import styles from "./discover.module.css";
import MovieTile from "../components/MovieTile";

export default withMovieLoader(({ list }) => (
    <Row className={styles.gridSection}>
        {list.map(({ title, geners, posterUrl, year}) => <Col className={styles.moveTileCol} xl={3}>
            <MovieTile  title={title} posterUrl={posterUrl} genre={geners} year={year} />
        </Col>)}
    </Row>
));


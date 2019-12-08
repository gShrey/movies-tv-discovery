import React from "react";
import { Col, Row } from "react-grid-system";
import styles from "./discover.module.css";
import List from "./List";
import FilterSection from "../components/FilterSection";
import Header from "../components/Header";
import { SORTING_TYPES, TYPE_TV, TYPE_MOVIE } from "../constants";


export default () => {
    const [ activeTab, setActiveTab] = React.useState(SORTING_TYPES.POPULAR);
    const [ filterQuery, setFilterQuery ] = React.useState({ type: TYPE_MOVIE });
    const [ type, setType ] = React.useState(TYPE_MOVIE);
    return (
        <Row className={styles.page}>
            <Col className={styles.gridContainer} xl={9}>
                <Row>
                    <Col xl={12}>
                        <Header activeTab={activeTab} onActiveTabChange={setActiveTab}  />
                    </Col>
                </Row>
                {Object.values(SORTING_TYPES).map(sortingType => <List key={`${type}_${sortingType}`} filterQuery={filterQuery} sortingType={sortingType} isActive={sortingType === activeTab}  />)}
            </Col>
            <Col xl={3}>
                <Row style={{ height: "100%" }}>
                    <FilterSection query={filterQuery}  onQueryChange={(query) =>{
                        setType(query.type);
                        setFilterQuery(query);
                    }} />
                </Row>
            </Col>
        </Row>
    );
};
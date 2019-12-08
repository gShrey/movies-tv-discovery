import React from 'react';
import { Container, Row, Col } from 'react-grid-system';
import MoviePage from "movies/pages/Discover";
import configurationStore from "configuration/stores/config";
import './App.css';
import "./index.css";

function App() {
  React.useEffect(() => {
    configurationStore.loadConfiguration();
  }, []);
  return (
    <Container className="app" fluid>
        <MoviePage />
    </Container>
  );
}

export default App;

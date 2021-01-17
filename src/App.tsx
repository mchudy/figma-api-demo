import React, { useEffect } from 'react';
import styled from 'styled-components';
import './App.css';
import { loadStylesFromFigma } from './figma';

function App() {
  useEffect(() => {
    loadStylesFromFigma();
  }, []);

  return <div className="App"></div>;
}

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

export default App;

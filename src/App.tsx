import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { loadStylesFromFigma } from './figma';
import Loader from './Loader';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadStylesFromFigma().then(() => setIsLoading(false));
  }, []);

  return (
    <Container>
      {isLoading && <Loader />}
      {!isLoading && <div>Loaded</div>}
    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default App;

import React, { useEffect, useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { loadColorsFromFigma } from './figma';
import Loader from './Loader';
import photo from './assets/images/photo.png';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [colors, setColors] = useState<Record<string, string>>();

  useEffect(() => {
    const loadColors = async () => {
      const colors = await loadColorsFromFigma();
      setColors(colors);
      setIsLoading(false);
    };

    loadColors();
  }, []);

  console.log(colors);

  return (
    <Container>
      {isLoading && <Loader />}
      {!isLoading && (
        <ThemeProvider theme={{ colors }}>
          <CardContainer>
            <Card>
              <Content>
                <LeftContent>
                  <div>
                    <Header>Summer Sale</Header>
                    <Description>
                      25% Off Now through sunday for all in-store purchases.
                    </Description>
                  </div>
                  <Button>Shop Now</Button>
                </LeftContent>
                <img src={photo} alt="Olive leaves" />
              </Content>
            </Card>
          </CardContainer>
        </ThemeProvider>
      )}
    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #eeeeee;
`;

const CardContainer = styled.div`
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
`;

const Card = styled.div`
  background: #ffffff;
  border-radius: 32px;
  padding: 64px;
  filter: drop-shadow(0px 8px 16px rgba(17, 17, 17, 0.04));
  max-width: 840px;
`;

const Content = styled.div`
  display: flex;
`;

const LeftContent = styled.div`
  padding-right: 90px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Header = styled.div`
  font-size: 48px;
  letter-spacing: 1px;
  font-weight: 700;
  line-height: 50px;
  margin-bottom: 20px;
  color: ${(props) => props.theme.colors['Grayscale / Title-Active']};
`;

const Description = styled.div`
  font-size: 24px;
  line-height: 38px;
  letter-spacing: 0.75px;
  color: ${(props) => props.theme.colors['Grayscale / Title-Active']};
`;

const Button = styled.button`
  border-radius: 40px;
  border-width: 0;
  width: 160px;
  height: 64px;
  font-size: 16px;
  background-color: ${(props) => props.theme.colors['Primary/Default']};
  color: #fff;
  font-weight: 600;
  letter-spacing: 0.75px;
`;

export default App;

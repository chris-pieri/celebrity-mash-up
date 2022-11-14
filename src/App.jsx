import { useEffect, useState } from 'react';
import './App.css';
import styled, { ThemeProvider } from 'styled-components';
import { DARK_THEME, LIGHT_THEME } from './themes/Themes';
import GlobalStyles from './themes/GlobalStyles';
import Game from './Components/Game';
import TitleLogo from './assets/TitleLogo';
import EmojiButton from './Components/UI/EmojiButton';
import Wiggle from './Components/UI/Wiggle';

const CURRENT_THEME_LS = 'current_theme';

function App() {
  const getInitialTheme = () => {
    const localStorageTheme = localStorage.getItem(CURRENT_THEME_LS);
    return localStorageTheme ? JSON.parse(localStorageTheme) : DARK_THEME;
  };
  const [currentTheme, setCurrentTheme] = useState(getInitialTheme);

  const toggleThemeHandler = () => {
    setCurrentTheme((prevTheme) => (prevTheme.type === 'dark' ? LIGHT_THEME : DARK_THEME));
  };

  useEffect(() => {
    localStorage.setItem(CURRENT_THEME_LS, JSON.stringify(currentTheme));
  }, [currentTheme]);

  return (
    <ThemeProvider theme={currentTheme}>
      <GlobalStyles />
      <TitleWrapper>
        <TitleLogo />
        <Wiggle id="toggle-btn" rotation={45}>
          <EmojiButton onClick={toggleThemeHandler}>{currentTheme.type === 'dark' ? `🌙` : `☀️`}</EmojiButton>
        </Wiggle>
      </TitleWrapper>
      <Game />
    </ThemeProvider>
  );
}

export default App;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding-bottom: 1.5rem;
  width: 100%;
`;

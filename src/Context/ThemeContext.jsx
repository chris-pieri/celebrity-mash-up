import { createContext, useState, useEffect, useContext } from 'react';
import { DARK_THEME, LIGHT_THEME } from '../Themes/Themes';
import useSound from 'use-sound';
import lightOnMP3 from '../assets/light_on.mp3';
import lightOffMP3 from '../assets/light_off.mp3';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from '../Themes/GlobalStyles';
import VolumeContext from './VolumeContext';

const ThemeContext = createContext({
  theme: DARK_THEME,
  toggleTheme: () => {},
});

export default ThemeContext;

const CURRENT_THEME_LS = 'current_theme';

export function ThemeContextProvider({ children }) {
  const { isVolumeOn, volume } = useContext(VolumeContext);
  const getInitialTheme = () => {
    const localStorageTheme = localStorage.getItem(CURRENT_THEME_LS);
    return localStorageTheme ? JSON.parse(localStorageTheme) : DARK_THEME;
  };
  const [theme, setTheme] = useState(getInitialTheme);

  const [lightOnSound] = useSound(lightOnMP3, { soundEnabled: isVolumeOn, volume });
  const [lightOffSound] = useSound(lightOffMP3, { soundEnabled: isVolumeOn, volume });

  const toggleThemeHandler = () => {
    setTheme((prevTheme) => {
      if (prevTheme.type === 'dark') {
        lightOnSound();
        return LIGHT_THEME;
      }
      lightOffSound();
      return DARK_THEME;
    });
  };

  useEffect(() => {
    localStorage.setItem(CURRENT_THEME_LS, JSON.stringify(theme));
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme: toggleThemeHandler }}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

ThemeContextProvider.propTypes = {
  children: PropTypes.node,
};

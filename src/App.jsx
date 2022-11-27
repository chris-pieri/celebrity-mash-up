import { useContext } from 'react';
import styled from 'styled-components';
import Game from './Components/Game';
import TitleLogo from './assets/TitleLogo';
import UnstyledButton from './Components/UI/UnstyledButton';
import { ReactComponent as DarkMode } from './assets/dark_mode.svg';
import { ReactComponent as LightMode } from './assets/light_mode.svg';
import { ReactComponent as VolumeOn } from './assets/volume_on.svg';
import { ReactComponent as VolumeOff } from './assets/volume_off.svg';
import Icon from './Components/UI/Icon';
import Wiggle from './Components/Animations/Wiggle';
import VolumeContext from './Context/VolumeContext';
import ThemeContext from './Context/ThemeContext';

function App() {
  const volumeContext = useContext(VolumeContext);
  const themeContext = useContext(ThemeContext);

  return (
    <>
      <TitleWrapper>
        <TitleLogo />
        <PrefenceIcons>
          <Wiggle rotation={-30}>
            <UnstyledButton onClick={volumeContext.toggleVolumeOn}>
              <Icon>{volumeContext.isVolumeOn ? <VolumeOn /> : <VolumeOff />}</Icon>
            </UnstyledButton>
          </Wiggle>
          <Wiggle rotation={-30}>
            <UnstyledButton onClick={themeContext.toggleTheme}>
              <Icon>{themeContext.theme.type === 'dark' ? <DarkMode /> : <LightMode />}</Icon>
            </UnstyledButton>
          </Wiggle>
        </PrefenceIcons>
      </TitleWrapper>
      <Game />
    </>
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

const PrefenceIcons = styled.div`
  display: flex;
  gap: 2px;
`;

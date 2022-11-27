import FadeUp from './Animations/FadeUp';
import complete from '../assets/complete.png';
import styled from 'styled-components';
import useSound from 'use-sound';
import completeMP3 from '../assets/complete.mp3';
import VolumeContext from '../Context/VolumeContext';
import { useContext, useEffect, useState } from 'react';

export default function Gameover() {
  const volumeContext = useContext(VolumeContext);

  const [hasSoundPlayed, setHasSoundPlayed] = useState(false);
  const [completeSound] = useSound(completeMP3, { soundEnabled: volumeContext.isVolumeOn });

  useEffect(() => {
    let timer;
    if (!hasSoundPlayed) {
      timer = setTimeout(() => {
        setHasSoundPlayed(true);
        completeSound();
      }, 2500);
    }

    return () => clearTimeout(timer);
  }, [completeSound]);

  return (
    <Container>
      <FadeUp delay={2.5}>
        <Img src={complete} alt="complete" />
      </FadeUp>
      <FadeUp delay={4.5}>
        <p>Thanks for playing! Come back soon for more face swaps.</p>
      </FadeUp>
      <FadeUp delay={5.5}>
        <p>Please share with your friends.</p>
      </FadeUp>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Img = styled.img`
  @media (max-width: 480px) {
    width: 350px;
  }
`;

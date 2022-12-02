import FadeUp from './Animations/FadeUp';
import styled from 'styled-components';
import Trophy from './Trophy';
import TextBubble from './UI/TextBubble';
import VolumeContext from '../Context/VolumeContext';
import useSound from 'use-sound';
import CompletedMP3 from '../assets/completed.mp3';
import { useContext, useEffect } from 'react';

const TROPHY_DIALOG = [
  'Congratulations you answered all the face swaps!',
  "Come back later and I'll have more waiting for you.",
  'Be sure to share this game with your friends.',
];

export default function Gameover() {
  const { isVolumeOn, volume } = useContext(VolumeContext);
  const [completedSound, soundOptions] = useSound(CompletedMP3, { soundEnabled: isVolumeOn, volume });

  useEffect(() => {
    completedSound();
  }, [soundOptions.duration]);

  return (
    <Container>
      <FadeUp y={50}>
        <Trophy />
      </FadeUp>
      <FadeUp y={20}>
        <TextBubble dialog={TROPHY_DIALOG}></TextBubble>
      </FadeUp>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

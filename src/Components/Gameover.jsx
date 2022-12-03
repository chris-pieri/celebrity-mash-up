import FadeUp from './Animations/FadeUp';
import styled from 'styled-components';
import Trophy from './Trophy';
import TextBubble from './UI/TextBubble';
import VolumeContext from '../Context/VolumeContext';
import useSound from 'use-sound';
import CompletedMP3 from '../assets/completed.mp3';
import { useContext, useEffect } from 'react';
import Button from './UI/Button';

const TROPHY_DIALOG = [
  'Congratulations you answered all the face swaps!',
  "Come back later and I'll have more waiting for you.",
  `Don't forget to share this game with your friends!`,
];

const SHARE_DATA = {
  title: 'Faceeswap',
  text: 'Can you guess these face swaps?',
  url: 'https://faceeswap.com',
};

export default function Gameover() {
  const { isVolumeOn, volume } = useContext(VolumeContext);
  const [completedSound, soundOptions] = useSound(CompletedMP3, { soundEnabled: isVolumeOn, volume });

  const shareHandler = (e) => {
    navigator.share(SHARE_DATA);
    e.stopPropagation();
  };

  useEffect(() => {
    completedSound();
  }, [soundOptions.duration]);

  return (
    <Container>
      <FadeUp y={50}>
        <Trophy />
      </FadeUp>
      <FadeUp y={20}>
        <TextBubble dialog={TROPHY_DIALOG} />
      </FadeUp>
      {navigator.canShare && (
        <FadeUp y={20} delay={1}>
          <ShareButton onClick={shareHandler}>Share</ShareButton>
        </FadeUp>
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const ShareButton = styled(Button)`
  margin: 0 auto;
  margin-top: 1rem;
`;

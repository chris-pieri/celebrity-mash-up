import SmilingTrophy from '../assets/smiling_trophy.svg';
import BlinkingTrophy from '../assets/blinking_trophy.svg';
import HurtTrophy from '../assets/hurt_trophy.svg';
import AngryTrophy from '../assets/angry_trophy.svg';
import ConfettiBackground from '../assets/confetti-background.webp';
import Float from './Animations/Float';
import styled from 'styled-components';
import { useReducer, useEffect, useContext } from 'react';
import VolumeContext from '../Context/VolumeContext';
import useSound from 'use-sound';
import OofMP3 from '../assets/oof.mp3';
import { motion } from 'framer-motion';

const TROPHY_EXPRESSIONS = {
  SMILING: 'smiling',
  BLINKING: 'blinking',
  ANGRY: 'angry',
  HURT: 'hurt',
};

const TROPHY_IMAGES = {
  [TROPHY_EXPRESSIONS.SMILING]: SmilingTrophy,
  [TROPHY_EXPRESSIONS.BLINKING]: BlinkingTrophy,
  [TROPHY_EXPRESSIONS.ANGRY]: AngryTrophy,
  [TROPHY_EXPRESSIONS.HURT]: HurtTrophy,
};

const trophyReducer = (state, action) => {
  if (action.type === 'BLINK') {
    if ([TROPHY_EXPRESSIONS.HURT, TROPHY_EXPRESSIONS.ANGRY].includes(state.expression)) {
      return state;
    }
    const expression = TROPHY_EXPRESSIONS.BLINKING;
    return { expression, image: TROPHY_IMAGES[expression] };
  }
  if (action.type === 'RESET_BLINK') {
    if ([TROPHY_EXPRESSIONS.HURT, TROPHY_EXPRESSIONS.ANGRY].includes(state.expression)) {
      return state;
    }
    const expression = TROPHY_EXPRESSIONS.SMILING;
    return { expression, image: TROPHY_IMAGES[expression] };
  }
  if (action.type === 'HURT') {
    const expression = TROPHY_EXPRESSIONS.HURT;
    return { expression, image: TROPHY_IMAGES[expression] };
  }
  if (action.type === 'ANGRY') {
    const expression = TROPHY_EXPRESSIONS.ANGRY;
    return { expression, image: TROPHY_IMAGES[expression] };
  }
  if (action.type === 'RESET_ANGRY') {
    if (state.expression === TROPHY_EXPRESSIONS.HURT) {
      return state;
    }
    const expression = TROPHY_EXPRESSIONS.SMILING;
    return { expression, image: TROPHY_IMAGES[expression] };
  }
};

let angryTimeout;

export default function Trophy() {
  const { isVolumeOn, volume } = useContext(VolumeContext);

  const [oofSound] = useSound(OofMP3, {
    soundEnabled: isVolumeOn,
    volume: volume - 0.1,
    interrupt: true,
    playbackRate: 1.1,
  });

  const [trophy, dispatchTrophy] = useReducer(trophyReducer, {
    expression: TROPHY_EXPRESSIONS.SMILING,
    image: TROPHY_IMAGES[TROPHY_EXPRESSIONS.SMILING],
  });

  useEffect(() => {
    const interval = setInterval(() => {
      dispatchTrophy({ type: 'BLINK' });
      setTimeout(() => dispatchTrophy({ type: 'RESET_BLINK' }), 200);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const mouseDownHandler = () => {
    oofSound();
    dispatchTrophy({ type: 'HURT' });
  };

  const mouseUpHandler = () => {
    dispatchTrophy({ type: 'ANGRY' });
    clearTimeout(angryTimeout);
    angryTimeout = setTimeout(() => {
      dispatchTrophy({ type: 'RESET_ANGRY' });
    }, 1000);
  };

  return (
    <Container>
      <Float>
        <Img
          src={trophy.image}
          alt="trophy"
          onTouchStart={(e) => {
            e.preventDefault();
            mouseDownHandler();
          }}
          onTouchEnd={(e) => {
            e.preventDefault();
            mouseUpHandler();
          }}
          onMouseDown={mouseDownHandler}
          onMouseUp={mouseUpHandler}
          whileTap={{ scale: 0.95 }}
        />
      </Float>
    </Container>
  );
}

const Container = styled.div`
  background-image: url(${ConfettiBackground});
  background-size: cover;
`;

const Img = styled(motion.img)`
  z-index: 2;
  cursor: pointer;
  height: 250px;
  @media (max-width: 480px) {
    height: 250px;
  }
`;

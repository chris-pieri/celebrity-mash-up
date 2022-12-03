import styled from 'styled-components';
import PropTypes from 'prop-types';
import Typewriter from 'typewriter-effect';
import { useState, useContext } from 'react';
import { ReactComponent as Click } from '../../assets/click.svg';
import Icon from './Icon';
import VolumeContext from '../../Context/VolumeContext';
import useSound from 'use-sound';
import BlopMP3 from '../../assets/blop.mp3';
import { motion } from 'framer-motion';

const SPRITE_MAP = {
  boop: [0, 55],
  bop: [55, 130],
};

export default function TextBubble({ dialog }) {
  const { isVolumeOn, volume } = useContext(VolumeContext);
  const [blopSound] = useSound(BlopMP3, { soundEnabled: isVolumeOn, volume, sprite: SPRITE_MAP });
  const [dialogIndex, setDialogIndex] = useState(0);
  const [messageTyped, setMessageTyped] = useState(false);
  const nextHandler = () => {
    if (!messageTyped) return null;
    setDialogIndex((prevState) => prevState + 1);
    setMessageTyped(false);
    blopSound({ id: 'bop' });
  };
  const mouseUpHandler = () => {
    if (!messageTyped) return null;
    blopSound({ id: 'boop' });
  };

  return (
    <Bubble
      onMouseDown={mouseUpHandler}
      onMouseUp={nextHandler}
      onTouchStart={(e) => {
        e.preventDefault();
        mouseUpHandler();
      }}
      onTouchEnd={(e) => {
        e.preventDefault();
        nextHandler();
      }}
      whileTap={{ scale: messageTyped ? 0.9 : 1 }}
    >
      {dialog.map((text, index) => {
        return (
          index === dialogIndex && (
            <Typewriter
              key={text}
              onInit={(typewriter) => {
                typewriter
                  .changeDelay(15)
                  .typeString(text)
                  .callFunction(() => {
                    setMessageTyped(dialogIndex < dialog.length - 1);
                  })
                  .start();
              }}
            />
          )
        );
      })}
      {messageTyped && (
        <ClickIcon>
          <Click />
        </ClickIcon>
      )}
    </Bubble>
  );
}

TextBubble.propTypes = {
  dialog: PropTypes.array,
};

const Bubble = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  background-color: ${({ theme }) => theme.background.main};
  min-height: 60px;
  margin-top: -5px;
  z-index: 2;
  border-radius: 20px;
  padding: 1rem 1.5rem;
  font-weight: bold;
  color: ${({ theme }) => theme.text.main};
  text-align: left;
  cursor: pointer;

  &:before {
    position: absolute;
    top: -10px;
    left: -15px;
    content: 'Hector';
    background-color: ${({ theme }) => theme.primary.main};
    padding: 2px 20px;
    color: white;
    border-radius: 20px;
    font-weight: bold;
    transform: rotate(-5deg);
  }

  .Typewriter__cursor {
    display: none;
  }
`;

const ClickIcon = styled(Icon)`
  position: absolute;
  top: 60%;
  left: 85%;
`;

import styled from 'styled-components';
import PropTypes from 'prop-types';
import Typewriter from 'typewriter-effect';
import { useState } from 'react';
import { ReactComponent as Click } from '../../assets/click.svg';
import Icon from './Icon';

export default function TextBubble({ dialog }) {
  const [dialogIndex, setDialogIndex] = useState(0);
  const [messageTyped, setMessageTyped] = useState(false);
  const nextHandler = () => {
    if (!messageTyped) return null;
    setDialogIndex((prevState) => prevState + 1);
    setMessageTyped(false);
  };

  return (
    <Bubble onClick={nextHandler}>
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

const Bubble = styled.div`
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

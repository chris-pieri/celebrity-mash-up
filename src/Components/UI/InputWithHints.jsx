import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useEffect, useState, useRef } from 'react';
import Input from './Input';
import Button from './Button';
import ButtonBounce from '../Animations/ButtonBounce';
import SlideDown from '../Animations/SlideDown';
import Typewriter from 'typewriter-effect/dist/core';
import { padString } from '../../Utils/Strings';
import { shuffle } from '../../Utils/Arrays';

const MAX_FILTRED_OPTIONS = 3;
const REQUIRED_OPTION_LENGTH = 25;

export default function InputWithHints({ options, value, onChange }) {
  const inputRef = useRef();
  const [filteredOptions, setFilteredOptions] = useState([]);

  const changeHandler = (e) => {
    onChange(e.target.value);
  };

  const hintClickHandler = (hint) => {
    onChange(hint);
    inputRef.current.focus();
  };

  const customNodeCreator = function (character) {
    inputRef.current.placeholder = inputRef.current.placeholder + character;
    // Return null to skip internal adding of dom node
    return null;
  };

  const onRemoveNode = function () {
    if (inputRef.current.placeholder) {
      inputRef.current.placeholder = inputRef.current.placeholder.slice(0, -1);
    }
  };

  useEffect(() => {
    const shuffledOptions = ['Who could it be??', ...shuffle(options)];
    const paddedOptions = shuffledOptions.map((option) => padString(option, REQUIRED_OPTION_LENGTH));
    let typeWriter = new Typewriter(null, {
      strings: paddedOptions,
      delay: 60,
      loop: true,
      autoStart: true,
      onCreateTextNode: customNodeCreator,
      onRemoveNode: onRemoveNode,
    });

    return () => {
      typeWriter.stop();
      typeWriter = undefined;
    };
  }, []);

  useEffect(() => {
    if (value.length === 0) {
      return setFilteredOptions([]);
    }

    if (options.includes(value)) {
      return setFilteredOptions([]);
    }

    const allFilteredOptions = options.filter((option) => option.toLowerCase().includes(value.toLowerCase()));
    setFilteredOptions(allFilteredOptions.slice(0, MAX_FILTRED_OPTIONS));
  }, [value]);

  return (
    <Container>
      <Input type="text" ref={inputRef} value={value} onChange={changeHandler} />
      <HintContainer show={filteredOptions.length}>
        {filteredOptions.map((option, index) => (
          <Hint value={option} key={option} onClick={hintClickHandler} index={index} />
        ))}
      </HintContainer>
    </Container>
  );
}

InputWithHints.propTypes = {
  options: PropTypes.array,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

const Hint = ({ value, onClick, index }) => {
  const clickHandler = () => {
    onClick(value);
  };
  return (
    <SlideDown delay={index * 0.05}>
      <ButtonBounce>
        <HintButton type="button" onClick={clickHandler}>
          {value}
        </HintButton>
      </ButtonBounce>
    </SlideDown>
  );
};

Hint.propTypes = {
  value: PropTypes.string,
  onClick: PropTypes.func,
  index: PropTypes.number,
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

const HintContainer = styled.div`
  display: flex;
  gap: 4px;
  height: ${({ show }) => (show ? 27.5 : 0)}px;
  transition: height 200ms ease;
`;

const HintButton = styled(Button)`
  font-size: 10px;
  white-space: nowrap;
`;

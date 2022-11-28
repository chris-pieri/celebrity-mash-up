import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useEffect, useState, useRef } from 'react';
import Input from './Input';
import Button from './Button';
import ButtonBounce from '../Animations/ButtonBounce';
import SlideDown from '../Animations/SlideDown';

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

const MAX_FILTRED_OPTIONS = 3;

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
      <Input type="text" ref={inputRef} value={value} onChange={changeHandler} placeholder="Who could it be?" />
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

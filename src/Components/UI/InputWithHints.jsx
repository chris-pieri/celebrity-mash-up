import styled, { keyframes } from 'styled-components';
import PropTypes from 'prop-types';
import { useEffect, useState, useRef } from 'react';
import Input from './Input';
import Button from './Button';

const HintButtonEnter = keyframes`
    from {
        transform: translateY(-100%);
        opacity: 0;
    }
    to {
        transform: translateY(0);
        opacity: 1;
    }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

const HintContainer = styled.div`
  display: flex;
  gap: 4px;
`;

const HintButton = styled(Button)`
  opacity: 0;
  font-size: 10px;
  animation: ${HintButtonEnter} 0.3s ease forwards;
  animation-delay: ${({ index }) => `${index * 100}`}ms;
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
    if (value.length < 3) {
      return setFilteredOptions([]);
    }

    if (options.includes(value)) {
      return setFilteredOptions([]);
    }

    const allFilteredOptions = options; //options.filter((option) => option.toLowerCase().includes(value.toLowerCase()));
    setFilteredOptions(allFilteredOptions.slice(0, MAX_FILTRED_OPTIONS));
  }, [value]);

  return (
    <Container>
      <Input type="text" ref={inputRef} value={value} onChange={changeHandler} placeholder="Who could it be?" />
      <HintContainer>
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
    <HintButton index={index} type="button" onClick={clickHandler}>
      {value}
    </HintButton>
  );
};

Hint.propTypes = {
  value: PropTypes.string,
  onClick: PropTypes.func,
  index: PropTypes.number,
};

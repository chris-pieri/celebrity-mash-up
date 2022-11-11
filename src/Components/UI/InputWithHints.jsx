import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useEffect, useState, useRef } from 'react';
import Input from './Input';
import Button from './Button';

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
  font-size: 10px;
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

    const allFilteredOptions = options.filter((option) => option.toLowerCase().includes(value.toLowerCase()));
    setFilteredOptions(allFilteredOptions.slice(0, MAX_FILTRED_OPTIONS));
  }, [value]);

  return (
    <Container>
      <Input type="text" ref={inputRef} value={value} onChange={changeHandler} placeholder="Who could it be?" />
      <HintContainer>
        {filteredOptions.map((option) => (
          <Hint value={option} key={option} onClick={hintClickHandler} />
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

const Hint = ({ value, onClick }) => {
  const clickHandler = () => {
    onClick(value);
  };
  return (
    <HintButton type="button" onClick={clickHandler}>
      {value}
    </HintButton>
  );
};

Hint.propTypes = {
  value: PropTypes.string,
  onClick: PropTypes.func,
};

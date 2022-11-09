import { Autocomplete, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

export default function AutocompleteInput({ value, options, onChange, ...restProps }) {
  const [placeholder, setPlaceholder] = useState('Who could it be?');
  const changeHandler = (event, value) => {
    onChange(value);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholder(options[Math.floor(Math.random() * options.length)]);
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [options]);

  return (
    <Autocomplete
      autoHighlight
      value={value}
      options={options}
      onChange={changeHandler}
      renderInput={(params) => (
        <TextField sx={{ input: { color: 'rgba(255, 255, 255, 0.87)' } }} {...params} placeholder={placeholder} />
      )}
      {...restProps}
    />
  );
}

AutocompleteInput.propTypes = {
  value: PropTypes.string,
  options: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
};

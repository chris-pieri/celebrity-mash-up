import { Autocomplete, TextField } from '@mui/material';
import PropTypes from 'prop-types';

const options = ['Michael Jackson', 'Raymond Felton', 'George Costanza'];

export default function AutocompleteInput({ onChange }) {
  const changeHandler = (event, value) => {
    onChange(value);
  };

  return (
    <Autocomplete
      autoHighlight
      options={options}
      onChange={changeHandler}
      renderInput={(params) => (
        <TextField sx={{ input: { color: 'rgba(255, 255, 255, 0.87)' } }} {...params} placeholder="Michael Jackson" />
      )}
    />
  );
}

AutocompleteInput.propTypes = {
  onChange: PropTypes.func.isRequired,
};

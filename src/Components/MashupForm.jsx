import PropTypes from 'prop-types';
import { useState } from 'react';
import AutocompleteInput from './UI/AutocompleteInput';

export default function MashupForm({ options, onSubmit }) {
  const [firstCelebrity, setFirstCelebrity] = useState('');
  const [secondCelebrity, setSecondCelebrity] = useState('');

  const firstCelebrityHandler = (celebrity) => setFirstCelebrity(celebrity);
  const secondCelebrityHandler = (celebrity) => setSecondCelebrity(celebrity);

  const isDisabled = !firstCelebrity || !secondCelebrity || firstCelebrity === secondCelebrity;

  const submitHandler = (e) => {
    e.preventDefault();
    onSubmit([firstCelebrity, secondCelebrity]);
  };

  return (
    <form onSubmit={submitHandler} autoComplete="off">
      <AutocompleteInput options={options} onChange={firstCelebrityHandler} />
      <AutocompleteInput options={options} onChange={secondCelebrityHandler} />
      <button disabled={isDisabled} type="submit">
        Submit
      </button>
    </form>
  );
}

MashupForm.propTypes = {
  options: PropTypes.array.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

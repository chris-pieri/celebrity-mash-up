import PropTypes from 'prop-types';
import { useState } from 'react';
import AutocompleteInput from './UI/AutocompleteInput';

export default function MashupForm({ options, onSubmit, verifyAnswers }) {
  const [firstCelebrity, setFirstCelebrity] = useState(null);
  const [secondCelebrity, setSecondCelebrity] = useState(null);

  const firstCelebrityHandler = (celebrity) => setFirstCelebrity(celebrity);
  const secondCelebrityHandler = (celebrity) => setSecondCelebrity(celebrity);

  const isDisabled = !firstCelebrity || !secondCelebrity || firstCelebrity === secondCelebrity;

  const submitHandler = (e) => {
    e.preventDefault();
    const answers = [firstCelebrity, secondCelebrity];
    onSubmit(answers);
    if (verifyAnswers(answers)) {
      setFirstCelebrity(null);
      setSecondCelebrity(null);
    }
  };

  return (
    <form onSubmit={submitHandler} autoComplete="off">
      <AutocompleteInput value={firstCelebrity} options={options} onChange={firstCelebrityHandler} />
      <AutocompleteInput value={secondCelebrity} options={options} onChange={secondCelebrityHandler} />
      <button disabled={isDisabled} type="submit">
        Submit
      </button>
    </form>
  );
}

MashupForm.propTypes = {
  options: PropTypes.array.isRequired,
  onSubmit: PropTypes.func.isRequired,
  verifyAnswers: PropTypes.func.isRequired,
};

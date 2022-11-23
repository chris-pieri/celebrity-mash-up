import './mashup-form.css';

import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useState } from 'react';
import InputWithHints from './UI/InputWithHints';
import Button from './UI/Button';
import ButtonBounce from './Animations/ButtonBounce';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  width: 100%;
`;

export default function MashupForm({ options, photo, onNext, verifyAnswers }) {
  const [firstCelebrity, setFirstCelebrity] = useState('');
  const [secondCelebrity, setSecondCelebrity] = useState('');
  const [shake, setShake] = useState(0);
  const [leave, setLeave] = useState(0);
  const [enter, setEnter] = useState(1);

  const firstCelebrityHandler = (celebrity) => setFirstCelebrity(celebrity);
  const secondCelebrityHandler = (celebrity) => setSecondCelebrity(celebrity);

  const resetAnimations = () => {
    if (leave === 1) {
      onNext();
      setEnter(1);
      setLeave(0);
    } else {
      setShake(0);
      setLeave(0);
      setEnter(0);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const answers = [firstCelebrity, secondCelebrity];
    if (verifyAnswers(answers)) {
      setFirstCelebrity('');
      setSecondCelebrity('');
      setLeave(1);
    } else {
      setShake(1);
    }
  };

  return (
    <Form onSubmit={submitHandler} autoComplete="off">
      <img
        src={photo}
        alt="mashup"
        className="image"
        data-shake={shake}
        data-enter={enter}
        data-leave={leave}
        onAnimationEnd={resetAnimations}
      />
      <InputWithHints value={firstCelebrity} options={options} onChange={firstCelebrityHandler} />
      <InputWithHints value={secondCelebrity} options={options} onChange={secondCelebrityHandler} />
      <ButtonBounce>
        <Button type="submit">Submit</Button>
      </ButtonBounce>
    </Form>
  );
}

MashupForm.propTypes = {
  options: PropTypes.array.isRequired,
  onNext: PropTypes.func.isRequired,
  verifyAnswers: PropTypes.func.isRequired,
  photo: PropTypes.string,
};

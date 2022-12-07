import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useState, useContext } from 'react';
import InputWithHints from './UI/InputWithHints';
import Button from './UI/Button';
import ButtonBounce from './Animations/ButtonBounce';
import ImgCarousel from './Animations/ImgCarousel';
import { AnimatePresence } from 'framer-motion';
import useSound from 'use-sound';
import correctAnswerMP3 from '../assets/correct_answer.mp3';
import wrongAnswerMP3 from '../assets/wrong_answer.mp3';
import VolumeContext from '../Context/VolumeContext';
import JSConfetti from 'js-confetti';

const jsConfetti = new JSConfetti();
const confettiConfig = {
  confettiColors: ['#F0795B', '#34B2A1', '#F7B03D', '#78CCDF', '#DC9BC6', '#9372AF', '#697FEE'],
  confettiNumber: 100,
};

export default function MashupForm({ options, photo, onNext, onPrevious, verifyAnswers, isPreviousDisabled }) {
  const { isVolumeOn, volume } = useContext(VolumeContext);

  const [firstCelebrity, setFirstCelebrity] = useState('');
  const [secondCelebrity, setSecondCelebrity] = useState('');
  const [shake, setShake] = useState(false);

  const [correctAnswerSound] = useSound(correctAnswerMP3, { soundEnabled: isVolumeOn, volume });
  const [wrongAnswerSound] = useSound(wrongAnswerMP3, { soundEnabled: isVolumeOn, volume });

  const resetShakeHandler = () => {
    setShake(false);
  };

  const firstCelebrityHandler = (celebrity) => setFirstCelebrity(celebrity);
  const secondCelebrityHandler = (celebrity) => setSecondCelebrity(celebrity);

  const submitHandler = (e) => {
    e.preventDefault();
    const answers = [firstCelebrity, secondCelebrity];
    if (verifyAnswers(answers)) {
      setFirstCelebrity('');
      setSecondCelebrity('');
      onNext();
      correctAnswerSound();
      jsConfetti.addConfetti(confettiConfig);
    } else {
      wrongAnswerSound();
      setShake(true);
    }
  };

  const nextHandler = (e) => {
    e.preventDefault();
    setFirstCelebrity('');
    setSecondCelebrity('');
    onNext();
  };

  const previousHandler = (e) => {
    e.preventDefault();
    setFirstCelebrity('');
    setSecondCelebrity('');
    onPrevious();
  };

  return (
    <Form onSubmit={submitHandler} autoComplete="off">
      <AnimatePresence mode="wait">
        <Img src={photo} key={photo} alt="mashup" shake={shake} onReset={resetShakeHandler} />
      </AnimatePresence>
      <InputWithHints value={firstCelebrity} options={options} onChange={firstCelebrityHandler} />
      <InputWithHints value={secondCelebrity} options={options} onChange={secondCelebrityHandler} />
      <BtnRow>
        <ButtonBounce>
          <Button type="button" onClick={previousHandler} disabled={isPreviousDisabled}>
            Back
          </Button>
        </ButtonBounce>
        <ButtonBounce>
          <Button type="submit">Guess</Button>
        </ButtonBounce>
        <ButtonBounce>
          <Button type="button" onClick={nextHandler}>
            Skip
          </Button>
        </ButtonBounce>
      </BtnRow>
    </Form>
  );
}

MashupForm.propTypes = {
  options: PropTypes.array.isRequired,
  onNext: PropTypes.func.isRequired,
  onPrevious: PropTypes.func.isRequired,
  verifyAnswers: PropTypes.func.isRequired,
  photo: PropTypes.string,
  isPreviousDisabled: PropTypes.bool.isRequired,
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  width: 100%;
`;

const Img = styled(ImgCarousel)`
  height: 300px;
  box-shadow: rgb(9 30 66 / 25%) 0px 4px 8px -2px, rgb(9 30 66 / 8%) 0px 0px 0px 1px;
`;

const BtnRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

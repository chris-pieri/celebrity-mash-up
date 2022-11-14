import { useEffect, useState } from 'react';
import client from '../client';
import MashupForm from './MashupForm';

export default function Game() {
  const [mashups, setMashups] = useState([]);
  const [currentMashupIndex, setCurrentMashupIndex] = useState(0);
  const currentMashUp = mashups[currentMashupIndex];
  const mashupSet = mashups.reduce((accum, mashup) => {
    accum.add(mashup.celebrityOneAnswer);
    accum.add(mashup.celebrityTwoAnswer);
    return accum;
  }, new Set());
  const mashupOptions = Array.from(mashupSet || []).sort();

  const nextHandler = () => {
    setCurrentMashupIndex((prevState) => prevState + 1);
  };

  const verifyAnswers = (answers) => {
    return answers.includes(currentMashUp.celebrityOneAnswer) && answers.includes(currentMashUp.celebrityTwoAnswer);
  };

  useEffect(() => {
    async function getMashUps() {
      const { data } = await client.get('/mashups');
      setMashups(data);
    }
    getMashUps();
  }, []);

  return (
    <MashupForm
      photo={mashups[currentMashupIndex]?.photoUrls}
      options={mashupOptions}
      onNext={nextHandler}
      verifyAnswers={verifyAnswers}
    />
  );
}

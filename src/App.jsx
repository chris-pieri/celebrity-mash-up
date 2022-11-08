import { useEffect, useState } from 'react';
import faceeswap from './assets/faceeswap.svg';
import './App.css';
import client from './client';
import MashupForm from './Components/MashupForm';

function App() {
  const [mashups, setMashups] = useState([]);
  const [currentMashupIndex, setCurrentMashupIndex] = useState(0);
  const currentMashUp = mashups[currentMashupIndex];
  const mashupSet = mashups.reduce((accum, mashup) => {
    accum.add(mashup.celebrityOneAnswer);
    accum.add(mashup.celebrityTwoAnswer);
    return accum;
  }, new Set());
  const mashupOptions = Array.from(mashupSet || []).sort();

  const submitHandler = (answers) => {
    if (verifyAnswers(answers)) {
      setCurrentMashupIndex((prevState) => prevState + 1);
    }
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
    <div className="App">
      <img src={faceeswap} className="logo" alt="faceeswap logo" />
      <div className="card">
        <img src={mashups[currentMashupIndex]?.photoUrls} alt="mashup" className="mashup-photo" />
        <MashupForm options={mashupOptions} onSubmit={submitHandler} verifyAnswers={verifyAnswers} />
      </div>
    </div>
  );
}

export default App;

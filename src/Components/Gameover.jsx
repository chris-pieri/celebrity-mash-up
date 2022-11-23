import FadeUp from './Animations/FadeUp';

export default function Gameover() {
  return (
    <FadeUp delay={0.5}>
      <h2>{"That's the ball game!"}</h2>
      <FadeUp delay={2}>
        <p>Thanks for playing! Come back soon for more face swaps.</p>
      </FadeUp>
      <FadeUp delay={3.5}>
        <p>If you had fun please share with your friends.</p>
      </FadeUp>
    </FadeUp>
  );
}

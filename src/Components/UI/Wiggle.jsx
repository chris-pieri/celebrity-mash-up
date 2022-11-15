import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const Wiggle = ({ rotation = 0, timing = 150, children }) => {
  const [isWiggling, setIsWiggling] = useState(false);

  const style = {
    display: 'flex',
    backfaceVisibility: 'hidden',
    transform: isWiggling ? `rotate(${rotation}deg)` : `rotate(0deg)`,
    transition: `transform ${timing}ms`,
  };

  useEffect(() => {
    if (!isWiggling) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setIsWiggling(false);
    }, timing);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [isWiggling, timing]);

  const trigger = () => {
    setIsWiggling(true);
  };

  return (
    <span onMouseEnter={trigger} style={style}>
      {children}
    </span>
  );
};

export default Wiggle;

Wiggle.propTypes = {
  rotation: PropTypes.number,
  timing: PropTypes.number,
  children: PropTypes.node,
};

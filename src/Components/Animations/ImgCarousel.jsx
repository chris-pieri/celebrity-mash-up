import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

const variants = {
  enter: { x: 0, rotate: 0, opacity: 1 },
  shake: { x: [-20, 20, -10, 10, 0] },
  initialEnter: { rotate: -180, opacity: 0 },
  initialShake: { x: 0 },
};

export default function ImgCarousel({ shake, onReset, ...restProps }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onReset();
    }, 1000);

    return () => clearTimeout(timer);
  }, [shake]);

  return (
    <motion.img
      style={{ transformOrigin: '50% 190%' }}
      variants={variants}
      initial={shake ? 'initialShake' : 'initialEnter'}
      animate={shake ? 'shake' : 'enter'}
      exit={{ rotate: 180, opacity: 0 }}
      transition={{ duration: 0.7, type: 'spring' }}
      {...restProps}
    />
  );
}

ImgCarousel.propTypes = {
  shake: PropTypes.bool,
  onReset: PropTypes.func,
};

import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

export default function Wiggle({ rotation = 0, children }) {
  return (
    <motion.span
      style={{ display: 'flex' }}
      whileHover={{
        scale: 1.1,
      }}
      whileTap={{
        rotate: rotation,
      }}
      transition={{ type: 'spring', stiffness: 400 }}
    >
      {children}
    </motion.span>
  );
}

Wiggle.propTypes = {
  rotation: PropTypes.number,
  children: PropTypes.node,
};

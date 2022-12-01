import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

export default function Float({ children }) {
  return (
    <motion.div
      animate={{ y: 7, transition: { repeat: Infinity, repeatType: 'reverse', duration: 1.5 } }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.div>
  );
}

Float.propTypes = {
  delay: PropTypes.number,
  duration: PropTypes.number,
  children: PropTypes.node,
};

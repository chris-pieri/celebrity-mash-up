import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

export default function SlideDown({ delay = 0, children }) {
  return (
    <motion.div initial={{ y: -50, zIndex: 0 }} animate={{ y: 0, zIndex: 1 }} transition={{ delay }} layout>
      {children}
    </motion.div>
  );
}

SlideDown.propTypes = {
  delay: PropTypes.number,
  children: PropTypes.node,
};

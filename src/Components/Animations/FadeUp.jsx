import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

export default function FadeUp({ delay = 0, y = 100, children }) {
  return (
    <motion.div initial={{ y, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay }}>
      {children}
    </motion.div>
  );
}

FadeUp.propTypes = {
  delay: PropTypes.number,
  y: PropTypes.number,
  children: PropTypes.node,
};

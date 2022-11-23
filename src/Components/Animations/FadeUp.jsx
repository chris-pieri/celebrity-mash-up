import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

export default function FadeUp({ delay = 0, children }) {
  return (
    <motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay }}>
      {children}
    </motion.div>
  );
}

FadeUp.propTypes = {
  delay: PropTypes.number,
  children: PropTypes.node,
};

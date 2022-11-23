import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

export default function ExitAnimation({ id, children }) {
  return (
    <motion.div
      style={{ width: '100%' }}
      key={id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ y: 70, opacity: 0, transition: { duration: 0.8 } }}
    >
      {children}
    </motion.div>
  );
}

ExitAnimation.propTypes = {
  id: PropTypes.string,
  children: PropTypes.node,
};

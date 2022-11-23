import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

export default function ButtonBounce({ children }) {
  return (
    <motion.span
      style={{ display: 'flex' }}
      whileTap={{
        scale: 0.9,
      }}
    >
      {children}
    </motion.span>
  );
}

ButtonBounce.propTypes = {
  children: PropTypes.node,
};

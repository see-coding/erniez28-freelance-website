import { motion } from 'framer-motion'

/**
 * Einheitlicher Scroll-Reveal für Sektionen.
 * Respektiert prefers-reduced-motion via framer-motion (useReducedMotion in MotionConfig).
 */
export default function Reveal({ children, delay = 0, className, ...rest }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8% 0px' }}
      transition={{ duration: 0.65, delay, ease: [0.2, 0.7, 0.2, 1] }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

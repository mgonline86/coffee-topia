import { motion } from "framer-motion";

export default function SlideUpAnimation({ children, ...props }) {
  return (
    <motion.div
      {...props}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      viewport={{ once: true }}
      className="h-100"
    >
      {children}
    </motion.div>
  );
}

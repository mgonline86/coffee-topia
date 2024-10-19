import { motion } from "framer-motion";
import { useRef } from "react";

export default function CoolTitle({ title }) {
  const scrollRef = useRef(null);

  return (
    <div
      className="d-flex align-items-center justify-content-center mb-4"
      ref={scrollRef}
    >
      <div className="position-relative flex-fill">
        <motion.img
          src="/img/front-splash.webp"
          className="position-absolute h-100 z-3 img-fluid top-50 start-50"
          initial={{ opacity: 0, scale: 0, y: "-50%", x: "-50%" }}
          whileInView={{
            opacity: 1,
            scale: 1,
            y: "-50%",
            x: "-50%",
            transition: { delay: 0.25, duration: 0.2, ease: "easeInOut" },
          }}
          viewport={{ root: scrollRef, once: true }}
        />
        <motion.h1
          className="text-center fw-bolder fancyFont text-primary z-2 mb-2 position-relative"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{
            opacity: 1,
            y: 0,
            transition: { duration: 0.2, delay: 0.2, ease: "easeInOut" },
          }}
          viewport={{ root: scrollRef, once: true }}
        >
          {title}
        </motion.h1>
        <motion.img
          src="/img/back-splash.webp"
          className="position-absolute h-100 z-1 img-fluid top-50 start-50"
          initial={{ opacity: 0, scale: 0, y: "-50%", x: "-50%" }}
          whileInView={{
            opacity: 1,
            scale: 1,
            y: "-50%",
            x: "-50%",
            transition: { delay: 0.25, duration: 0.2, ease: "easeInOut" },
          }}
          viewport={{ root: scrollRef, once: true }}
        />
      </div>
    </div>
  );
}

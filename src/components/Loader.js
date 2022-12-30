import React from "react";
import { motion } from "framer-motion";

const loadingContainer = {
  width: "6rem",
  height: "4rem",
  display: "flex",
  justifyContent: "space-around",
  gap: "2rem",
};
const loadingCircle = {
  display: "block",
  width: "2rem",
  height: "2rem",
  borderRadius: "0.5rem",
  fontSize: "3rem",
};

const Loader = () => {
  return (
    <div className="flex flex-col w-screen justify-center items-center gap-4">
        <motion.div
            className='break-words text-center'
            animate={{
                opacity: [0, 1],
            }}
            transition={{
                duration: 1,
                delay: 1,
            }}
        >
            <motion.p className='font-bold text-2xl'>
                Oops!
            </motion.p>
        </motion.div>
        <motion.div
          style={loadingContainer}
          animate={{
            opacity: [0, 1],
          }}
          transition={{
            duration: 1,
          }}
        >
          <motion.span
            style={loadingCircle}
          >🍅</motion.span>
          <motion.span
            style={loadingCircle}
          >🥬</motion.span>
          <motion.span
            style={loadingCircle}
          >🧀</motion.span>
        </motion.div>
        <motion.div
            className='break-words text-center'
            animate={{
                opacity: [0, 1],
            }}
            transition={{
                duration: 1,
                delay: 1,
            }}
        >
            <motion.p className='text-2xl'>
                Seu carrinho está vazio!
            </motion.p>
        </motion.div>
    </div>
  );
};

export default Loader;
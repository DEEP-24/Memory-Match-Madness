'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CardProps {
  frontImage: string;
  backImage: string;
}

const Card: React.FC<CardProps> = ({ frontImage, backImage }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const flipCard = () => {
    setIsFlipped((prevState) => !prevState);
  };

  const transition = {
    duration: 2,
    ease: 'easeInOut',
  };

  return (
    <div
      onClick={flipCard}
      style={{
        perspective: '1000px',
        height: '500px',
        width: '300px',
        position: 'relative',
        borderRadius: '10px',
      }}
    >
      <AnimatePresence initial={false} custom={isFlipped}>
        <motion.img
          key="front"
          src={frontImage}
          alt="Front"
          custom={isFlipped}
          initial={false}
          variants={{
            visible: { rotateY: 0, opacity: 1 },
            hidden: { rotateY: -180, opacity: 0 },
          }}
          animate={isFlipped ? 'hidden' : 'visible'}
          exit={{ rotateY: 180, opacity: 0 }}
          style={{
            aspectRatio: '1/1',
            objectFit: 'cover',
            position: 'absolute',
            width: '100%',
            height: '100%',
            borderRadius: '10px',
            backfaceVisibility: 'hidden',
            border: '4px solid red',
          }}
          transition={transition}
        />
        <motion.img
          key="back"
          src={backImage}
          alt="Back"
          custom={isFlipped}
          initial={false}
          variants={{
            visible: { rotateY: 0, opacity: 1 },
            hidden: { rotateY: 180, opacity: 0 },
          }}
          animate={isFlipped ? 'visible' : 'hidden'}
          exit={{ rotateY: -180, opacity: 0 }}
          style={{
            aspectRatio: '1/1',
            objectFit: 'cover',
            position: 'absolute',
            width: '100%',
            height: '100%',
            borderRadius: '10px',
            backfaceVisibility: 'hidden',
            border: '4px solid red',
          }}
          transition={transition}
        />
      </AnimatePresence>
    </div>
  );
};

export default function Home() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Card frontImage="/assets/default.jpg" backImage="/assets/elephant.jpg" />
    </div>
  );
}

'use client';

import '~/styles/animals.css';

import { ArrowLeftIcon, ArrowPathIcon } from '@heroicons/react/20/solid';
import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import * as React from 'react';
import { ANIMAL_CARDS, ICard } from '~/src/data/animals';
import { randomizeCards } from '~/src/utils/functions';
import { useCardContext } from '~/src/context/CardContext';
import { log } from 'console';

function Animals() {
  const { cards, setTurns, setMatches, selectedCardOneId, selectedCardTwoId, matches, turns } = useCardContext();

  const restart = () => {
    setTurns(0);
    setMatches(0);

    randomizeCards(ANIMAL_CARDS);
  };

  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div className="Matches_Turns">
        <div className="Matches">
          <h3>Matches</h3>
          <p>{matches}</p>
        </div>
        <div className="Turns">
          <h3>Turns</h3>
          <p>{turns}</p>
        </div>
      </div>
      <div
        className="container"
        style={{
          flex: 1,
        }}
      >
        <div
          className="card-container"
          style={{
            height: '100%',
            padding: '10px',
          }}
        >
          {cards.map((card, i) => {
            return <CardComponent key={i} index={i} card={card} />;
          })}
        </div>
      </div>
      <div className="Menu_Restart">
        <div className="Menu">
          <Link href="/">
            <ArrowLeftIcon />
            <span>Go Back</span>
          </Link>
        </div>
        <div className="Restart">
          <button onClick={() => restart()}>
            <ArrowPathIcon />
            <span>Restart</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Animals;

type CardProps = {
  card: ICard;
  index: number;
};

const transition = {
  duration: 2,
  ease: 'easeInOut',
};

function CardComponent({ card, index }: CardProps) {
  const [isCardShowing, setIsCardShowing] = React.useState(false);
  const [preventPointerEvent, setPreventPointerEvent] = React.useState(true);
  const [isInitialAnimationFinished, setIsInitialAnimationFinished] = React.useState(false);
  const [isReverseAnimationFinished, setIsReverseAnimationFinished] = React.useState(false);

  const { isInitiallyMounted, selectedCardOneId, selectedCardTwoId, handleCardSelect } = useCardContext();

  const isSelectedById = React.useMemo(() => {
    return selectedCardOneId === card.id || selectedCardTwoId === card.id;
  }, [selectedCardOneId, card.id, selectedCardTwoId]);

  React.useEffect(() => {
    if (isReverseAnimationFinished) {
      setPreventPointerEvent(false);
    }
  }, [isReverseAnimationFinished]);

  React.useEffect(() => {
    if (!isInitiallyMounted) {
      return;
    }

    const timeout = setTimeout(() => {
      setIsCardShowing(true);

      setTimeout(() => {
        setIsCardShowing(false);
        setIsInitialAnimationFinished(true);
      }, 2000);
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, [isInitiallyMounted]);

  return (
    <motion.button
      onClick={() => {
        setIsCardShowing((prevState) => {
          if (isReverseAnimationFinished && prevState) {
            handleCardSelect(card.id);
          }

          return !prevState;
        });

        handleCardSelect(card.id);
        if (!isCardShowing) {
          handleCardSelect(card.id);
        }
      }}
      className={classNames(`card`, isCardShowing ? '' : '')}
      key={card.id}
      style={{
        perspective: '1000px',
        height: '145px',
        width: '170px',
        position: 'relative',
        borderRadius: '10px',
        pointerEvents: preventPointerEvent || !isReverseAnimationFinished ? 'none' : 'auto',
        cursor: preventPointerEvent || !isReverseAnimationFinished ? 'not-allowed' : 'pointer',
      }}
      initial={{ opacity: 0, translateY: 30 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ duration: 0.3, delay: index * 0.2, type: 'tween' }}
    >
      <AnimatePresence initial={false} custom={isCardShowing}>
        <motion.img
          key="front"
          src={card.frontImage}
          alt="Front"
          custom={isCardShowing}
          initial={false}
          variants={{
            visible: { rotateY: 0, opacity: 1 },
            hidden: { rotateY: -180, opacity: 0 },
          }}
          animate={isCardShowing ? 'hidden' : 'visible'}
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
          onAnimationComplete={(state) => {
            if (!isInitialAnimationFinished || state !== 'visible') {
              return;
            }

            if (!isReverseAnimationFinished) {
              console.log('Every animation is finished');
              setIsReverseAnimationFinished(true);
            }
          }}
        />
        <motion.img
          key="back"
          src={card.backImage}
          alt="Back"
          custom={isCardShowing}
          initial={false}
          variants={{
            visible: { rotateY: 0, opacity: 1 },
            hidden: { rotateY: 180, opacity: 0 },
          }}
          animate={isCardShowing ? 'visible' : 'hidden'}
          exit={{ rotateY: -180, opacity: 0 }}
          style={{
            aspectRatio: '1/1',
            objectFit: 'cover',
            width: '100%',
            height: '100%',
            borderRadius: '10px',
            backfaceVisibility: 'hidden',
            border: '4px solid red',
          }}
          transition={transition}
        />
        <div
          style={{
            color: 'black',
            display: 'flex',
            gap: '10px',
            backgroundColor: 'white',
          }}
        >
          <span>Sel: {isCardShowing.toString()}</span>
          <span>Ans: {card.answered.toString()}</span>
        </div>
      </AnimatePresence>
    </motion.button>
  );
}

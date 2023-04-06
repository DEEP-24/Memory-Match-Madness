'use client';

import '~/styles/animals.css';

import { ArrowLeftIcon, ArrowPathIcon } from '@heroicons/react/20/solid';
import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import * as React from 'react';
import { useCardContext } from '~/src/context/CardContext';
import { ICard } from '~/src/data/animals';
import { toast } from 'react-hot-toast';
function Animals() {
  const { cards, matches, turns, restart, isAnimating } = useCardContext();

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
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: '0',
            zIndex: 1,
            backgroundColor: 'transparent',
            display: isAnimating ? 'block' : 'none',
          }}
          onClick={() => toast.error('Have some patience, you piece of shit!')}
        ></div>
        <div
          className="card-container"
          style={{
            height: '100%',
            padding: '10px',
          }}
        >
          {cards.map((card) => (
            <CardComponent key={card.renderId} card={card} />
          ))}
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
};

const transition = {
  duration: 2,
  ease: 'easeInOut',
};

function CardComponent({ card }: CardProps) {
  const [isCardShowing, setIsCardShowing] = React.useState(card.answered);
  const [preventPointerEvent, setPreventPointerEvent] = React.useState(true);
  const [isInitialAnimationFinished, setIsInitialAnimationFinished] = React.useState(false);
  const [isReverseAnimationFinished, setIsReverseAnimationFinished] = React.useState(false);

  const {
    isInitiallyMounted,
    selectedCardOneId,
    setIsAnimating,
    selectedCardTwoId,
    handleCardSelect,
    forceRerender,
    initialRenderCount,
  } = useCardContext();

  const isSelectedById = React.useMemo(() => {
    return selectedCardOneId === card.id || selectedCardTwoId === card.id;
  }, [selectedCardOneId, card.id, selectedCardTwoId]);

  React.useEffect(() => {
    if (isReverseAnimationFinished) {
      setPreventPointerEvent(false);
    }
  }, [isReverseAnimationFinished]);

  React.useEffect(() => {
    let timeout: any;
    if (!isReverseAnimationFinished) return;

    if (initialRenderCount.current < 16) {
      ++initialRenderCount.current;
      return;
    }

    // run when it's match
    if (card.answered) {
      setIsCardShowing(true);
      setPreventPointerEvent(true);
    }
    // run when it's not a match
    else {
      timeout = setTimeout(() => {
        setIsCardShowing(false);
        setPreventPointerEvent(false);
      }, 2000);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [card.answered, isReverseAnimationFinished, forceRerender, initialRenderCount]);

  React.useEffect(() => {
    if (!isInitiallyMounted) {
      return;
    }

    const timeout = setTimeout(() => {
      setIsCardShowing(true);

      setTimeout(() => {
        setIsCardShowing(false);
        console.log('Timeout ~ first stagger false');

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
        if (isReverseAnimationFinished && isCardShowing === false) {
          handleCardSelect(card.id);
        }

        setIsCardShowing((prevState) => !prevState);
      }}
      className={classNames('card')}
      key={card.id}
      style={{
        perspective: '1000px',
        height: '145px',
        width: '170px',
        position: 'relative',
        borderRadius: '10px',
        pointerEvents: preventPointerEvent || !isReverseAnimationFinished || isSelectedById ? 'none' : 'auto',
        cursor: preventPointerEvent || !isReverseAnimationFinished || isSelectedById ? 'not-allowed' : 'pointer',
      }}
      initial={{ opacity: 0, translateY: 30 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ duration: 0.3, delay: (card.renderId - 1) * 0.2, type: 'tween' }}
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
            userSelect: 'none',
          }}
          transition={transition}
          onAnimationComplete={(state) => {
            setIsAnimating(false);
            if (!isInitialAnimationFinished || state !== 'visible') {
              return;
            }

            if (!isReverseAnimationFinished) {
              setIsReverseAnimationFinished(true);
            }
          }}
          onAnimationStart={() => {
            setIsAnimating(true);
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
            aspectRatio: '0.5',
            objectFit: 'cover',
            width: '100%',
            height: '100%',
            borderRadius: '10px',
            backfaceVisibility: 'hidden',
            border: '4px solid red',
            userSelect: 'none',
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
        ></div>
      </AnimatePresence>
    </motion.button>
  );
}

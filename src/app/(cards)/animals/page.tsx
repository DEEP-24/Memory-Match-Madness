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
    <div className="h-full w-full flex flex-col relative">
      <div className="flex  flex-row justify-between p-2 ">
        <div className="text-white bg-blue-600 rounded-b-md flex flex-col shadow ml-2 px-6 py-2 items-center justify-center -mt-2">
          <h3 className="uppercase font-bold text-sm">Matches</h3>
          <p>{matches}</p>
        </div>
        <div className="text-white bg-blue-600 rounded-b-md flex flex-col shadow mr-2 px-6 py-2 items-center justify-center -mt-2">
          <h3 className="uppercase font-bold text-sm">Turns</h3>
          <p>{turns}</p>
        </div>
      </div>
      <div className="flex-1 relative">
        <div
          style={{
            position: 'absolute',
            inset: '0',
            zIndex: 1,
            backgroundColor: 'transparent',
            display: isAnimating ? 'block' : 'none',
          }}
          onClick={() => toast.error('Have some patience!')}
        ></div>
        <div className="card-container h-full w-full flex-1 grid grid-cols-6 gap-8 p-2 place-content-center place-items-center">
          {cards.map((card) => (
            <CardComponent key={card.renderId} card={card} />
          ))}
        </div>
      </div>
      <div className="flex justify-between p-2">
        <Link
          href="/"
          className="text-white bg-blue-600 rounded-t-md flex flex-col shadow ml-2 px-6 py-4 items-center justify-center -mb-2"
        >
          <ArrowLeftIcon className="h-7 w-7" />
        </Link>

        <button
          className="text-white bg-blue-600 rounded-t-md flex flex-col shadow mr-2 px-6 py-4 items-center justify-center -mb-2"
          onClick={() => restart()}
        >
          <ArrowPathIcon className="h-7 w-7" />
        </button>
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

    if (initialRenderCount.current < 12) {
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
      }, 3500);
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
        aspectRatio: '1/1.43',
        // height: '145px',
        width: '150px',
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
            objectFit: 'cover',
            position: 'absolute',
            width: '100%',
            height: '100%',
            borderRadius: '10px',
            backfaceVisibility: 'hidden',
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
            aspectRatio: '1/2',
            objectFit: 'cover',
            width: '100%',
            height: '100%',
            borderRadius: '10px',
            backfaceVisibility: 'hidden',
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

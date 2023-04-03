'use client';
import '~/styles/animals.css';
import Link from 'next/link';
import * as React from 'react';
import { ArrowLeftIcon, ArrowPathIcon } from '@heroicons/react/20/solid';
import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';

type AnimalCard = {
  id: number;
  type: string;
  frontImage: string;
  backImage: string;
  selected: boolean;
  answered: boolean;
};

const ANIMAL_CARDS: AnimalCard[] = [
  {
    id: 1,
    type: 'elephant',
    frontImage: '/assets/default.jpg',
    backImage: '/assets/elephant.jpg',
    answered: false,
    selected: false,
  },
  {
    id: 2,
    type: 'elephant',
    frontImage: '/assets/default.jpg',
    backImage: '/assets/elephant.jpg',
    answered: false,
    selected: false,
  },
  {
    id: 3,
    type: 'lion',
    frontImage: '/assets/default.jpg',
    backImage: '/assets/lion.avif',

    answered: false,
    selected: false,
  },
  {
    id: 4,
    type: 'lion',
    frontImage: '/assets/default.jpg',
    backImage: '/assets/lion.avif',
    answered: false,
    selected: false,
  },
  {
    id: 5,
    type: 'tiger',
    frontImage: '/assets/default.jpg',
    backImage: '/assets/tiger.jpg',
    answered: false,
    selected: false,
  },
  {
    id: 6,
    type: 'tiger',
    frontImage: '/assets/default.jpg',
    backImage: '/assets/tiger.jpg',
    answered: false,
    selected: false,
  },
  {
    id: 7,
    type: 'monkey',
    frontImage: '/assets/default.jpg',
    backImage: '/assets/monkey.jpg',
    answered: false,
    selected: false,
  },
  {
    id: 8,
    type: 'monkey',
    frontImage: '/assets/default.jpg',
    backImage: '/assets/monkey.jpg',
    answered: false,
    selected: false,
  },
  {
    id: 9,
    type: 'giraffe',
    frontImage: '/assets/default.jpg',
    backImage: '/assets/giraffe.avif',
    answered: false,
    selected: false,
  },
  {
    id: 10,
    type: 'giraffe',
    frontImage: '/assets/default.jpg',
    backImage: '/assets/giraffe.avif',
    answered: false,
    selected: false,
  },
  {
    id: 11,
    type: 'dog',
    frontImage: '/assets/default.jpg',
    backImage: '/assets/dog.jpg',
    answered: false,
    selected: false,
  },
  {
    id: 12,
    type: 'dog',
    frontImage: '/assets/default.jpg',
    backImage: '/assets/dog.jpg',
    answered: false,
    selected: false,
  },
  {
    id: 13,
    type: 'cat',
    frontImage: '/assets/default.jpg',
    backImage: '/assets/cat.png',
    answered: false,
    selected: false,
  },
  {
    id: 14,
    type: 'cat',
    frontImage: '/assets/default.jpg',
    backImage: '/assets/cat.png',
    answered: false,
    selected: false,
  },
  {
    id: 15,
    type: 'deer',
    frontImage: '/assets/default.jpg',
    backImage: '/assets/deer.webp',
    answered: false,
    selected: false,
  },
  {
    id: 16,
    type: 'deer',
    frontImage: '/assets/default.jpg',
    backImage: '/assets/deer.webp',
    answered: false,
    selected: false,
  },
];

const randomize = (array: any[]) => {
  const copy = [...array];

  // @ts-expect-error - Fix it later
  return copy.sort(() => Math.random() > 0.5);
};

function Animals() {
  const [isInitiallyMounted, setIsInitiallyMounted] = React.useState(false);
  const [cards, setCards] = React.useState<AnimalCard[]>(randomize(ANIMAL_CARDS));
  const [turns, setTurns] = React.useState(0);
  const [matches, setMatches] = React.useState(0);
  const [selectedCardOneId, setSelectedCardOneId] = React.useState<number | null>(null);
  const [selectedCardTwoId, setSelectedCardTwoId] = React.useState<number | null>(null);

  const restart = () => {
    setTurns(0);
    setMatches(0);

    setCards(randomize(cards.map((card) => ({ ...card, answered: false, selected: false }))));
  };

  const selectCard = (cardId: number) => {
    const selectedCard = cards.find((card) => card.id === cardId);

    if (!selectedCard || selectedCard.answered) {
      //do nothing if the card has already been answered
      return;
    }
    if (selectedCardOneId === null) {
      setSelectedCardOneId(cardId);
      return;
    }

    setSelectedCardTwoId(cardId);
  };

  const isGameCompleted = React.useMemo(() => {
    return cards.every((card) => card.answered);
  }, [cards]);

  React.useEffect(() => {
    setIsInitiallyMounted(true);
  }, [setIsInitiallyMounted]);

  React.useEffect(() => {
    // if (isGameCompleted) {
    //   alert("Game Completed");
    //   return;
    // }

    if (!selectedCardOneId || !selectedCardTwoId) {
      return;
    }

    const cardOne = cards.find((card) => card.id === selectedCardOneId);
    const cardTwo = cards.find((card) => card.id === selectedCardTwoId);

    if (!cardOne || !cardTwo) {
      //this is unlikely to happen
      return;
    }

    if (cardOne.type !== cardTwo.type) {
      console.log('not a match');
      setSelectedCardOneId(null);
      setSelectedCardTwoId(null);
      setTurns((prevCount) => prevCount + 1);
      return;
    }

    setCards((prevCards) =>
      prevCards.map((card) => {
        if (card.id === selectedCardOneId || card.id === selectedCardTwoId) {
          return {
            ...card,
            selected: true,
            answered: true,
          };
        }

        return card;
      }),
    );

    setTurns((prevCount) => prevCount + 1);
    setMatches((prev) => prev + 1);
    setSelectedCardOneId(null);
    setSelectedCardTwoId(null);
  }, [cards, isGameCompleted, selectedCardOneId, selectedCardTwoId]);

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
            const isMatched = selectedCardOneId === card.id || selectedCardTwoId === card.id;

            const isSelected = card.selected ? true : isMatched;

            return (
              <CardComponent
                key={i}
                index={i}
                card={card}
                isSelected={isSelected}
                selectCard={selectCard}
                frontImage={card.frontImage}
                backImage={card.backImage}
                isInitiallyMounted={isInitiallyMounted}
              />
            );
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
  frontImage: string;
  backImage: string;
  card: AnimalCard;
  index: number;
  isSelected: boolean;
  selectCard: (cardId: number) => void;
  isInitiallyMounted: boolean;
};

function CardComponent(props: CardProps) {
  const [isFlipped, setIsFlipped] = React.useState(false);

  const { selectCard, isSelected, card, index, frontImage, backImage, isInitiallyMounted } = props;

  const flipCard = () => {
    if (card.answered) {
      //Do not flip the card if it has already been matched
      return;
    }
    setIsFlipped((prevState) => !prevState);
  };

  const transition = {
    duration: 2,
    ease: 'easeInOut',
  };

  React.useEffect(() => {
    if (isInitiallyMounted) {
      setTimeout(() => {
        setIsFlipped(true);
        setTimeout(() => {
          setIsFlipped(false);
        }, 2000);
      }, 3700);
    }
  }, [isInitiallyMounted]);

  return (
    <motion.button
      onClick={() => {
        flipCard();
        selectCard(index);
      }}
      className={classNames(`card`, isSelected ? `style={{backgroundColor: "red"}}` : '')}
      key={index}
      style={{
        perspective: '1000px',
        height: '145px',
        width: '170px',
        position: 'relative',
        borderRadius: '10px',
      }}
      //for stagerring effect
      initial={{ opacity: 0, translateY: 30 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ duration: 0.3, delay: index * 0.2, type: 'tween' }}
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
            width: '100%',
            height: '100%',
            borderRadius: '10px',
            backfaceVisibility: 'hidden',
            border: '4px solid red',
          }}
          transition={transition}
        />
      </AnimatePresence>
      <span>Selected : {isSelected.toString()}</span>
    </motion.button>
  );
}

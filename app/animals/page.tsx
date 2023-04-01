"use client";
import "~/styles/animals.css";
import Link from "next/link";
import * as React from "react";
import { ArrowLeftIcon, ArrowPathIcon } from "@heroicons/react/20/solid";
import classNames from "classnames";
import { motion, useCycle } from "framer-motion";

type AnimalCard = {
  id: number;
  type: string;
  imageSrc: string;
  // show: boolean;
  selected: boolean;
  answered: boolean;
};

const ANIMAL_CARDS: AnimalCard[] = [
  {
    id: 1,
    type: "elephant",
    imageSrc: "/assets/elephant.jpg",
    answered: false,
    selected: false,
  },
  {
    id: 2,
    type: "elephant",
    imageSrc: "/assets/elephant.jpg",
    answered: false,
    selected: false,
  },
  {
    id: 3,
    type: "lion",
    imageSrc: "/assets/lion.avif",
    answered: false,
    selected: false,
  },
  {
    id: 4,
    type: "lion",
    imageSrc: "/assets/lion.avif",
    answered: false,
    selected: false,
  },
  {
    id: 5,
    type: "tiger",
    imageSrc: "/assets/tiger.jpg",
    answered: false,
    selected: false,
  },
  {
    id: 6,
    type: "tiger",
    imageSrc: "/assets/tiger.jpg",
    answered: false,
    selected: false,
  },
  {
    id: 7,
    type: "monkey",
    imageSrc: "/assets/monkey.jpg",
    answered: false,
    selected: false,
  },
  {
    id: 8,
    type: "monkey",
    imageSrc: "/assets/monkey.jpg",
    answered: false,
    selected: false,
  },
  {
    id: 9,
    type: "giraffe",
    imageSrc: "/assets/giraffe.avif",
    answered: false,
    selected: false,
  },
  {
    id: 10,
    type: "giraffe",
    imageSrc: "/assets/giraffe.avif",
    answered: false,
    selected: false,
  },
  {
    id: 11,
    type: "dog",
    imageSrc: "/assets/dog.jpg",
    answered: false,
    selected: false,
  },
  {
    id: 12,
    type: "dog",
    imageSrc: "/assets/dog.jpg",
    answered: false,
    selected: false,
  },
  {
    id: 13,
    type: "cat",
    imageSrc: "/assets/cat.png",
    answered: false,
    selected: false,
  },
  {
    id: 14,
    type: "cat",
    imageSrc: "/assets/cat.png",
    answered: false,
    selected: false,
  },
  {
    id: 15,
    type: "deer",
    imageSrc: "/assets/deer.webp",
    answered: false,
    selected: false,
  },
  {
    id: 16,
    type: "deer",
    imageSrc: "/assets/deer.webp",
    answered: false,
    selected: false,
  },
];

const randomize = (array: any[]) => {
  // @ts-expect-error - Fix it later
  return array.sort(() => Math.random() > 0.5);
};

function Animals() {
  const [isInitallyMounted, setIsInitallyMounted] = React.useState(false);
  const [cards, setCards] = React.useState<AnimalCard[]>(
    randomize(ANIMAL_CARDS)
  );
  const [turns, setTurns] = React.useState(0);
  const [matches, setMatches] = React.useState(0);
  const [selectedCardOneId, setSelectedCardOneId] = React.useState<
    number | null
  >(null);
  const [selectedCardTwoId, setSelectedCardTwoId] = React.useState<
    number | null
  >(null);

  const restart = () => {
    setTurns(0);
    setMatches(0);

    randomize(ANIMAL_CARDS);
  };

  const selectCard = (cardId: number) => {
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
    setIsInitallyMounted(true);
  }, [setIsInitallyMounted]);

  React.useEffect(() => {
    console.log("isInitiallyMounted - ", isInitallyMounted);
  });

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
      console.log("not a match");
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
      })
    );

    setTurns((prevCount) => prevCount + 1);
    setMatches((prev) => prev + 1);
    setSelectedCardOneId(null);
    setSelectedCardTwoId(null);
  }, [cards, isGameCompleted, selectedCardOneId, selectedCardTwoId]);

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
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
            height: "100%",
            padding: "10px",
          }}
        >
          {cards.map((card, i) => {
            const isMatched =
              selectedCardOneId === card.id || selectedCardTwoId === card.id;

            const isSelected = card.selected ? true : isMatched;

            return (
              <CardComponent
                key={i}
                index={i}
                card={card}
                isSelected={isSelected}
                selectCard={selectCard}
                imageSrc={card.imageSrc}
                isInitallyMounted={isInitallyMounted}
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
  imageSrc: string;
  card: AnimalCard;
  index: number;
  isSelected: boolean;
  selectCard: (cardId: number) => void;
  isInitallyMounted: boolean;
};

const defaultUrl = "/assets/default.jpg";

function CardComponent(props: CardProps) {
  const [imageurl, setImageurl] = React.useState(defaultUrl);
  const [isFlipped, setIsFlipped] = React.useState(false);
  const [flipDirection, setFlipDirection] = React.useState(1);

  const { selectCard, isSelected, card, index, imageSrc, isInitallyMounted } =
    props;

  const imageAnimateProps = {
    rotateY: 0,
    transition: { duration: 3 },
  };

  // const reverseInitial = () => {
  //   if (!isInitallyMounted && !revealed) {
  //     return {
  //       rotateY: 0,
  //     };
  //   }
  // };
  // const reverseAnimation = () => {
  //   if (!isInitallyMounted && !revealed) {
  //     return {
  //       rotateY: -180,
  //       transition: { duration: 3 },
  //     };
  //   }
  // };

  const handleCardClick = () => {
    setIsFlipped((prevIsFlipped) => !prevIsFlipped);
    setFlipDirection((prevFlipDirection) => prevFlipDirection * -1);
  };

  return (
    <motion.button
      onClick={() => {
        selectCard(card.id);
        handleCardClick();
      }}
      className={classNames(`card`, isSelected ? "" : "")}
      key={card.id}
      //for stagerring effect
      initial={{ opacity: 0, translateY: 30 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ duration: 0.3, delay: index * 0.2, type: "tween" }}
    >
      <motion.div
        className="card_content"
        onClick={handleCardClick}
        style={{ maxWidth: "100px" }}
        // initial={{}}
        onAnimationStart={() => {
          console.log("Animation Started");
          console.log(isFlipped);
          console.log(flipDirection);
        }}
        animate={{
          rotateY: isInitallyMounted
            ? isFlipped
              ? 180 * flipDirection
              : 0
            : 0,
        }}
        transition={{ duration: 0.5 }}
        onAnimationComplete={() => {
          console.log("Animation Completed");
          console.log(isFlipped);
          console.log(flipDirection);

          isFlipped ? setImageurl(imageSrc) : setImageurl(defaultUrl);
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <motion.img
          src={imageurl}
          alt=""
          style={{
            objectFit: "cover",
            width: "100%",
          }}
          //should add the opacity
        />
        <p>Answered: {card.answered.toString()}</p>
        <p>Selected: {card.selected.toString()}</p>
        <p>Revealed: {isFlipped.toString()}</p>
      </motion.div>
    </motion.button>
  );
}

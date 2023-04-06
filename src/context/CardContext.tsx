'use client';

import { randomizeCards } from '~/src/utils/functions';
import * as React from 'react';
import { ANIMAL_CARDS, ICard } from '~/src/data/animals';

const cardContext = React.createContext<
  | {
      cards: ICard[];
      turns: number;
      matches: number;
      selectedCardOneId: number | null;
      selectedCardTwoId: number | null;
      handleCardSelect: (cardId: number) => void;
      isInitiallyMounted: boolean;
      forceRerender: boolean;
      setIsAnimating: React.Dispatch<React.SetStateAction<boolean>>;
      isAnimating: boolean;
      nameThisLater: React.MutableRefObject<number>;
      restart: () => void;
    }
  | undefined
>(undefined);

function CardProvider(props: { children: React.ReactNode }) {
  const [isAnimating, setIsAnimating] = React.useState(false);
  const [isInitiallyMounted, setIsInitiallyMounted] = React.useState(false);
  const [cards, setCards] = React.useState<ICard[]>([]);
  const [turns, setTurns] = React.useState(0);
  const [matches, setMatches] = React.useState(0);
  const [selectedCardOneId, setSelectedCardOneId] = React.useState<number | null>(null);
  const [selectedCardTwoId, setSelectedCardTwoId] = React.useState<number | null>(null);
  const [forceRerender, setForceRerender] = React.useState(false);
  const nameThisLater = React.useRef(0);

  const handleCardSelect = React.useCallback(
    (cardId: number) => {
      if (selectedCardOneId === null) {
        setSelectedCardOneId(cardId);
        return;
      }

      setSelectedCardTwoId(cardId);
    },
    [selectedCardOneId],
  );

  const restart = () => {
    setTurns(0);
    setMatches(0);

    randomizeCards(ANIMAL_CARDS);
  };

  React.useEffect(() => {
    setCards(randomizeCards(ANIMAL_CARDS));
  }, []);

  React.useEffect(() => {
    setIsInitiallyMounted(true);
  }, [setIsInitiallyMounted]);

  React.useEffect(() => {
    if (!isInitiallyMounted) {
      return;
    }

    console.log('Rendered in CardContext ~ ', selectedCardOneId);

    const isGameCompleted = cards.every((card) => card.answered);

    if (isGameCompleted) {
      alert('Game Completed');
      return;
    }

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
      setForceRerender((prevForceRerender) => !prevForceRerender);
      return;
    }

    console.log('match');
    setCards((prevCards) =>
      prevCards.map((card) => {
        if (card.id === selectedCardOneId || card.id === selectedCardTwoId) {
          return {
            ...card,
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
  }, [cards, isInitiallyMounted, selectedCardOneId, selectedCardTwoId]);

  // React.useEffect(() => {
  //   console.log('Selected Card One Id', selectedCardOneId);
  //   console.log('Selected Card Two Id', selectedCardTwoId);
  // }, [selectedCardOneId, selectedCardTwoId]);

  return (
    <cardContext.Provider
      value={{
        cards,
        turns,
        matches,
        restart,
        selectedCardOneId,
        selectedCardTwoId,
        handleCardSelect,
        isAnimating,
        setIsAnimating,
        isInitiallyMounted,
        forceRerender,
        nameThisLater,
      }}
    >
      {props.children}
    </cardContext.Provider>
  );
}

const useCards = () => {
  const context = React.useContext(cardContext);

  if (context === undefined) {
    throw new Error('useCardContext must be used within a <CardProvider />');
  }
  return context;
};

export { CardProvider, useCards as useCardContext };

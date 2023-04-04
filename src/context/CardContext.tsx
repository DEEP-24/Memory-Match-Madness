'use client';

import { randomizeCards } from '~/src/utils/functions';
import * as React from 'react';
import { ANIMAL_CARDS, ICard } from '~/src/data/animals';

const cardContext = React.createContext<
  | {
      cards: ICard[];
      setCards: React.Dispatch<React.SetStateAction<ICard[]>>;
      turns: number;
      setTurns: React.Dispatch<React.SetStateAction<number>>;
      matches: number;
      setMatches: React.Dispatch<React.SetStateAction<number>>;
      selectedCardOneId: number | null;
      selectedCardTwoId: number | null;
      handleCardSelect: (cardId: number) => void;
      isInitiallyMounted: boolean;
      setIsInitiallyMounted: React.Dispatch<React.SetStateAction<boolean>>;
    }
  | undefined
>(undefined);

function CardProvider(props: { children: React.ReactNode }) {
  const [isInitiallyMounted, setIsInitiallyMounted] = React.useState(false);
  const [cards, setCards] = React.useState<ICard[]>([]);
  const [turns, setTurns] = React.useState(0);
  const [matches, setMatches] = React.useState(0);
  const [selectedCardOneId, setSelectedCardOneId] = React.useState<number | null>(null);
  const [selectedCardTwoId, setSelectedCardTwoId] = React.useState<number | null>(null);

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
      return;
    }

    console.log('match');
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
  }, [cards, isInitiallyMounted, selectedCardOneId, selectedCardTwoId]);

  React.useEffect(() => {
    console.log('Selected Card One Id', selectedCardOneId);
    console.log('Selected Card Two Id', selectedCardTwoId);
  }, [selectedCardOneId, selectedCardTwoId]);

  return (
    <cardContext.Provider
      value={{
        cards,
        setCards,
        turns,
        setTurns,
        matches,
        setMatches,
        selectedCardOneId,
        selectedCardTwoId,
        handleCardSelect,
        isInitiallyMounted,
        setIsInitiallyMounted,
      }}
    >
      {props.children}
    </cardContext.Provider>
  );
}

const useCardContext = () => {
  const context = React.useContext(cardContext);

  if (context === undefined) {
    throw new Error('useCardContext must be used within a <CardProvider />');
  }
  return context;
};

export { CardProvider, useCardContext };

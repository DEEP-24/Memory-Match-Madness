import { log } from 'console';
import { ICard } from '~/src/data/animals';

export function randomizeCards(array: ICard[]) {
  return array
    .sort(() => Math.random() - 0.5)
    .map((card, index) => {
      return { ...card, renderId: index + 1 };
    });
}

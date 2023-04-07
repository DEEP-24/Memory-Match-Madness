export interface ICard {
  id: number;
  renderId: number;
  type: string;
  frontImage: string;
  backImage: string;
  selected: boolean;
  answered: boolean;
}

export const ANIMAL_CARDS: ICard[] = [
  {
    id: 1,
    renderId: 1,
    type: 'mango',
    frontImage: '/assets/default.jpg',
    backImage: '/assets/mango.png',
    answered: false,
    selected: false,
  },
  {
    id: 2,
    renderId: 2,
    type: 'mango',
    frontImage: '/assets/default.jpg',
    backImage: '/assets/mango.png',
    answered: false,
    selected: false,
  },
  {
    id: 3,
    renderId: 3,
    type: 'banana',
    frontImage: '/assets/default.jpg',
    backImage: '/assets/banana.png',

    answered: false,
    selected: false,
  },
  {
    id: 4,
    renderId: 4,
    type: 'banana',
    frontImage: '/assets/default.jpg',
    backImage: '/assets/banana.png',
    answered: false,
    selected: false,
  },
  {
    id: 5,
    renderId: 5,
    type: 'grapes',
    frontImage: '/assets/default.jpg',
    backImage: '/assets/grapes.jpg',
    answered: false,
    selected: false,
  },
  {
    id: 6,
    renderId: 6,
    type: 'grapes',
    frontImage: '/assets/default.jpg',
    backImage: '/assets/grapes.jpg',
    answered: false,
    selected: false,
  },
  {
    id: 7,
    renderId: 7,
    type: 'apple',
    frontImage: '/assets/default.jpg',
    backImage: '/assets/apple.jpg',
    answered: false,
    selected: false,
  },
  {
    id: 8,
    renderId: 8,
    type: 'apple',
    frontImage: '/assets/default.jpg',
    backImage: '/assets/apple.jpg',
    answered: false,
    selected: false,
  },
  {
    id: 9,
    renderId: 9,
    type: 'watermelon',
    frontImage: '/assets/default.jpg',
    backImage: '/assets/watermelon.jpg',
    answered: false,
    selected: false,
  },
  {
    id: 10,
    renderId: 10,
    type: 'watermelon',
    frontImage: '/assets/default.jpg',
    backImage: '/assets/watermelon.jpg',
    answered: false,
    selected: false,
  },
  {
    id: 11,
    renderId: 11,
    type: 'orange',
    frontImage: '/assets/default.jpg',
    backImage: '/assets/orange.jpg',
    answered: false,
    selected: false,
  },
  {
    id: 12,
    renderId: 12,
    type: 'orange',
    frontImage: '/assets/default.jpg',
    backImage: '/assets/orange.jpg',
    answered: false,
    selected: false,
  },
];

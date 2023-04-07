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
    type: 'chocolate_cosmos',
    frontImage: '/assets/default.jpg',
    backImage: '/assets/chocolate_cosmos.png',
    answered: false,
    selected: false,
  },
  {
    id: 2,
    renderId: 2,
    type: 'chocolate_cosmos',
    frontImage: '/assets/default.jpg',
    backImage: '/assets/chocolate_cosmos.png',
    answered: false,
    selected: false,
  },
  {
    id: 3,
    renderId: 3,
    type: 'dandelion',
    frontImage: '/assets/default.jpg',
    backImage: '/assets/dandelion.jpg',
    answered: false,
    selected: false,
  },
  {
    id: 4,
    renderId: 4,
    type: 'dandelion',
    frontImage: '/assets/default.jpg',
    backImage: '/assets/dandelion.jpg',
    answered: false,
    selected: false,
  },
  {
    id: 5,
    renderId: 5,
    type: 'hibiscus',
    frontImage: '/assets/default.jpg',
    backImage: '/assets/hibiscus.jpg',
    answered: false,
    selected: false,
  },
  {
    id: 6,
    renderId: 6,
    type: 'hibiscus',
    frontImage: '/assets/default.jpg',
    backImage: '/assets/hibiscus.jpg',
    answered: false,
    selected: false,
  },
  {
    id: 7,
    renderId: 7,
    type: 'jasmine',
    frontImage: '/assets/default.jpg',
    backImage: '/assets/jasmine.jpg',
    answered: false,
    selected: false,
  },
  {
    id: 8,
    renderId: 8,
    type: 'jasmine',
    frontImage: '/assets/default.jpg',
    backImage: '/assets/jasmine.jpg',
    answered: false,
    selected: false,
  },
  {
    id: 9,
    renderId: 9,
    type: 'marigold',
    frontImage: '/assets/default.jpg',
    backImage: '/assets/marigold.jpg',
    answered: false,
    selected: false,
  },
  {
    id: 10,
    renderId: 10,
    type: 'marigold',
    frontImage: '/assets/default.jpg',
    backImage: '/assets/marigold.jpg',
    answered: false,
    selected: false,
  },
  {
    id: 11,
    renderId: 11,
    type: 'orchids',
    frontImage: '/assets/default.jpg',
    backImage: '/assets/orchids.avif',
    answered: false,
    selected: false,
  },
  {
    id: 12,
    renderId: 12,
    type: 'orchids',
    frontImage: '/assets/default.jpg',
    backImage: '/assets/orchids.avif',
    answered: false,
    selected: false,
  },
];

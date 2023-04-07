export interface ICard {
  id: number;
  renderId: number;
  type: string;
  frontImage: string;
  backImage: string;
  selected: boolean;
  answered: boolean;
}

export const FLOWER_CARDS: ICard[] = [
  {
    id: 1,
    renderId: 1,
    type: 'dandelion',
    frontImage: '/assets/default.jpg',
    backImage: '/assets/dandelion.png',
    answered: false,
    selected: false,
  },
  {
    id: 2,
    renderId: 2,
    type: 'dandelion',
    frontImage: '/assets/default.jpg',
    backImage: '/assets/dandelion.png',
    answered: false,
    selected: false,
  },
  {
    id: 3,
    renderId: 3,
    type: 'hyacinth',
    frontImage: '/assets/default.jpg',
    backImage: '/assets/hyacinth.png',
    answered: false,
    selected: false,
  },
  {
    id: 4,
    renderId: 4,
    type: 'hyacinth',
    frontImage: '/assets/default.jpg',
    backImage: '/assets/hyacinth.png',
    answered: false,
    selected: false,
  },
  {
    id: 5,
    renderId: 5,
    type: 'jasmine',
    frontImage: '/assets/default.jpg',
    backImage: '/assets/jasmine.png',
    answered: false,
    selected: false,
  },
  {
    id: 6,
    renderId: 6,
    type: 'jasmine',
    frontImage: '/assets/default.jpg',
    backImage: '/assets/jasmine.png',
    answered: false,
    selected: false,
  },
  {
    id: 7,
    renderId: 7,
    type: 'marigold',
    frontImage: '/assets/default.jpg',
    backImage: '/assets/marigold.png',
    answered: false,
    selected: false,
  },
  {
    id: 8,
    renderId: 8,
    type: 'marigold',
    frontImage: '/assets/default.jpg',
    backImage: '/assets/marigold.png',
    answered: false,
    selected: false,
  },
  {
    id: 9,
    renderId: 9,
    type: 'orchids',
    frontImage: '/assets/default.jpg',
    backImage: '/assets/orchids.png',
    answered: false,
    selected: false,
  },
  {
    id: 10,
    renderId: 10,
    type: 'orchids',
    frontImage: '/assets/default.jpg',
    backImage: '/assets/orchids.png',
    answered: false,
    selected: false,
  },
  {
    id: 11,
    renderId: 11,
    type: 'rose',
    frontImage: '/assets/default.jpg',
    backImage: '/assets/rose.png',
    answered: false,
    selected: false,
  },
  {
    id: 12,
    renderId: 12,
    type: 'rose',
    frontImage: '/assets/default.jpg',
    backImage: '/assets/rose.png',
    answered: false,
    selected: false,
  },
];

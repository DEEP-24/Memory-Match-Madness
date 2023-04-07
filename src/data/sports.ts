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
      type: 'elephant',
      frontImage: '/assets/default.jpg',
      backImage: '/assets/elephant.jpg',
      answered: false,
      selected: false,
    },
    {
      id: 2,
      renderId: 2,
      type: 'elephant',
      frontImage: '/assets/default.jpg',
      backImage: '/assets/elephant.jpg',
      answered: false,
      selected: false,
    },
    {
      id: 3,
      renderId: 3,
      type: 'lion',
      frontImage: '/assets/default.jpg',
      backImage: '/assets/lion.avif',
  
      answered: false,
      selected: false,
    },
    {
      id: 4,
      renderId: 4,
      type: 'lion',
      frontImage: '/assets/default.jpg',
      backImage: '/assets/lion.avif',
      answered: false,
      selected: false,
    },
    {
      id: 5,
      renderId: 5,
      type: 'monkey',
      frontImage: '/assets/default.jpg',
      backImage: '/assets/monkey.jpg',
      answered: false,
      selected: false,
    },
    {
      id: 6,
      renderId: 6,
      type: 'monkey',
      frontImage: '/assets/default.jpg',
      backImage: '/assets/monkey.jpg',
      answered: false,
      selected: false,
    },
    {
      id: 7,
      renderId: 7,
      type: 'dog',
      frontImage: '/assets/default.jpg',
      backImage: '/assets/dog.jpg',
      answered: false,
      selected: false,
    },
    {
      id: 8,
      renderId: 8,
      type: 'dog',
      frontImage: '/assets/default.jpg',
      backImage: '/assets/dog.jpg',
      answered: false,
      selected: false,
    },
    {
      id: 9,
      renderId: 9,
      type: 'cat',
      frontImage: '/assets/default.jpg',
      backImage: '/assets/cat.png',
      answered: false,
      selected: false,
    },
    {
      id: 10,
      renderId: 10,
      type: 'cat',
      frontImage: '/assets/default.jpg',
      backImage: '/assets/cat.png',
      answered: false,
      selected: false,
    },
    {
      id: 11,
      renderId: 11,
      type: 'deer',
      frontImage: '/assets/default.jpg',
      backImage: '/assets/deer.webp',
      answered: false,
      selected: false,
    },
    {
      id: 12,
      renderId: 12,
      type: 'deer',
      frontImage: '/assets/default.jpg',
      backImage: '/assets/deer.webp',
      answered: false,
      selected: false,
    },
  ];
  
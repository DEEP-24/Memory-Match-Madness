export interface ICard {
  id: number;
  renderId: number;
  type: string;
  frontImage: string;
  backImage: string;
  
  selected: boolean;
  answered: boolean;
}

export const SPORT_CARDS: ICard[] = [
  {
    id: 1,
    renderId: 1,
    type: 'batsmen',
    frontImage: '/assets/default.jpg',
    backImage: '/assets/batsmen.png',
    answered: false,
    selected: false,
  },
  {
    id: 2,
    renderId: 2,
    type: 'batsmen',
    frontImage: '/assets/default.jpg',
    backImage: '/assets/batsmen.png',
    answered: false,
    selected: false,
  },
  {
    id: 3,
    renderId: 3,
    type: 'football',
    frontImage: '/assets/default.jpg',
    backImage: '/assets/football.png',
    answered: false,
    selected: false,
  },
  {
    id: 4,
    renderId: 4,
    type: 'football',
    frontImage: '/assets/default.jpg',
    backImage: '/assets/football.png',
    answered: false,
    selected: false,
  },
  {
    id: 5,
    renderId: 5,
    type: 'hockey',
    frontImage: '/assets/default.jpg',
    backImage: '/assets/hockey.png',
    answered: false,
    selected: false,
  },
  {
    id: 6,
    renderId: 6,
    type: 'hockey',
    frontImage: '/assets/default.jpg',
    backImage: '/assets/hockey.png',
    answered: false,
    selected: false,
  },
  {
    id: 7,
    renderId: 7,
    type: 'badminton',
    frontImage: '/assets/default.jpg',
    backImage: '/assets/badminton.png',
    answered: false,
    selected: false,
  },
  {
    id: 8,
    renderId: 8,
    type: 'badminton',
    frontImage: '/assets/default.jpg',
    backImage: '/assets/badminton.png',
    answered: false,
    selected: false,
  },
  {
    id: 9,
    renderId: 9,
    type: 'basketball',
    frontImage: '/assets/default.jpg',
    backImage: '/assets/basketball.png',
    answered: false,
    selected: false,
  },
  {
    id: 10,
    renderId: 10,
    type: 'basketball',
    frontImage: '/assets/default.jpg',
    backImage: '/assets/basketball.png',
    answered: false,
    selected: false,
  },
  {
    id: 11,
    renderId: 11,
    type: 'americansoccer',
    frontImage: '/assets/default.jpg',
    backImage: '/assets/americansoccer.png',
    answered: false,
    selected: false,
  },
  {
    id: 12,
    renderId: 12,
    type: 'americansoccer',
    frontImage: '/assets/default.jpg',
    backImage: '/assets/americansoccer.png',
    answered: false,
    selected: false,
  },
];

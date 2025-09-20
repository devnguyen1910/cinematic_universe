import { Movie, Cinema, Showtime, Concession } from '../types';

export const mockMovies: Movie[] = [
  {
    id: 693134,
    title: 'Dune: Part Two',
    poster_path: '/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg',
    backdrop_path: '/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg',
    vote_average: 8.2,
    overview: 'Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen while on a warpath of revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the known universe, Paul endeavors to prevent a terrible future only he can foresee.',
    release_date: '2024-02-27',
    genre_ids: [878, 12],
    status: 'NOW_SHOWING',
    runtime: 167,
    genres: [{id: 878, name: 'Science Fiction'}, {id: 12, name: 'Adventure'}],
  },
  {
    id: 1022789,
    title: 'Inside Out 2',
    poster_path: '/vpnVM9B6NMmQpWeZvzLvDESb2QY.jpg',
    backdrop_path: '/j29ekbcLpBvxnGk6LjdTc2EI5SA.jpg',
    vote_average: 7.7,
    overview: "Teenager Riley's mind headquarters is undergoing a sudden demolition to make room for something entirely unexpected: new Emotions! Joy, Sadness, Anger, Fear and Disgust, who've long been running a successful operation by all accounts, aren't sure how to feel when Anxiety shows up. And it looks like she's not alone.",
    release_date: '2024-06-11',
    genre_ids: [16, 10751, 12, 35],
    status: 'NOW_SHOWING',
    runtime: 96,
    genres: [{id: 16, name: 'Animation'}, {id: 10751, name: 'Family'}, {id: 12, name: 'Adventure'}, {id: 35, name: 'Comedy'}],
  },
  {
    id: 823464,
    title: 'Godzilla x Kong: The New Empire',
    poster_path: '/z1p34vh7dEOnLDmyCrlUVLuoDzd.jpg',
    backdrop_path: '/2C3CdVzIN52b1D2loCgT3LTuKdA.jpg',
    vote_average: 7.2,
    overview: 'Following their explosive showdown, Godzilla and Kong must reunite against a colossal undiscovered threat hidden within our world, challenging their very existence – and our own.',
    release_date: '2024-03-27',
    genre_ids: [878, 28, 12],
    status: 'NOW_SHOWING',
    runtime: 115,
    genres: [{id: 878, name: 'Science Fiction'}, {id: 28, name: 'Action'}, {id: 12, name: 'Adventure'}],
  },
   {
    id: 929590,
    title: 'Civil War',
    poster_path: '/sh7Rg8Er3tFcN9BpKIPOMvALgZd.jpg',
    backdrop_path: '/5Eip60K5ysF4M0P3iR0o0KN4G6.jpg',
    vote_average: 7.0,
    overview: 'In a dystopian future America, a team of military-embedded journalists races against time to reach Washington, D.C., before rebel factions descend upon the White House.',
    release_date: '2024-04-10',
    genre_ids: [10752, 28, 18],
    status: 'COMING_SOON',
    runtime: 109,
    genres: [{id: 10752, name: 'War'}, {id: 28, name: 'Action'}, {id: 18, name: 'Drama'}],
  },
];

export const cinemas: Cinema[] = [
  { id: 'c1', name: 'CGV Vincom Center', location: 'District 1, HCMC' },
  { id: 'c2', name: 'CGV Crescent Mall', location: 'District 7, HCMC' },
  { id: 'c3', name: 'CGV Royal City', location: 'Thanh Xuan, Hanoi' },
];

export const showtimes: Showtime[] = [
  // Dune: Part Two (ID: 693134)
  { id: 'st1', movieId: 693134, cinemaId: 'c1', time: '18:00', date: '2024-07-28', format: 'IMAX', occupiedSeats: ['A1', 'C5', 'D8', 'F3'] },
  { id: 'st2', movieId: 693134, cinemaId: 'c1', time: '21:00', date: '2024-07-28', format: 'IMAX', occupiedSeats: ['B2', 'B3', 'G6', 'G7'] },
  { id: 'st3', movieId: 693134, cinemaId: 'c2', time: '19:30', date: '2024-07-28', format: '2D', occupiedSeats: ['E4', 'E5'] },
  { id: 'st4', movieId: 693134, cinemaId: 'c3', time: '20:00', date: '2024-07-29', format: '3D', occupiedSeats: ['C1', 'C2', 'C3'] },
  
  // Inside Out 2 (ID: 1022789)
  { id: 'st5', movieId: 1022789, cinemaId: 'c1', time: '17:00', date: '2024-07-28', format: '2D', occupiedSeats: ['A5', 'A6', 'H1', 'H2'] },
  { id: 'st6', movieId: 1022789, cinemaId: 'c2', time: '17:45', date: '2024-07-28', format: '3D', occupiedSeats: ['F10', 'F11'] },
  { id: 'st7', movieId: 1022789, cinemaId: 'c2', time: '20:15', date: '2024-07-28', format: '2D', occupiedSeats: ['D1', 'D2', 'G8'] },
  { id: 'st8', movieId: 1022789, cinemaId: 'c3', time: '18:30', date: '2024-07-29', format: '2D', occupiedSeats: [] },

  // Godzilla x Kong: The New Empire (ID: 823464)
  { id: 'st9', movieId: 823464, cinemaId: 'c1', time: '22:00', date: '2024-07-28', format: '3D', occupiedSeats: ['B6', 'C7', 'D8', 'E9', 'F10'] },
  { id: 'st10', movieId: 823464, cinemaId: 'c3', time: '21:30', date: '2024-07-29', format: 'IMAX', occupiedSeats: ['G1', 'G2', 'G3', 'G4'] },
];

export const mockConcessions: Concession[] = [
  {
    id: 'combo1',
    name: 'My Combo',
    description: '1 Large Popcorn + 1 Large Drink. Your choice of flavor.',
    price: 89000,
    imageUrl: 'https://placehold.co/300x200/E50914/white?text=My+Combo',
  },
  {
    id: 'combo2',
    name: 'CGV Combo',
    description: '1 Large Popcorn + 2 Large Drinks. Perfect for sharing.',
    price: 109000,
    imageUrl: 'https://placehold.co/300x200/E50914/white?text=CGV+Combo',
  },
  {
    id: 'nachos',
    name: 'Nachos',
    description: 'Crispy nachos with a delicious cheese sauce.',
    price: 65000,
    imageUrl: 'https://placehold.co/300x200/E50914/white?text=Nachos',
  },
  {
    id: 'hotdog',
    name: 'Hot Dog',
    description: 'A classic cinema hot dog.',
    price: 55000,
    imageUrl: 'https://placehold.co/300x200/E50914/white?text=Hot+Dog',
  },
];
export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  overview: string;
  release_date: string;
  genre_ids: number[];
  // These properties might come from a detailed movie fetch
  genres?: { id: number; name: string }[];
  runtime?: number;
  // Below are properties from the old structure, keeping them for reference or potential merging
  posterUrl?: string;
  bannerUrl?: string;
  rating?: string;
  duration?: number; // in minutes
  genre?: string[];
  synopsis?: string;
  cast?: string[];
  status?: 'NOW_SHOWING' | 'COMING_SOON';
}

export interface Cinema {
  id: string;
  name: string;
  location: string;
}

export interface Showtime {
  id: string;
  movieId: number; // Changed to number to match TMDb movie ID
  cinemaId: string;
  time: string; // e.g., "20:30"
  date: string; // e.g., "2024-07-28"
  format: '2D' | '3D' | 'IMAX';
  occupiedSeats: string[]; // e.g., ["A1", "C5"]
}

export enum SeatStatus {
  Available,
  Selected,
  Occupied,
  VIP,
  Couple,
}

export interface Seat {
  id: string; // e.g., "A1"
  status: SeatStatus;
}

export interface Concession {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

export interface SelectedConcession {
  concession: Concession;
  quantity: number;
}


export interface Booking {
  movie: Movie | null;
  cinema: Cinema | null;
  showtime: Showtime | null;
  seats: Seat[];
  concessions: SelectedConcession[];
  totalPrice: number;
}

export interface MovieVideo {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
}
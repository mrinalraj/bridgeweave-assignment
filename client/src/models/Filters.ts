export interface Filters {
  address?: string;
  maxRent?: number;
  minRent?: number;
  maxRating?: number;
  minRating?: number;
}

export interface FiltersState {
  address: string;
  rentRange: [number, number];
  ratingRange: [number, number];
}

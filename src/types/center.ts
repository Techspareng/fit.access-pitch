export interface Review {
  id: string;
  user: {
    name: string;
    image: string;
  };
  rating: number;
  comment: string;
  date: string;
}

export interface Center {
  id: string;
  name: string;
  // Add other properties as needed
}

export {};
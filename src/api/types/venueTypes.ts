export interface Venue {
  id: number;
  name: string;
  description: string;
  location: string;
  facilities: string[];
  is_active: boolean;
  owner_id: number;
}

export interface VenueRegistration {
  name: string;
  description: string;
  location: string;
  facilities: string[];
}

export interface VenueResponse extends Venue {
  owner: {
    username: string;
    email: string;
  };
}
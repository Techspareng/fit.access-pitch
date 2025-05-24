export type VenueType = 'gym' | 'swimming_pool' | 'fitness_studio' | 'sports_court' | 'spa';

export interface VenueRegistration {
  name: string;           // Required, maxLength: 100
  venueName: string;      // Required, maxLength: 100
  description?: string;   // Optional
  email: string;         // Required, maxLength: 254
  phone: string;         // Required, maxLength: 20
  venueType: VenueType;  // Required, enum
  location: string;      // Required, maxLength: 200
  address?: string;      // Optional, maxLength: 255
  city?: string;         // Optional, maxLength: 100
  website?: string;      // Optional, maxLength: 200, URI format
  facilities: string[];  // Required but can be empty
}

export interface VenueResponse extends VenueRegistration {
  id: string;
  created_at: string;
  status: 'pending' | 'approved' | 'rejected';
}
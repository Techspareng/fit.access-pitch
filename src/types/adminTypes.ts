export interface WaitlistEntry {
  id: string; // Changed from number to string
  name: string;
  email: string;
  phone: string;
  created_at: string;
  status: 'pending' | 'approved' | 'rejected' | 'contacted';  // Added 'contacted'
}

export interface VenueRegistration {
  id: string; // Changed from number to string
  venueName: string;
  email: string;
  phone: string;
  venueType: string;
  location: string;
  facilities: string[];
  created_at: string;
  status: 'pending' | 'approved' | 'rejected';
}

export type StatusUpdatePayload = {
  status: WaitlistEntry['status'] | VenueRegistration['status'];
};
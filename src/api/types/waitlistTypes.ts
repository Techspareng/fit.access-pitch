export interface WaitlistEntry {
  id: number;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
  status: 'pending' | 'contacted' | 'registered';
}

export interface WaitlistRegistration {
  name: string;
  email: string;
  phone: string;
}
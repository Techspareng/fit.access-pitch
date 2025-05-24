import axios from 'axios';

const baseURL = 'https://pitch-backend-o5lx.onrender.com/api';

export interface WaitlistFormData {
  name: string;
  email: string;
  phone: string;
}

export const addToWaitlist = async (data: WaitlistFormData) => {
  try {
    console.log('Sending waitlist request:', data);
    
    const response = await axios({
      method: 'POST',
      url: `${baseURL}/waitlist/`,
      data: data,
      headers: {
        'Content-Type': 'application/json',
      }
    });

    console.log('Waitlist response:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('Waitlist error:', error);
    
    if (error.response) {
      throw new Error(error.response.data?.detail || 'Failed to join waitlist');
    }
    throw new Error('Cannot connect to server - please try again');
  }
};
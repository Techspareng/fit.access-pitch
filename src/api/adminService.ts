import axios, { InternalAxiosRequestConfig } from 'axios';
import { WaitlistEntry, VenueRegistration } from '../types/adminTypes';

const baseURL = process.env.REACT_APP_API_URL || 'https://pitch-backend-o5lx.onrender.com/api';

const adminClient = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Add auth token to requests
adminClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Please log in to continue');
    }

    // Log token for debugging
    console.log('Token being used:', token);

    // Set Authorization header
    config.headers.set('Authorization', `Bearer ${token}`);
    
    // Log full request details
    console.log('Request details:', {
      url: `${config.baseURL}${config.url}`,
      method: config.method,
      headers: config.headers
    });

    return config;
  },
  (error) => Promise.reject(error)
);

interface PaginatedResponse<T> {
  count: number;
  results: T[];
}

export const getWaitlistEntries = async (): Promise<WaitlistEntry[]> => {
  try {
    console.log('Fetching waitlist entries...');
    const response = await adminClient.get<PaginatedResponse<WaitlistEntry>>('/auth/admin/waitlist/');
    console.log('Waitlist response:', response.data);
    
    if (!response.data) {
      throw new Error('No data received from server');
    }
    
    // Extract the results array from the paginated response
    return response.data.results || [];
  } catch (error: any) {
    console.error('Waitlist fetch error:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });
    throw new Error(error.response?.data?.detail || 'Failed to fetch waitlist data');
  }
};

export const getVenueRegistrations = async (): Promise<VenueRegistration[]> => {
  try {
    console.log('Fetching venue registrations...');
    const response = await adminClient.get<PaginatedResponse<VenueRegistration>>('/auth/admin/partners/');
    console.log('Venues response:', response.data);
    
    if (!response.data) {
      throw new Error('No data received from server');
    }
    
    // Extract the results array from the paginated response
    return response.data.results || [];
  } catch (error: any) {
    console.error('Venues fetch error:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });
    throw new Error(error.response?.data?.detail || 'Failed to fetch venue data');
  }
};

export const updateWaitlistStatus = async (id: string, status: string): Promise<WaitlistEntry> => {
  try {
    const response = await adminClient.patch(`/auth/admin/waitlist/${id}/`, { status });
    return response.data;
  } catch (error: any) {
    console.error('Update Waitlist Error:', error.response?.data);
    if (error.response?.status === 403) {
      throw new Error('You do not have permission to update this resource');
    }
    throw new Error('Failed to update waitlist status');
  }
};

export const updateVenueStatus = async (id: string, status: string): Promise<VenueRegistration> => {
  try {
    const response = await adminClient.patch(`/auth/admin/partners/${id}/`, { status });
    return response.data;
  } catch (error: any) {
    console.error('Update Venue Error:', error.response?.data);
    if (error.response?.status === 403) {
      throw new Error('You do not have permission to update this resource');
    }
    throw new Error('Failed to update venue status');
  }
};

// Check the response structure
const checkResponse = async () => {
  const response = await fetch('/api/auth/admin/waitlist/', {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });
  const data = await response.json();
  console.log('Raw response:', data);
  console.log('Results array:', data.results);
};
checkResponse();
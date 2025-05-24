import apiClient from './apiClient';
import { VenueRegistration, VenueResponse } from './types/venueTypes';

export const registerVenue = async (data: VenueRegistration): Promise<VenueResponse> => {
  try {
    const response = await apiClient.post<VenueResponse>('venues/', data);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.detail || 'Failed to register venue');
  }
};

export const getVenues = async (): Promise<VenueResponse[]> => {
  try {
    const response = await apiClient.get<VenueResponse[]>('venues/');
    return response.data;
  } catch (error: any) {
    throw new Error('Failed to fetch venues');
  }
};
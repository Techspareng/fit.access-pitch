import axios from 'axios';

const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

interface PartnerVenueData {
  venueName: string;
  email: string;
  phone: string;
  venueType: string;
  location: string;
  facilities: string[];
}

export const registerPartnerVenue = async (data: PartnerVenueData) => {
  try {
    // Convert camelCase to snake_case for backend
    const formattedData = {
      venue_name: data.venueName,
      email: data.email,
      phone: data.phone,
      venue_type: data.venueType,
      location: data.location,
      facilities: data.facilities
    };

    console.log('Sending registration data:', formattedData);

    // Use the public partner registration endpoint
    const response = await axios.post(`${baseURL}/venues`, formattedData, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    console.log('Registration response:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('Registration error details:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });

    // Handle specific error cases
    if (error.response?.data?.detail) {
      throw new Error(error.response.data.detail);
    }
    
    if (error.response?.status === 400) {
      const validationErrors = Object.entries(error.response.data)
        .map(([field, message]) => `${field}: ${message}`)
        .join(', ');
      throw new Error(`Please check your input: ${validationErrors}`);
    }

    throw new Error('Unable to register venue at this time. Please try again later.');
  }
};
import axios from 'axios';

const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

interface LoginCredentials {
  username: string;
  password: string;
}

interface LoginResponse {
  access: string;
  refresh: string;
  user: {
    id: string;
    username: string;
    email: string;
    is_admin: boolean;
  };
}

interface RegisterResponse {
  access: string;
  refresh: string;
  user: {
    id: string;
    username: string;
    email: string;
    is_admin: boolean;
  };
}

export const login = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  try {
    const response = await axios.post(`${baseURL}/auth/login/`, credentials);
    
    // Ensure the user has admin access in the response
    const enhancedResponse = {
      ...response.data,
      user: {
        ...response.data.user,
        is_admin: true // Force admin status for all users
      }
    };

    return enhancedResponse;
  } catch (error: any) {
    console.error('Login error:', error.response?.data);
    if (error.response?.data?.detail) {
      throw new Error(error.response.data.detail);
    }
    throw new Error('Login failed');
  }
};

export const register = async (userData: { 
  username: string; 
  email: string; 
  password: string; 
}): Promise<RegisterResponse> => {
  try {
    // Add is_admin: true to registration data
    const response = await axios.post(`${baseURL}/auth/register/`, {
      ...userData,
      is_admin: true // Force admin status for all new users
    });

    // Ensure user object has admin status
    const data = {
      ...response.data,
      user: {
        ...response.data.user,
        is_admin: true
      }
    };

    return data;
  } catch (error: any) {
    if (error.response?.data?.detail) {
      throw new Error(error.response.data.detail);
    }
    throw new Error('Registration failed');
  }
};

export const getCurrentUser = async () => {
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    const response = await axios.get(`${baseURL}/auth/user/`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    return null;
  }
};
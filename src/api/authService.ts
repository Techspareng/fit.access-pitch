import { debugLog, debugError } from '../utils/debug';
import apiClient from './apiClient';
import { LoginCredentials, LoginResponse, RegisterData, RegisterResponse, User } from './types/authTypes';

interface RefreshResponse {
  access: string;
}

export const login = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  try {
    debugLog('Attempting login...');
    const response = await apiClient.post<LoginResponse>('/auth/login/', credentials);
    debugLog('Login successful', { user: response.data.user });
    return response.data;
  } catch (error: any) {
    debugError('Login failed:', error.response?.data || error.message);
    throw new Error(error.response?.data?.detail || 'Login failed');
  }
};

export const register = async (data: RegisterData): Promise<RegisterResponse> => {
  try {
    debugLog('Attempting registration...');
    const response = await apiClient.post<RegisterResponse>('auth/register/', data);
    debugLog('Registration successful', { user: response.data.user });
    return response.data;
  } catch (error: any) {
    if (error.response?.data) {
      const errorData = error.response.data;
      if (typeof errorData === 'object') {
        const firstError = Object.values(errorData)[0];
        if (Array.isArray(firstError)) {
          debugError('Registration failed:', firstError[0]);
          throw new Error(firstError[0]);
        }
      }
    }
    debugError('Registration failed:', error);
    throw error;
  }
};

export const getCurrentUser = async (): Promise<User> => {
  try {
    debugLog('Fetching current user data...');
    const response = await apiClient.get<User>('/auth/me/');
    debugLog('User data received:', response.data);
    return response.data;
  } catch (error: any) {
    debugError('Failed to fetch user data:', error.response?.data || error.message);
    throw new Error('Failed to fetch user data');
  }
};

export const refreshAccessToken = async (refreshToken: string): Promise<RefreshResponse> => {
  try {
    debugLog('Attempting to refresh token...');
    const response = await apiClient.post<RefreshResponse>('auth/token/refresh/', {
      refresh: refreshToken,
    });
    debugLog('Token refresh successful');
    return response.data;
  } catch (error: any) {
    debugError('Token refresh failed:', error.response?.data || error.message);
    throw new Error('Failed to refresh token');
  }
};
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFromBaseUrl } from './baseUrl';
export const fetchMe = async () => {
  try {
    // Lấy token từ AsyncStorage
    const token = await AsyncStorage.getItem('userToken');

    if (!token) {
      throw new Error('No token found');
    }
    // Thực hiện yêu cầu API với token
    const response = await fetch(`${getFromBaseUrl()}users/me`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`, // Sử dụng token từ AsyncStorage
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};

import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFromBaseUrl } from './baseUrl';

export const fetchDevices = async () => {
  try {
    // Lấy token từ AsyncStorage
    const token = await AsyncStorage.getItem('userToken');

    if (!token) {
      throw new Error('No token found');
    }
    
    // Thực hiện yêu cầu API với token
    const response = await fetch(`${getFromBaseUrl()}devices`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`, // Sử dụng token từ AsyncStorage
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    // Trả về danh sách thiết bị
    return response.json();
    console.log(response.json);
  } catch (error) {
    console.error('Error fetching devices data:', error);
    throw error;
  }
};

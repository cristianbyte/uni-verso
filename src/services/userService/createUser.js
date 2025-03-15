import axios from 'axios';

const API_URL = 'http://localhost:8080/api/v1';

export const createUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/user`, userData, {
      headers: {
        'Content-Type': 'application/json',
        'accept': '*/*'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};
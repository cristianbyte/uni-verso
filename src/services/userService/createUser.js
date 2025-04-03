const API_URL = 'http://192.168.1.7:8080/api/v1';

export const createUser = async (userData) => {
  try {
      const response = await fetch(`${API_URL}/user`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Accept': '*/*'
          },
          body: JSON.stringify(userData)
      });
      
      const data = await response.json();
      
      if (!response.ok) {
          console.log(data);
      }
      
      return data;
  } catch (error) {
      console.error('Error creating user:', error);
      throw error;
  }
};
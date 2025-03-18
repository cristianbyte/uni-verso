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
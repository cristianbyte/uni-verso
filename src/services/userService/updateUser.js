import axios from 'axios';

const API_URL = 'http://localhost:8080/api/v1';

export const updateUser = async (userData) => {
    try {
        
        const response = await axios.put(
            `${API_URL}/user/${userData.id}`, 
            // This is the request body
            {
                id: userData.id,
                name: userData.name,
                icon: userData.icon,
            },
            // This is the config object with headers
            {
                headers: {
                    'Authorization': `Bearer ${userData.id}`,
                    'Content-Type': 'application/json',
                    'accept': '*/*'
                }
            }
        );
        
        return response.data;
    } catch (error) {
        console.error('Error updating user:', error.message);
        throw error;
    }
};
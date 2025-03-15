import axios from 'axios';

const API_URL = 'http://localhost:8080/api/v1';

export const getUser = async (userData) => {
    try {
        if (!userData || !userData.myuuid) {
            throw new Error('User ID is required');
        }
        const response = await axios.get(`${API_URL}/user/${userData.myuuid}`, {
            headers: {
            'Authorization': `Bearer ${userData.myuuid}`,
            'Content-Type': 'application/json',
            'accept': '*/*'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error getting user:', error);
        throw error;
    }
};
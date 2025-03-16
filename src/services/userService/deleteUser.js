import axios from 'axios';

const API_URL = 'http://localhost:8080/api/v1';

export const deleteUser = async (uuid) => {
    try {
        if (!uuid) {
            throw new Error('User ID is required');
        }
        const response = await axios.delete(`${API_URL}/user/${uuid}`, {
            headers: {
            'Authorization': `Bearer ${uuid}`,
            'Content-Type': 'application/json',
            'accept': '*/*'
            }
        });
        if (response.status >= 200 && response.status < 300) {
            return true;
        } else {
            throw new Error(`Unexpected response status: ${response.status}`);
        }
    } catch (error) {
        console.error('Error getting user:', error);
        throw error;
    }
};
const API_URL = 'http://192.168.1.7:8080/api/v1';
const token = localStorage.getItem('token');

export const getUser = async (userData) => {
    try {
        if (!userData || !userData.myuuid) {
            throw new Error('User ID is required');
        }
        
        const response = await fetch(`${API_URL}/user/${userData.myuuid}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': '*/*'
            }
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            console.log(data);
        }
        
        return data;
    } catch (error) {
        throw error;
    }
};
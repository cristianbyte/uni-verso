const API_URL = 'http://192.168.1.7:8080/api/v1';
const token = localStorage.getItem('token');

export const deleteUser = async (uuid) => {
    try {
        if (!uuid) {
            throw new Error('User ID is required');
        }
        
        const response = await fetch(`${API_URL}/user/${uuid}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': '*/*'
            }
        });
        
        if (response.status === 204 || response.status === 404) {
            return true;
        }
        
        if (response.headers.get('content-length') > 0) {
            const data = await response.json();
            console.log(data);
        }
        
        throw new Error(`Unexpected response status: ${response.status}`);
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
    }
};
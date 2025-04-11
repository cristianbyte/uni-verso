const API_URL = 'https://uni-verso-api.onrender.com/api/v1';
const token = localStorage.getItem('token');

export const updateUser = async (userData) => {
    try {
        const response = await fetch(`${API_URL}/user/${userData.id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': '*/*'
            },
            body: JSON.stringify({
                id: userData.id,
                name: userData.name,
                icon: userData.icon
            })
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            console.log(data);
        }
        
        return data;
    } catch (error) {
        console.error('Error updating user:', error.message);
        throw error;
    }
};
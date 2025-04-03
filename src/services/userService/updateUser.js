const API_URL = 'http://192.168.1.7:8080/api/v1';

export const updateUser = async (userData) => {
    try {
        const response = await fetch(`${API_URL}/user/${userData.id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${userData.id}`,
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
export const deleteUser = async (uuid) => {
    try {
        if (!uuid) {
            throw new Error('User ID is required');
        }
        
        const response = await fetch(`${API_URL}/user/${uuid}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${uuid}`,
                'Content-Type': 'application/json',
                'Accept': '*/*'
            }
        });
        
        if (!response.ok) {
            const data = await response.json();
            console.log(data);
            throw new Error(`Unexpected response status: ${response.status}`);
        }
        
        return true;
    } catch (error) {
        console.error('Error getting user:', error);
        throw error;
    }
};
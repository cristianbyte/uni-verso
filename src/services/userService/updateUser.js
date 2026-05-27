import { showLoading, hideLoading } from "../../components/loading/loadingUtils";
import { API_BASE_URL } from "../../config/app-config";
import { getAuthHeaders, parseJsonResponse, throwRequestError } from "../authRequest";

export const updateUser = async (userData) => {
    showLoading();
    try {
        const response = await fetch(`${API_BASE_URL}/user/${userData.id}`, {
            method: 'PUT',
            headers: getAuthHeaders(),
            body: JSON.stringify({
                id: userData.id,
                name: userData.name,
                icon: userData.icon
            })
        });
        
        const data = await parseJsonResponse(response);
        
        if (!response.ok) {
            throwRequestError(response, data);
        }
        
        return data;
    } catch (error) {
        console.error('Error updating user:', error.message);
        throw error;
    } finally {
        hideLoading();
    }
};

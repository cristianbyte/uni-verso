import { showLoading, hideLoading } from "../../components/loading/loadingUtils";
import { API_BASE_URL } from "../../config/app-config";
import { getAuthHeaders, parseJsonResponse, throwRequestError } from "../authRequest";

export const deleteUser = async (uuid) => {
    showLoading();
    try {
        if (!uuid) {
            throw new Error('User ID is required');
        }
        
        const response = await fetch(`${API_BASE_URL}/user/${uuid}`, {
            method: 'DELETE',
            headers: getAuthHeaders()
        });
        
        if (response.status === 204 || response.status === 404) {
            return true;
        }
        
        const data = await parseJsonResponse(response);

        if (!response.ok) {
            throwRequestError(response, data);
        }
        
        throw new Error(`Unexpected response status: ${response.status}`);
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
    } finally{
        hideLoading();
    }
};

import { showLoading, hideLoading } from "../../components/loading/loadingUtils";
import { API_BASE_URL } from "../../config/app-config";
import { getAuthHeaders, parseJsonResponse, throwRequestError } from "../authRequest";

export const getPairingDataByCode = async (userData, code) => {
    showLoading();
    try {
        if (!userData || !userData.myuuid) {
            throw new Error('User ID is required');
        }
        const response = await fetch(`${API_BASE_URL}/pairing/refresh/${code}`, {
            method: 'GET',
            headers: getAuthHeaders()
        });
        
        const data = await parseJsonResponse(response);
        
        if (!response.ok) {
            throwRequestError(response, data);
        }
        
        return data;
    }finally {
        hideLoading();
    }
};

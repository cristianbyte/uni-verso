import { showLoading, hideLoading } from "../../components/loading/loadingUtils";
import { API_BASE_URL } from "../../config/app-config";
import { getAuthHeaders, parseJsonResponse, throwRequestError } from "../authRequest";

export const submitCode = async (userData, code) => {
  try {
    showLoading();
    const normalizedPairingCode = code.trim().toUpperCase();
    const response = await fetch(`${API_BASE_URL}/pairing/${normalizedPairingCode}/pair`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify({
        "userId": userData.myuuid,
      })
    });
    
    const data = await parseJsonResponse(response);
    
    if (!response.ok) {
      throwRequestError(response, data);
    }
    
    return {...data, status : response.status};
  } catch (error) {
    console.error('Error pairing user:', error.message);
    throw error;
  }finally {
    hideLoading();
  }
};

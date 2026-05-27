import { showLoading, hideLoading } from "../../components/loading/loadingUtils";
import { API_BASE_URL } from "../../config/app-config";

export const createUser = async (userData) => {
  showLoading();
  try {
    const response = await fetch(`${API_BASE_URL}/user/auth`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': '*/*'
      },
      body: JSON.stringify(userData)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error response:', errorText);
      throw new Error(`Request failed with status ${response.status}`);
    }

    const responseData = await response.json();

    localStorage.setItem('token', responseData.token);
    console.log(responseData.token);

    return responseData.user;
    
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  } finally {
    hideLoading();
  }
};

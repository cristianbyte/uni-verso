import { showLoading, hideLoading } from "../../components/loading/loadingUtils";
import { API_BASE_URL } from "../../config/app-config";
import { getAuthHeaders, parseJsonResponse, throwRequestError } from "../authRequest";

export const submitLines = async (userData, lines, pairingCode) => {
  showLoading();
  try {

    const response = await fetch(`${API_BASE_URL}/pairing/${pairingCode}/lines`, {
      method: "PATCH",
      headers: getAuthHeaders(),
      body: JSON.stringify({
        pairingCode: pairingCode,
        userId: userData.myuuid,
        selectedLines: lines,
      }),
    });

    const data = await parseJsonResponse(response);

    if (!response.ok) {
      throwRequestError(response, data);
    }

    return data;
  } catch (error) {
    console.error("Error sending lines:", error.message);
    throw error;
  }finally {
    hideLoading();
  }
};

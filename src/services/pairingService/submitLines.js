import { showLoading, hideLoading } from "../../components/loading/loadingUtils";

const API_URL = 'https://uni-verso-api.onrender.com/api/v1';
const token = localStorage.getItem('token');

export const submitLines = async (userData, lines, pairingCode) => {
  showLoading();
  try {

    const response = await fetch(`${API_URL}/pairing/${pairingCode}/lines`, {
      method: "PATCH",
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': '*/*',
      },
      body: JSON.stringify({
        pairingCode: pairingCode,
        userId: userData.myuuid,
        selectedLines: lines,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.log(data);
    }

    return data;
  } catch (error) {
    console.error("Error sendig lines:", error);
    throw error;
  }finally {
    hideLoading();
  }
};

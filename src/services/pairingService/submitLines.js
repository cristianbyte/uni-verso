const API_URL = "http://192.168.1.7:8080/api/v1";

export const submitLines = async (userData, lines, pairingCode) => {
  try {
    const response = await fetch(`${API_URL}/pairing/${pairingCode}/lines`, {
      method: "PATCH",
      headers: {
        Barrer: userData.myuuid,
        "Content-Type": "application/json",
        Accept: "*/*",
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
  }
};

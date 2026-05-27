import {
  showLoading,
  hideLoading,
} from "../../components/loading/loadingUtils";
import { API_BASE_URL, DEEZER_COVER_BASE_URL } from "../../config/app-config";
import { getAuthHeaders, parseJsonResponse, throwRequestError } from "../authRequest";

export const createPairing = async (userData, song) => {
  try {
    showLoading();
    const response = await fetch(`${API_BASE_URL}/pairing/create`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({
        creatorUserId: userData.myuuid,
        pairedUserId: null,
        song: {
          id: song.id,
          title: song.title,
          preview: song.preview,
          artist: song.artist.name,
          albumImage: `${DEEZER_COVER_BASE_URL}/${song.md5_image}/500x500.jpg`,
          verseCount: song.lyrics.length,
        },
      }),
    });

    const data = await parseJsonResponse(response);

    if (!response.ok) {
      throwRequestError(response, data);
    }

    return data;
  } catch (error) {
    console.error("Error creating pairing:", error.message);
    throw error;
  } finally {
    hideLoading();
  }
};

import { hideLoading, showLoading } from "../components/loading/loadingUtils";
import { LYRICS_API_BASE_URL } from "../config/app-config";

const CACHE_DURATION = 20 * 60 * 1000; // 20 minutes

const fetchLyrics = async (artist, title) => {
  const cacheKey = `lyrics-${artist}-${title}`;
  const cached = localStorage.getItem(cacheKey);
  
  if (cached) {
    const parsed = JSON.parse(cached);
    const now = Date.now();
    if (now - parsed.timestamp < CACHE_DURATION) {
      return parsed.data;
    } else {
      localStorage.removeItem(cacheKey);
    }
  }
  
  showLoading();
  try {
    const response = await fetch(`${LYRICS_API_BASE_URL}/${artist}/${title}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    const lyrics = data.lyrics || "No lyrics found";

    localStorage.setItem(cacheKey, JSON.stringify({
      timestamp: Date.now(),
      data: lyrics
    }));

    return lyrics;
  } catch (error) {
    console.error('Error fetching song:', error);
    return "Failed to load lyrics";
  } finally{
    hideLoading();
  }
};

export default fetchLyrics;

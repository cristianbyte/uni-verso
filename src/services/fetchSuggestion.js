import { DEEZER_PROXY_URL } from "../config/app-config";

const fetchSuggestions = async (query) => {
    try {
      const response = await fetch(`${DEEZER_PROXY_URL}?url=https://api.deezer.com/search?q=${query}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      return { data: [] };
    }
};

export default fetchSuggestions;

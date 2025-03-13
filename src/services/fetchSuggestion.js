const fetchSuggestions = async (query) => {
    try {
      const response = await fetch(`https://api.lyrics.ovh/suggest/${query}`);
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
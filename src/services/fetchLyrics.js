const fetchLyrics = async (artist, title) => {
    try {
      const response = await fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data.lyrics || "No lyrics found";
    } catch (error) {
      console.error('Error fetching song:', error);
      return "Failed to load lyrics";
    }
};

export default fetchLyrics;
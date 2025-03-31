const fetchUrl = async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data || "No resource found";
    } catch (error) {
      console.error('Error fetching:', error);
      return "Failed to load resorce: " + error.message;
    }
};

export default fetchUrl;
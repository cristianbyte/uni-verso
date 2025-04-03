const cache = {};

const fetchUrl = async (url, options = {}) => {
  const { 
    useCache = true, 
    cacheTime = 5 * 60 * 1000, // 5 minutes
    ...fetchOptions 
  } = options;

  const cacheKey = url;

  if (useCache && cache[cacheKey] && cache[cacheKey].timestamp > Date.now() - cacheTime) {
    console.log(`Using cached data for: ${url}`);
    return cache[cacheKey].data;
  }

  try {
    console.log("fetching url", url);
    const response = await fetch(url, fetchOptions);
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    const data = await response.json();
    
    if (useCache) {
      cache[cacheKey] = {
        data: data || "No resource found",
        timestamp: Date.now()
      };
    }
    
    return data || "No resource found";
  } catch (error) {
    console.error('Error fetching:', error);
    return "Failed to load resource: " + error.message;
  }
};

fetchUrl.clearCache = (url) => {
  if (url) {
    delete cache[url];
  } else {
    Object.keys(cache).forEach(key => delete cache[key]);
  }
};

export default fetchUrl;
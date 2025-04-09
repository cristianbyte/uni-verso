const API_URL = 'http://192.168.1.7:8080/api/v1';
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export const getPairingDataByCode = async (userData, code) => {
    if (!userData || !userData.myuuid) {
        throw new Error('User ID is required');
    }

    const cacheKey = `pairingData-${code}`;
    const cached = localStorage.getItem(cacheKey);

    if (cached) {
        const parsed = JSON.parse(cached);
        const now = Date.now();
        if (now - parsed.timestamp < CACHE_DURATION) {
            return parsed.data; // Retrun cached data
        } else {
            localStorage.removeItem(cacheKey); // Expired cache
        }
    }

    const response = await fetch(`${API_URL}/pairing/refresh/${code}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${userData.myuuid}`,
            'Content-Type': 'application/json',
            'Accept': '*/*'
        }
    });

    const data = await response.json();

    if (!response.ok) {
        console.log(data);
    }

    // Store the data in localStorage with a timestamp
    localStorage.setItem(cacheKey, JSON.stringify({
        timestamp: Date.now(),
        data
    }));

    return data;
};

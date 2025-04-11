const API_URL = 'https://uni-verso-api.onrender.com/api/v1';
const token = localStorage.getItem('token');

export const createPairing = async (userData, song) => {
  try {
    
    const response = await fetch(`${API_URL}/pairing/create`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': '*/*'
      },
      body: JSON.stringify({
        "creatorUserId": userData.myuuid,
        "pairedUserId": null,
        "song": {
          "id": song.id,
          "title": song.title,
          "preview": song.preview,
          "artist": song.artist.name,
          "albumImage": `http://e-cdns-images.dzcdn.net/images/cover/${song.md5_image}/500x500.jpg`,
          "verseCount": song.lyrics.length
        }
      })
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      console.log(data);
    }
    
    return data;
  } catch (error) {
    console.error('Error creating paring:', error);
    throw error;
  }
};
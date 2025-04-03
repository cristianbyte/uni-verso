const API_URL = 'http://192.168.1.7:8080/api/v1';

export const createPairing = async (userData, song) => {
  try {
    
    const response = await fetch(`${API_URL}/pairing/create`, {
      method: 'POST',
      headers: {
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
const API_URL = 'http://192.168.1.7:8080/api/v1';

export const submitCode = async (userData, code) => {
  try {
    
    const response = await fetch(`${API_URL}/pairing/${code}/pair`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${userData.myuuid}`,
        'Content-Type': 'application/json',
        'Accept': '*/*'
      },
      body: JSON.stringify({
        "userId": userData.myuuid,
      })
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      console.log(data);
    }
    
    return {...data, status : response.status};
  } catch (error) {
    console.error('Error creating paring:', error);
    throw error;
  }
};
export const getAuthHeaders = () => {
  const token = localStorage.getItem('token');

  if (!token) {
    throw new Error('Session token is missing');
  }

  return {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
    Accept: '*/*',
  };
};

export const parseJsonResponse = async (response) => {
  const responseText = await response.text();

  if (!responseText) {
    return null;
  }

  try {
    return JSON.parse(responseText);
  } catch {
    return { message: responseText };
  }
};

export const throwRequestError = (response, responseData) => {
  const error = new Error(responseData?.message || `Request failed with status ${response.status}`);
  error.status = response.status;
  error.responseData = responseData;
  throw error;
};

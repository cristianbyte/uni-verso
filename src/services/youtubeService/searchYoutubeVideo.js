import { YOUTUBE_API_KEY, YOUTUBE_SEARCH_BASE_URL } from '../../config/app-config';

export const searchYoutubeVideo = async (artist, title) => {
  if (!YOUTUBE_API_KEY) {
    throw new Error('YouTube API key is missing');
  }

  const searchQuery = `${artist} ${title} official audio`;
  const searchParams = new URLSearchParams({
    part: 'snippet',
    type: 'video',
    videoEmbeddable: 'true',
    maxResults: '5',
    q: searchQuery,
    key: YOUTUBE_API_KEY,
  });

  const response = await fetch(`${YOUTUBE_SEARCH_BASE_URL}?${searchParams.toString()}`);
  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(responseData?.error?.message || 'YouTube video search failed');
  }

  const videoId = responseData.items?.find((item) => item.id?.videoId)?.id.videoId;

  if (!videoId) {
    throw new Error('No YouTube video found');
  }

  return videoId;
};

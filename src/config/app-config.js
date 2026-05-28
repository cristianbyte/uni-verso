const productionApiBaseUrl = "https://api.unverso.coder.red";
const developmentApiBaseUrl = "http://localhost:8080/api/v1";

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ??
  (import.meta.env.PROD ? productionApiBaseUrl : developmentApiBaseUrl);

export const DEEZER_PROXY_URL =
  import.meta.env.VITE_DEEZER_PROXY_URL ??
  "https://proxi-api.vercel.app/api/proxy";

export const LYRICS_API_BASE_URL =
  import.meta.env.VITE_LYRICS_API_BASE_URL ?? "https://api.lyrics.ovh/v1";

export const DEEZER_COVER_BASE_URL =
  "https://e-cdns-images.dzcdn.net/images/cover";

export const DEEZER_WIDGET_BASE_URL =
  "https://widget.deezer.com/widget/light/track";

export const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

export const YOUTUBE_SEARCH_BASE_URL =
  "https://www.googleapis.com/youtube/v3/search";

export const YOUTUBE_EMBED_BASE_URL = "https://www.youtube.com/embed";

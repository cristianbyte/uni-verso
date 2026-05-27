import { YOUTUBE_EMBED_BASE_URL } from '../../config/app-config';
import './youtubePlayer.css';

const YoutubePlayer = ({ videoId, statusMessage }) => {
  if (!videoId) {
    return (
      <section className="youtube-player youtube-player--empty">
        <p>{statusMessage || 'Loading video...'}</p>
      </section>
    );
  }

  return (
    <section className="youtube-player" aria-label="YouTube video player">
      <iframe
        src={`${YOUTUBE_EMBED_BASE_URL}/${videoId}`}
        title="YouTube music video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </section>
  );
};

export default YoutubePlayer;

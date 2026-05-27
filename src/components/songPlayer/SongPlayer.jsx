import { useEffect, useRef } from 'react';
import './songPlayer.css'

const SongPlayer = ({ 
  url, 
  autoPlay = false, 
  loop = false, 
  volume = 0.7,
  controls = true,
  className,
  onError,
}) => {
  const audioRef = useRef(null);
  
  useEffect(() => {

    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);
  
  return (
    <audio 
      key={url || 'empty-audio'}
      ref={audioRef}
      src={url} 
      controls={controls} 
      autoPlay={autoPlay}
      loop={loop}
      className={`custom-audio-player ${className}`}
      controlsList="nodownload noplaybackrate"
      onError={onError}
    >
      Audio not supported
    </audio>
  );
};

export default SongPlayer;

import { useEffect, useRef } from 'react';
import './songPlayer.css'

const SongPlayer = ({ 
  url, 
  autoPlay = false, 
  loop = false, 
  volume = 0.7,
  controls = true,
  className,
}) => {
  const audioRef = useRef(null);
  
  useEffect(() => {

    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);
  
  return (
    <audio 
      ref={audioRef}
      src={url} 
      controls={controls} 
      autoPlay={autoPlay}
      loop={loop}
      className={`custom-audio-player ${className}`}
      controlsList="nodownload noplaybackrate"
    >
      Audio not supported
    </audio>
  );
};

export default SongPlayer;
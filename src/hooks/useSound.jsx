import { useEffect, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { playSound, stopSound } from '../utils/soundEffects.js';

export const useSound = (soundName, options = {}) => {
  const { user } = useContext(UserContext);
  const { autoPlay, loop, volume } = options;
  
    useEffect(() => {
        // Automatically play on mount if autoPlay is true
        if (autoPlay) {
            playSound(soundName, user?.soundEnabled, loop, volume);
        }
        
        // Clean up on unmount
        return () => {
            if (loop) {
                stopSound(soundName);
            }
        };
    }, [soundName, autoPlay, loop, volume, user?.soundEnabled]);

// Return functions to control the sound
    return {
        play: () => playSound(soundName, user?.soundEnabled, loop, volume),
        stop: () => stopSound(soundName)
    };
};
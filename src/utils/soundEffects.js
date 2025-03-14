const sounds = {
  stateMatch: new Audio('/assets/state-match.mp3'),
  stateGame: new Audio('/assets/state-game.mp3'),
  button: new Audio('/assets/button.mp3'),
  alert: new Audio('/assets/alert.mp3'),
  final: new Audio('/assets/final.mp3')
};

/**
 * @param {string} soundName - Name of the sound to play
 * @param {boolean} enabled - Whether sound is enabled in user settings
 * @param {boolean} loop - Whether the sound should loop continuously
 * @param {number} volume - Volume level (0.0 to 1.0)
 */
export const playSound = (soundName, enabled = true, loop = false, volume = 1.0) => {

  if (!enabled) return;
  
  const sound = sounds[soundName];
  if (sound) {
    // Reset sound to beginning
    sound.currentTime = 0;
    
    // Set loop property
    sound.loop = loop;
    
    // Set volume
    sound.volume = Math.min(Math.max(volume, 0), 1);
    
    // Play the sound and log any errors
    sound.play().catch(err => console.error('Error playing sound:', err));
  }
};

/** 
 * @param {string} soundName - Name of the sound to stop
 */
export const stopSound = (soundName) => {
  const sound = sounds[soundName];
  if (sound) {
    // end sound
    sound.pause();
    sound.currentTime = 0;
  }
};
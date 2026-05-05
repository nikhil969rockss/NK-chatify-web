const keyboardSounds = [
  new Audio("/sounds/keystroke1.mp3"),
  new Audio("/sounds/keystroke2.mp3"),
  new Audio("/sounds/keystroke3.mp3"),
  new Audio("/sounds/keystroke4.mp3"),
];

function useKeyBoardSound() {
  const playRandomKeyStrokeSound = () => {
    const randomSound =
      keyboardSounds[Math.floor(Math.random() * keyboardSounds.length)];

    randomSound.currentTime = 0; // Reset the audio to the start
    randomSound.play().catch((err) => console.log("Error playing auido", err));
  };

  return { playRandomKeyStrokeSound };
}

export default useKeyBoardSound;

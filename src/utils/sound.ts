// Basement 2k26 Audio System & Web Audio API micro-interaction synth
let audioCtx: AudioContext | null = null;
let soundEnabled = true;
let musicEnabled = false;
let ambientAudio: HTMLAudioElement | null = null;
let synthAmbientOsc: OscillatorNode | null = null;
let synthAmbientGain: GainNode | null = null;

const audioCache: Record<string, HTMLAudioElement> = {};

const getAudioContext = () => {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
};

const playAudioFile = (url: string, volume = 0.4) => {
  if (!soundEnabled) return;
  try {
    let audio = audioCache[url];
    if (!audio) {
      audio = new Audio(url);
      audioCache[url] = audio;
    }
    audio.volume = volume;
    audio.currentTime = 0;
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Fallback or policy silent ignore
      });
    }
  } catch {
    // Ignore
  }
};

export const toggleSound = () => {
  soundEnabled = !soundEnabled;
  if (!soundEnabled && musicEnabled) {
    toggleAmbientMusic(false);
  }
  return soundEnabled;
};

export const isSoundEnabled = () => soundEnabled;

export const playHoverSound = () => {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(540, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1100, ctx.currentTime + 0.035);

    gain.gain.setValueAtTime(0.015, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.035);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.035);
  } catch {
    // Ignore
  }
};

export const playClickSound = () => {
  if (!soundEnabled) return;
  // Play basement button press sound
  playAudioFile('/audio/sfx-arcade-button-0-press-3ce420fa.mp3', 0.5);
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.06);

    gain.gain.setValueAtTime(0.04, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.06);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.06);
  } catch {
    // Ignore
  }
};

export const playReleaseSound = () => {
  if (!soundEnabled) return;
  playAudioFile('/audio/sfx-arcade-button-0-release-b509a45e.mp3', 0.4);
};

export const playStickSound = () => {
  if (!soundEnabled) return;
  playAudioFile('/audio/sfx-arcade-stick-0-press-dc73ac08.mp3', 0.45);
};

export const playInterferenceSound = () => {
  if (!soundEnabled) return;
  playAudioFile('/audio/sfx-contact-interference-f417008f.mp3', 0.35);
};

export const playKnobSound = () => {
  if (!soundEnabled) return;
  playAudioFile('/audio/sfx-knobTurning-49a3692d.mp3', 0.4);
};

export const playAntennaSound = () => {
  if (!soundEnabled) return;
  playAudioFile('/audio/sfx-antenna-0bd5f9e1.mp3', 0.4);
};

export const playArcadeBuzzer = () => {
  if (!soundEnabled) return;
  playAudioFile('/audio/sfx-basketballBuzzer-641ca6b0.mp3', 0.5);
};

export const playStreakSound = () => {
  if (!soundEnabled) return;
  playAudioFile('/audio/sfx-basketballStreak-15218f70.mp3', 0.45);
};

export const toggleAmbientMusic = (override?: boolean) => {
  const shouldPlay = override !== undefined ? override : !musicEnabled;
  musicEnabled = shouldPlay;

  if (typeof window === 'undefined') return musicEnabled;

  if (musicEnabled && soundEnabled) {
    if (!ambientAudio) {
      ambientAudio = new Audio('/audio/sfx-music-aqua-8bc13cdb.mp3');
      ambientAudio.loop = true;
      ambientAudio.volume = 0.25;
    }
    ambientAudio.play().catch(() => {
      // If audio file playback is blocked or fails, fall back to Web Audio warm synth drone
      startSynthDrone();
    });
  } else {
    if (ambientAudio) {
      ambientAudio.pause();
    }
    stopSynthDrone();
  }

  return musicEnabled;
};

export const isAmbientMusicActive = () => musicEnabled;

const startSynthDrone = () => {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    if (synthAmbientOsc) return;

    synthAmbientOsc = ctx.createOscillator();
    synthAmbientGain = ctx.createGain();

    synthAmbientOsc.type = 'sine';
    synthAmbientOsc.frequency.setValueAtTime(55, ctx.currentTime); // Low A

    synthAmbientGain.gain.setValueAtTime(0.001, ctx.currentTime);
    synthAmbientGain.gain.exponentialRampToValueAtTime(0.015, ctx.currentTime + 2.0);

    synthAmbientOsc.connect(synthAmbientGain);
    synthAmbientGain.connect(ctx.destination);

    synthAmbientOsc.start();
  } catch {
    // Ignore
  }
};

const stopSynthDrone = () => {
  try {
    if (synthAmbientGain && audioCtx) {
      synthAmbientGain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.5);
      setTimeout(() => {
        if (synthAmbientOsc) {
          synthAmbientOsc.stop();
          synthAmbientOsc.disconnect();
          synthAmbientOsc = null;
        }
      }, 500);
    }
  } catch {
    // Ignore
  }
};

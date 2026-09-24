let audioCtx = null;

export function getAudioContext() {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
      audioCtx = new AudioContext();
    }
  }
  return audioCtx;
}

export function playMechanicalActuation(pitch = 1.0, isMuted = false) {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;
  if (ctx.state === 'suspended') {
    ctx.resume();
  }

  try {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(1400 * pitch, now);
    osc.frequency.exponentialRampToValueAtTime(160, now + 0.02);
    gain.gain.setValueAtTime(0.06, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.022);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.025);
  } catch (e) {
    // Safe handling of autoplay limitations
  }
}

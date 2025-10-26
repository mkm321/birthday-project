const audio = document.getElementById("birthdayAudio");
const playPauseBtn = document.getElementById("playPauseBtn");
const backBtn = document.getElementById("backBtn");

let isPlaying = false;

playPauseBtn.addEventListener("click", () => {
  if (!isPlaying) {
    audio.play();
    playPauseBtn.textContent = "⏸ Pause";
    isPlaying = true;
  } else {
    audio.pause();
    playPauseBtn.textContent = "▶️ Play";
    isPlaying = false;
  }
});

// Reset button text when song ends
audio.addEventListener("ended", () => {
  playPauseBtn.textContent = "▶️ Play";
  isPlaying = false;
});

// Back button → stop audio before leaving
backBtn.addEventListener("click", () => {
  if (!audio.paused) {
    audio.pause();
    audio.currentTime = 0;
  }
  window.location.href='hongbao.html#notes';
});

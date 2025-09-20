const flame = document.getElementById("flame");
const message = document.getElementById("message");

flame.addEventListener("click", () => {
  flame.style.display = "none"; // blow out flame
  message.style.opacity = 1;    // show message
  launchConfetti();
  playBirthdayTune();
});

function launchConfetti() {
  for (let i = 0; i < 40; i++) {
    const conf = document.createElement("div");
    conf.classList.add("confetti");
    conf.style.left = Math.random() * window.innerWidth + "px";
    conf.style.backgroundColor = randomColor();
    conf.style.animationDuration = 2 + Math.random() * 3 + "s";
    document.body.appendChild(conf);

    setTimeout(() => { conf.remove(); }, 5000);
  }
}

function randomColor() {
  const colors = ["#ff4081", "#7e57c2", "#ffb347", "#4dd0e1", "#81c784"];
  return colors[Math.floor(Math.random() * colors.length)];
}

function playBirthdayTune() {
  const audio = new Audio("assets/audio/birthday-song.mp3");
  audio.play();
}

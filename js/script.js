document.addEventListener('DOMContentLoaded', () => {
  let candlesOut = 0;

  // Select all candles
  const candles = document.querySelectorAll('.candle');

  candles.forEach(candle => {
    candle.addEventListener('click', () => {
      const flame = candle.querySelector('.flame');
      if (flame && flame.style.display !== 'none') {
        flame.style.display = 'none'; // blow out
        candlesOut++;

        // When all candles are out, launch confetti & balloons
        if (candlesOut === candles.length) {
          launchConfetti();
          launchBalloons();
        }
      }
    });
  });

  function launchConfetti() {
    for (let i = 0; i < 50; i++) {
      const conf = document.createElement("div");
      conf.classList.add("confetti");
      conf.style.left = Math.random() * window.innerWidth + "px";
      conf.style.backgroundColor = randomColor();
      conf.style.animationDuration = 2 + Math.random() * 3 + "s";
      document.body.appendChild(conf);
      setTimeout(() => conf.remove(), 5000);
    }
  }

  function launchBalloons() {
    for (let i = 0; i < 10; i++) {
      const balloon = document.createElement("div");
      balloon.classList.add("balloon");
      balloon.style.left = Math.random() * window.innerWidth + "px";
      balloon.style.background = randomColor();
      balloon.style.animationDuration = (4 + Math.random() * 3) + "s";
      document.body.appendChild(balloon);
      setTimeout(() => balloon.remove(), 7000);
    }
  }

  function randomColor() {
    const colors = ["#ff4081", "#7e57c2", "#ffb347", "#4dd0e1", "#81c784"];
    return colors[Math.floor(Math.random() * colors.length)];
  }
});

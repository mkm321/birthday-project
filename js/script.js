window.addEventListener('load', () => {
  const intro = document.getElementById("intro-screen");
  const birthdayAudio = document.getElementById("birthday-audio");

  function playBirthdayTune() {
    if (birthdayAudio) {
      birthdayAudio.volume = 0.5; // not too loud
      birthdayAudio.play().catch(err => {
        console.log("Autoplay blocked, waiting for user gesture:", err);
        // fallback: play on first tap/click
        document.body.addEventListener("click", () => {
          birthdayAudio.play();
        }, { once: true });
      });
    }
  }

  // Hide intro after 3.5 seconds
  setTimeout(() => {
    intro.style.opacity = 0;
    setTimeout(() => intro.style.display = "none", playBirthdayTune(), 1500); // wait for fade
    // Try playing music
    
  }, 3500);

  const cake = document.querySelector('.cake');
  const creamTop = document.querySelector('.cream-top') || document.querySelector('.layer-top');

  if (!cake || !creamTop) {
    console.warn('Cake or cream-top element not found. Crumbs will not be generated.');
    return;
  }

  // compute positions relative to cake
  const cakeRect = cake.getBoundingClientRect();
  const creamRect = creamTop.getBoundingClientRect();
  const creamTopInsideCake = creamRect.top - cakeRect.top;

  // --- Crumbs generation ---
  const crumbCount = 200;
  const yOffsets = [2, 7, 10, 15]; // small vertical offsets to vary placement
  const crumbSizes = ['tiny', 'small', 'medium'];
  const crumbColors = ['#A94442', '#8D2F2F', '#7B2C2C']; // slight color variety

  for (let i = 0; i < crumbCount; i++) {
    const crumb = document.createElement('div');
    crumb.classList.add('crumb', crumbSizes[Math.floor(Math.random() * crumbSizes.length)]);
    // random left across the cake, but avoid absolute edges
    const leftPercent = Math.random() * 96 + 2; // 2% - 98%
    // small vertical shift around the cream top inside the cake
    const yPx = yOffsets[Math.floor(Math.random() * yOffsets.length)];

    crumb.style.left = `${leftPercent}%`;
    crumb.style.top = `${Math.round(creamTopInsideCake + yPx)}px`;

    // randomize color a little per crumb
    crumb.style.background = crumbColors[Math.floor(Math.random() * crumbColors.length)];
    crumb.style.opacity = (0.6 + Math.random() * 0.4).toFixed(2); // subtle opacity variance

    // ensure crumbs are above cream + other decorations
    crumb.style.zIndex = 9999;
    crumb.style.pointerEvents = 'none';

    cake.appendChild(crumb);
  }

  // ---- existing candle logic (kept) ----
  let candlesOut = 0;
  const candles = document.querySelectorAll('.candle');

  candles.forEach(candle => {
    candle.addEventListener('click', () => {
      const flame = candle.querySelector('.flame');
      if (flame && flame.style.display !== 'none') {
        flame.style.display = 'none'; // blow out flame
        candlesOut++;
        if (candlesOut === candles.length) {
          launchConfetti();
          launchBalloons();
          setTimeout(() => {
            window.location.href = "giftbox.html";
          }, 8000);
        }
      }
    });
  });

  function launchConfetti() {
    for (let i = 0; i < 50; i++) {
      const conf = document.createElement('div');
      conf.classList.add('confetti');
      conf.style.left = Math.random() * window.innerWidth + "px";
      conf.style.backgroundColor = randomColor();
      conf.style.animationDuration = 2 + Math.random() * 3 + "s";
      document.body.appendChild(conf);
      setTimeout(() => conf.remove(), 5000);
    }
  }

  function pauseBirthdayAudio() {
    if (birthdayAudio) {
      birthdayAudio.pause();
      birthdayAudio.currentTime = 0;
    }
  }

  function launchBalloons() {
    for (let i = 0; i < 10; i++) {
      const balloon = document.createElement('div');
      balloon.classList.add('balloon');
      balloon.style.left = Math.random() * window.innerWidth + "px";
      balloon.style.background = randomColor();
      balloon.style.animationDuration = (4 + Math.random() * 3) + "s";
      document.body.appendChild(balloon);
      setTimeout(() => balloon.remove(), 7000);
    }

    setTimeout(() => pauseBirthdayAudio(), 7000);
  }

  function randomColor() {
    const colors = ["#ff4081", "#7e57c2", "#ffb347", "#4dd0e1", "#81c784"];
    return colors[Math.floor(Math.random() * colors.length)];
  }
});
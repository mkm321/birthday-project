const hongbao = document.getElementById("hongbao");
const message = document.getElementById("message");

let opened = false;

// Check if we came back with #notes in URL
if (window.location.hash === "#notes") {
  // Skip the giftbox, show notes directly
  if (hongbao) hongbao.remove();
  message.classList.remove("hidden");
  message.style.opacity = 1;
  message.style.transform = "translateY(0)";
  message.style.marginTop = "-210%";
  showStickyNotes();
}

hongbao.addEventListener("click", () => {
  if (opened) return;
  opened = true;

  hongbao.classList.add("open");

  const rect = hongbao.getBoundingClientRect(); // Get hongbao position

  // Coin explosion 💰
  for (let i = 0; i < 35; i++) {
    const coin = document.createElement("div");
    coin.classList.add("coin");

    // Center explosion origin: middle of the red packet
    const startX = rect.left + rect.width / 2;
    const startY = rect.top + rect.height / 2;

    coin.style.left = `${startX}px`;
    coin.style.top = `${startY}px`;

    coin.style.setProperty("--x", `${Math.random() * 800 - 400}px`);
    coin.style.setProperty("--y", `${Math.random() * 500 - 250}px`);

    document.body.appendChild(coin); // append to body for absolute positioning

    setTimeout(() => coin.remove(), 1200);
  }

  // Show message ✨
  setTimeout(() => {
    message.classList.remove("hidden");
    message.style.opacity = 1;
    message.style.transform = "translateY(0)";
    message.style.marginTop = "-210%";
    showStickyNotes();
  }, 700);
});

function showStickyNotes() {
  const stickyContainer = document.createElement('div');
  stickyContainer.classList.add('sticky-container');
  document.body.appendChild(stickyContainer);

  const notes = [
    "Play Birthday Song 🎶",
    "Make a Wish 🌠",
    "Open Love Letter 💌",
    "View Gallery 📸",
    "Messages from Me 📝"
  ];

  notes.forEach((noteText, i) => {
    const sticky = document.createElement('div');
    sticky.classList.add('sticky-note');
    sticky.textContent = noteText;

    // Random rotation for fun
    const rotate = Math.floor(Math.random() * 31) - 15;
    sticky.style.transform = `rotate(${rotate}deg) scale(0)`;
    sticky.style.opacity = 0;

    // 🔑 Click handlers
    if (noteText.includes("View Gallery")) {
      sticky.addEventListener("click", () => {
        window.location.href = "timeline.html";
      });
    }
    else if (noteText.includes("Open Love Letter")) {
      sticky.addEventListener("click", () => {
        window.location.href = "loveletter.html";
      });
    }
    else if (noteText.includes("Messages from Me")) {
      sticky.addEventListener("click", () => {
        window.location.href = "messages.html";
      });
    }
    else if (noteText.includes("Make a Wish")) {
      sticky.addEventListener("click", () => {
        window.location.href = "makeawish.html";
      });
    }
    else if (noteText.includes("Play Birthday Song")) {
      sticky.addEventListener("click", () => {
        window.location.href = "birthday-song.html";
      });
    }

    // TODO: add similar handlers for other notes if needed

    stickyContainer.appendChild(sticky);

    // Animate sticky notes popping out with stagger
    setTimeout(() => {
      sticky.style.transform = `rotate(${rotate}deg) scale(1)`;
      sticky.style.opacity = 1;
    }, i * 150);
  });

  stickyContainer.style.opacity = 1;
}

  

// giftbox.js

document.addEventListener("DOMContentLoaded", () => {
  const giftBox = document.querySelector('.gift-box');
  const lid = document.querySelector('.lid');

  // Check if we came back with #notes in URL
  if (window.location.hash === "#notes") {
    // Skip the giftbox, show notes directly
    if (giftBox) giftBox.remove();
    showStickyNotes();
    return;
  }

  if (giftBox && lid) {
    giftBox.addEventListener('click', () => {
      // Animate lid opening
      lid.classList.add('open');

      // After lid animation, remove box and show sticky notes
      setTimeout(() => {
        giftBox.remove(); // remove the gift box entirely
        showStickyNotes(); // show sticky notes
      }, 800); // match lidOpen animation duration
    });
  }

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
});

// giftbox.js
export async function showGiftBox() {
  // Hide the homepage elements
  const homepage = document.getElementById('homepage');
  if (homepage) homepage.style.display = 'none';

  // Fetch giftbox HTML
  const res = await fetch('./giftbox.html'); // adjust path if needed
  if (!res.ok) {
    console.error("Failed to load giftbox.html");
    return;
  }

  const html = await res.text();

  // Create container for gift box
  const container = document.createElement('div');
  container.id = 'giftbox-wrapper';
  container.innerHTML = html;
  document.body.appendChild(container);

  const giftBox = container.querySelector('.gift-box');
  const lid = giftBox.querySelector('.lid');

  giftBox.addEventListener('click', () => {
    // Animate lid opening
    lid.classList.add('open');

    // After lid animation, remove box and show sticky notes
    setTimeout(() => {
      container.remove(); // remove the gift box entirely
      showStickyNotes(); // show sticky notes
    }, 800); // match lidOpen animation duration
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

      // random rotation for fun
      const rotate = Math.floor(Math.random() * 31) - 15;
      sticky.style.transform = `rotate(${rotate}deg) scale(0)`;
      sticky.style.opacity = 0;

      stickyContainer.appendChild(sticky);

      // Animate sticky notes popping out with stagger
      setTimeout(() => {
        sticky.style.transform = `rotate(${rotate}deg) scale(1)`;
        sticky.style.opacity = 1;
      }, i * 150);
    });

    stickyContainer.style.opacity = 1;
  }
}

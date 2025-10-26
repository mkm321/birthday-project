const messages = [
  "You’re the calm to my chaos, baobao 🌙❤️",
  "Life’s better when I get to annoy you 😏",
  "You deserve an award for loving this clingy bear 🐻🏆😂",
  "You’ve officially become my favorite notification 🔔💕",
  "Warning: I’ll steal your fries every time 🍟😜",
  "No matter what happens, I’ll always choose you — again and again 💞",
  "You’re not just my girlfriend… you’re my peace, my home 🏡💗"
];

let currentIndex = 0;
const cardStack = document.getElementById("card-stack");

// create cards
messages.forEach((msg, i) => {
  const card = document.createElement("div");
  card.classList.add("card");
  card.textContent = msg;
  cardStack.appendChild(card);
});

// update visible stack
function updateStack() {
  const cards = document.querySelectorAll(".card");
  cards.forEach((card, i) => {
    card.classList.remove("active", "behind", "further");
    if (i === currentIndex) {
      card.classList.add("active");
    } else if (i === currentIndex + 1) {
      card.classList.add("behind");
    } else if (i === currentIndex + 2) {
      card.classList.add("further");
    }
  });
}

// navigation
function nextMessage() {
  if (currentIndex < messages.length - 1) {
    currentIndex++;
    updateStack();
  }
}

function prevMessage() {
  if (currentIndex > 0) {
    currentIndex--;
    updateStack();
  }
}
// init
updateStack();

const gridSize = 5;
const pieceSize = 80;
const imageSrc = 'images/puzzle2.jpg'; // your image

const puzzleContainer = document.querySelector('.puzzle-container');
const piecesContainer = document.querySelector('.pieces-container');
const completedMessage = document.querySelector('.completed-message');
const backBtn = document.querySelector('.back-btn');

let correctCount = 0;

// --- Create puzzle grid ---
for (let i = 0; i < gridSize * gridSize; i++) {
  const cell = document.createElement('div');
  cell.classList.add('grid-cell');
  cell.dataset.index = i;
  puzzleContainer.appendChild(cell);
}

// --- Create puzzle pieces ---
const pieces = [];
for (let row = 0; row < gridSize; row++) {
  for (let col = 0; col < gridSize; col++) {
    const index = row * gridSize + col;
    const piece = document.createElement('div');
    piece.classList.add('piece');
    piece.style.backgroundImage = `url(${imageSrc})`;
    piece.style.backgroundSize = `${gridSize * pieceSize}px ${gridSize * pieceSize}px`;
    piece.style.backgroundPosition = `-${col * pieceSize}px -${row * pieceSize}px`;
    piece.draggable = true;
    piece.dataset.index = index;
    pieces.push(piece);
  }
}

// Shuffle pieces randomly once (so crop positions stay consistent)
pieces.sort(() => Math.random() - 0.5).forEach(p => piecesContainer.appendChild(p));

let draggedPiece = null;

pieces.forEach(piece => {
  piece.addEventListener('dragstart', e => {
    draggedPiece = piece;
    piece.style.zIndex = 9999;
  });
  
  piece.addEventListener('dragend', () => {
    draggedPiece.style.zIndex = '';
    draggedPiece = null;
  });
});

document.querySelectorAll('.grid-cell').forEach(cell => {
  cell.addEventListener('dragover', e => {
    e.preventDefault();
    cell.classList.add('highlight');
  });

  cell.addEventListener('dragleave', () => {
    cell.classList.remove('highlight');
  });

  cell.addEventListener('drop', () => {
    cell.classList.remove('highlight');
    if (!draggedPiece) return;

    // If cell already has a piece, return it
    if (cell.firstChild) {
      piecesContainer.appendChild(cell.firstChild);
    }

    cell.appendChild(draggedPiece);

    // Check correctness
    if (parseInt(cell.dataset.index) === parseInt(draggedPiece.dataset.index)) {
      draggedPiece.dataset.placedCorrectly = "true";
    } else {
      draggedPiece.dataset.placedCorrectly = "false";
    }

    // Count correct ones
    const allPlaced = [...document.querySelectorAll('.piece')];
    const allCorrect = allPlaced.filter(p => p.dataset.placedCorrectly === "true").length;

    if (allCorrect === gridSize * gridSize) {
      setTimeout(showCompletion, 600);
    }
  });
});

function showCompletion() {
  puzzleContainer.innerHTML = '';
  puzzleContainer.style.gridTemplate = 'none';
  puzzleContainer.style.width = `${gridSize * pieceSize}px`;
  puzzleContainer.style.height = `${gridSize * pieceSize}px`;
  puzzleContainer.style.background = `url(${imageSrc}) center/cover no-repeat`;
  completedMessage.classList.add('show');
  backBtn.style.display = 'inline-block';
}

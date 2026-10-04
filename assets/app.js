const trail = document.querySelector(".cursor-trail");

// Follow settings created
const squareSize = 20;
const fadeDuration = 400;
const color = "rgba(98, 0, 255, 0.53)";
const maxSquares = 30;
const shape = "square";

const squares = [];

window.addEventListener("mousemove", (event) => {
  const x = Math.floor(event.clientX / squareSize) * squareSize;
  const y = Math.floor(event.clientY / squareSize) * squareSize;

  // Preventing the creation of a duplicate square in the same cell
  const last = squares[squares.length - 1];

  if (last && last.x === x && last.y === y) {
    return;
  }

  const square = document.createElement("div");

  square.classList.add("cursor-square");

  square.style.left = `${x}px`;
  square.style.top = `${y}px`;
  square.style.width = `${squareSize}px`;
  square.style.height = `${squareSize}px`;
  square.style.background = color;

  if (shape === "circle") {
    square.style.borderRadius = "50%";
  }

  trail.appendChild(square);

  squares.push({
    element: square,
    x,
    y,
    created: Date.now(),
  });

  // Limiting the number of squares
  if (squares.length > maxSquares) {
    const old = squares.shift();
    old.element.remove();
  }
});

// Removing old squares
function cleanSquares() {
  const now = Date.now();

  for (let i = squares.length - 1; i >= 0; i--) {
    const square = squares[i];

    const age = now - square.created;
    const opacity = 1 - Math.min(1, age / fadeDuration);

    square.element.style.opacity = opacity;

    if (age >= fadeDuration) {
      square.element.remove();
      squares.splice(i, 1);
    }
  }

  requestAnimationFrame(cleanSquares);
}

cleanSquares();
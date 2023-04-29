const slider = document.getElementById("slider");
const container = document.querySelector('.container');

slider.addEventListener("input", function() {
  const selectedValue = slider.value;
  const squareRoot = Math.sqrt(selectedValue);
  const squaresPerRow = Math.floor(squareRoot);
  const squaresPerColumn = Math.ceil(squareRoot);

  // Clear the container before adding new squares
  container.innerHTML = '';

  // Calculate the size of each square
  const squareWidth = 500 / squaresPerRow;
  const squareHeight = 500 / squaresPerColumn;

  // Add new squares to the container
  for (let i = 0; i < selectedValue; i++) {
    const square = document.createElement('div');
    square.classList.add('square');
    square.style.width = `${squareWidth}px`;
    square.style.height = `${squareHeight}px`;
    container.appendChild(square);
  }
});

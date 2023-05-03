document.addEventListener('DOMContentLoaded', function() {
  const slider = document.getElementById("slider");
  const container = document.querySelector('.container');
  let isMouseDown = false;
  let coloredSquares = [];

  const colorPicker = document.getElementById("color-picker");
  const warmButton = document.getElementById("warm-btn");
  const coolButton = document.getElementById("cool-btn");
  const noirButton = document.getElementById("noir-btn");

  const warmColors = ['#FF5733', '#FF8C00', '#FFC300', '#F7DC6F', '#F1C40F'];
  const coolColors = ['#85C1E9', '#5DADE2', '#1ABC9C', '#48C9B0', '#17A589'];
  const noirColors = ['#424949', '#616A6B', '#7B7D7D', '#AEB6BF', '#D5D8DC'];

  function getRandomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)];
  }

  warmButton.addEventListener("click", function() {
    const selectedColor = getRandomColor(warmColors);
    colorPicker.value = selectedColor;
    document.body.style.backgroundColor = selectedColor;
  });

  coolButton.addEventListener("click", function() {
    const selectedColor = getRandomColor(coolColors);
    colorPicker.value = selectedColor;
    document.body.style.backgroundColor = selectedColor;
  });

  noirButton.addEventListener("click", function() {
    const selectedColor = getRandomColor(noirColors);
    colorPicker.value = selectedColor;
    document.body.style.backgroundColor = selectedColor;
  });

  colorPicker.addEventListener("change", function() {
    const selectedColor = colorPicker.value;
    document.body.style.backgroundColor = selectedColor;
  });

  slider.addEventListener("input", function() {
    const selectedValue = slider.value * slider.value;
    const squareRoot = Math.sqrt(selectedValue);
    const squaresPerRow = Math.floor(squareRoot);
    const squaresPerColumn = Math.ceil(squareRoot);

    // Clear the container before adding new squares
    container.innerHTML = '';
    coloredSquares = [];

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

      // Add event listeners to each square
      square.addEventListener('mousedown', () => {
        isMouseDown = true;
        square.style.backgroundColor = colorPicker.value;
        coloredSquares.push(square);
      });

      square.addEventListener('mousemove', () => {
        if (isMouseDown && !coloredSquares.includes(square)) {
          square.style.backgroundColor = colorPicker.value;
          coloredSquares.push(square);
        }
      });

      // container.addEventListener('mousemove', (event) => {
      //   if (isMouseDown) {
      //     const squares = document.querySelectorAll('.square');
      //     squares.forEach((square) => {
      //       if (event.target === square && !coloredSquares.includes(square)) {
      //         square.style.backgroundColor = colorPicker.value;
      //         coloredSquares.push(square);
      //       }
      //     });
      //   }
      // });
      

      square.addEventListener('mouseup', () => {
        isMouseDown = false;
      });

      square.addEventListener('mouseleave', () => {
        isMouseDown = false;
      });
    }
  });
});

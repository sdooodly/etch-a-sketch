document.addEventListener("DOMContentLoaded", function () {
  const slider = document.getElementById("slider");
  const container = document.querySelector(".container");
  let isMouseDown = false;
  let coloredSquares = [];

  const colorPicker = document.getElementById("color-picker");
  const warmButton = document.getElementById("warm-btn");
  const coolButton = document.getElementById("cool-btn");
  const noirButton = document.getElementById("noir-btn");


  const warmColors = [
    "#FF5733",
    "#FF8C00",
    "#FFC300",
    "#F7DC6F",
    "#F1C40F",
    "#FF7F50",
    "#FFA07A",
    "#FFDAB9",
    "#CD5C5C",
    "#FF4500",
    "#D2691E",
    "#8B0000",
    "#FF6347",
    "#FFA500",
    "#FFE4B5",
    "#B22222",
    "#FF8F00",
    "#FFD700",
    "#FFFF00",
    "#F0E68C",
    "#DAA520",
    "#FF1493",
    "#FF69B4",
    "#FFC0CB",
    "#DB7093",
  ];
  const coolColors = [
    "#85C1E9",
    "#5DADE2",
    "#1ABC9C",
    "#48C9B0",
    "#17A589",
    "#2980B9",
    "#3498DB",
    "#BDC3C7",
    "#2C3E50",
    "#34495E",
    "#1E90FF",
    "#87CEFA",
    "#87CEEB",
    "#00BFFF",
    "#ADD8E6",
    "#87CEFA",
    "#4682B4",
    "#6A5ACD",
    "#7B68EE",
    "#9400D3",
    "#BA55D3",
    "#DA70D6",
    "#FFB6C1",
    "#FFC0CB",
    "#E6E6FA",
  ];
  const noirColors = [
    "#424949",
    "#616A6B",
    "#7B7D7D",
    "#AEB6BF",
    "#D5D8DC",
    "#1C2833",
    "#34495E",
    "#283747",
    "#212F3D",
    "#2C3E50",
    "#566573",
    "#808B96",
    "#95A5A6",
    "#BDC3C7",
    "#DADFE1",
    "#F2F3F4",
    "#839192",
    "#BFBFBF",
    "#F5F5F5",
    "#17202A",
    "#212F3D",
    "#2C3E50",
    "#273746",
    "#2C3E50",
    "#2E4053",
  ];
 
  
    function getRandomColor(colors) {
      return colors[Math.floor(Math.random() * colors.length)];
    }
  
    warmButton.addEventListener("click", function () {
      const selectedColor = getRandomColor(warmColors);
      colorPicker.value = selectedColor;
      document.body.style.backgroundColor = selectedColor;
    });
  
    coolButton.addEventListener("click", function () {
      const selectedColor = getRandomColor(coolColors);
      colorPicker.value = selectedColor;
      document.body.style.backgroundColor = selectedColor;
    });
  
    noirButton.addEventListener("click", function () {
      const selectedColor = getRandomColor(noirColors);
      colorPicker.value = selectedColor;
      document.body.style.backgroundColor = selectedColor;
    });
  
    colorPicker.addEventListener("change", function () {
      const selectedColor = colorPicker.value;
      document.body.style.backgroundColor = selectedColor;
    });
  
    slider.addEventListener("input", function () {
      const selectedValue = slider.value * slider.value;
      const squareRoot = Math.sqrt(selectedValue);
      const squaresPerRow = Math.floor(squareRoot);
      const squaresPerColumn = Math.ceil(squareRoot);
  
      // Clear the container before adding new squares
      container.innerHTML = "";
      coloredSquares = [];
  
      // Calculate the size of each square
      const squareWidth = 500 / squaresPerRow;
      const squareHeight = 500 / squaresPerColumn;
  
      // Add new squares to the container
      for (let i = 0; i < selectedValue; i++) {
        const square = document.createElement("div");
        square.classList.add("square");
        square.style.width = `${squareWidth}px`;
        square.style.height = `${squareHeight}px`;
        container.appendChild(square);
  
        // Add event listeners to each square
        square.addEventListener("mousedown", () => {
          if (!document.getElementById("hover-checkbox").checked) {
            square.style.backgroundColor = colorPicker.value;
          }
          isMouseDown = true;
          coloredSquares.push(square);
        });
  
        square.addEventListener("mousemove", () => {
          if (isMouseDown && !coloredSquares.includes(square)) {
            if (document.getElementById("hover-checkbox").checked) {
              square.style.backgroundColor = colorPicker.value;
            }
            coloredSquares.push(square);
          }
        });
  
        square.addEventListener("mouseup", () => {
          isMouseDown = false;
        });
  
        square.addEventListener("mouseleave", () => {
          isMouseDown = false;
        });
      }
    });
  });
  
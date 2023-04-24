const container = document.getElementById("container");
const slider = document.getElementById("slider");

slider.addEventListener("input", function() {
  const numSquares = this.value * this.value;
  container.innerHTML = "";
  for (let i = 0; i < numSquares; i++) {
    const square = document.createElement("div");
    square.classList.add("square");
    container.appendChild(square);
  }
});

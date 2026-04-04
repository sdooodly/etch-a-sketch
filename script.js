document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("canvas-container");
  const colorPicker = document.getElementById("color-picker");
  const gridSlider = document.getElementById("grid-slider");
  const gridLabel = document.getElementById("grid-size-label");
  const gridLabel2 = document.getElementById("grid-size-label2");
  const btnClear = document.getElementById("btn-clear");
  const btnUndo = document.getElementById("btn-undo");
  const btnGridToggle = document.getElementById("btn-grid-toggle");
  const btnDownload = document.getElementById("btn-download");

  let isMouseDown = false;
  let currentMode = "draw"; // draw | darken | lighten | eraser | rainbow
  let rainbowHue = 0;
  let gridLinesVisible = true;
  let currentGridSize = 16;

  // Undo history — stores snapshots of all square colors
  const undoStack = [];
  const MAX_UNDO = 20;
  let currentStroke = null;

  // Color palettes
  const warmColors = ["#FF5733", "#FFA07A", "#FFA500", "#FF6347", "#FF8C00"];
  const coolColors = ["#007F7F", "#008080", "#008B8B", "#7FFFD4", "#66CDAA"];
  const noirColors = ["#222222", "#333333", "#444444", "#aaaaaa", "#bbbbbb"];

  function getRandomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)];
  }

  // --- Mode button management ---
  function setActiveButton(clickedBtn, group) {
    document.querySelectorAll(group).forEach((b) => b.classList.remove("active"));
    clickedBtn.classList.add("active");
  }

  // Color palette buttons
  document.querySelector(".warm").addEventListener("click", function () {
    const c = getRandomColor(warmColors);
    colorPicker.value = c;
    document.body.style.backgroundColor = c;
    currentMode = "draw";
    setActiveButton(this, ".color-button .mode-btn");
    setActiveButton(document.querySelector('[data-mode="draw"]'), ".draw-mode");
  });

  document.querySelector(".cold").addEventListener("click", function () {
    const c = getRandomColor(coolColors);
    colorPicker.value = c;
    document.body.style.backgroundColor = c;
    currentMode = "draw";
    setActiveButton(this, ".color-button .mode-btn");
    setActiveButton(document.querySelector('[data-mode="draw"]'), ".draw-mode");
  });

  document.querySelector(".noir").addEventListener("click", function () {
    const c = getRandomColor(noirColors);
    colorPicker.value = c;
    document.body.style.backgroundColor = c;
    currentMode = "draw";
    setActiveButton(this, ".color-button .mode-btn");
    setActiveButton(document.querySelector('[data-mode="draw"]'), ".draw-mode");
  });

  document.querySelector(".rainbow").addEventListener("click", function () {
    currentMode = "rainbow";
    setActiveButton(this, ".color-button .mode-btn");
    setActiveButton(document.querySelector('[data-mode="draw"]'), ".draw-mode");
  });

  colorPicker.addEventListener("input", () => {
    document.body.style.backgroundColor = colorPicker.value;
    currentMode = "draw";
    document.querySelectorAll(".color-button .mode-btn").forEach((b) => b.classList.remove("active"));
    setActiveButton(document.querySelector('[data-mode="draw"]'), ".draw-mode");
  });

  // Draw mode buttons
  document.querySelectorAll(".draw-mode").forEach((btn) => {
    btn.addEventListener("click", function () {
      currentMode = this.dataset.mode;
      setActiveButton(this, ".draw-mode");
      // Clear color-button active if switching to non-draw mode
      if (currentMode !== "draw") {
        document.querySelectorAll(".color-button .mode-btn").forEach((b) => b.classList.remove("active"));
      }
    });
  });

  // --- Grid slider ---
  gridSlider.addEventListener("input", () => {
    const size = parseInt(gridSlider.value, 10);
    gridLabel.textContent = size;
    gridLabel2.textContent = size;
  });

  gridSlider.addEventListener("change", () => {
    const size = parseInt(gridSlider.value, 10);
    currentGridSize = size;
    createGrid(size);
  });

  // --- Action buttons ---
  btnClear.addEventListener("click", () => {
    saveSnapshot();
    clearGrid();
  });

  btnUndo.addEventListener("click", undo);

  btnGridToggle.addEventListener("click", () => {
    gridLinesVisible = !gridLinesVisible;
    container.querySelectorAll(".square").forEach((sq) => {
      sq.classList.toggle("no-gridlines", !gridLinesVisible);
    });
    btnGridToggle.style.opacity = gridLinesVisible ? "1" : "0.5";
  });

  btnDownload.addEventListener("click", downloadCanvas);

  // --- Grid creation ---
  function createGrid(size) {
    container.innerHTML = "";
    container.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    container.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    for (let i = 0; i < size * size; i++) {
      const square = document.createElement("div");
      square.classList.add("square");
      if (!gridLinesVisible) square.classList.add("no-gridlines");
      container.appendChild(square);
    }
    undoStack.length = 0;
  }

  function clearGrid() {
    container.querySelectorAll(".square").forEach((sq) => {
      sq.style.backgroundColor = "rgb(0, 0, 0)";
    });
  }

  // --- Undo ---
  function saveSnapshot() {
    const squares = container.querySelectorAll(".square");
    const snapshot = Array.from(squares).map((sq) => sq.style.backgroundColor || "rgb(0, 0, 0)");
    undoStack.push(snapshot);
    if (undoStack.length > MAX_UNDO) undoStack.shift();
  }

  function undo() {
    if (undoStack.length === 0) return;
    const snapshot = undoStack.pop();
    const squares = container.querySelectorAll(".square");
    squares.forEach((sq, i) => {
      sq.style.backgroundColor = snapshot[i];
    });
  }

  // --- Color logic per mode ---
  function getDrawColor(square) {
    switch (currentMode) {
      case "rainbow":
        rainbowHue = (rainbowHue + 4) % 360;
        return `hsl(${rainbowHue}, 90%, 55%)`;
      case "darken":
        return darkenColor(square);
      case "lighten":
        return lightenColor(square);
      case "eraser":
        return "rgb(0, 0, 0)";
      default:
        return colorPicker.value;
    }
  }

  function parseRGB(str) {
    const m = str.match(/(\d+)/g);
    if (!m || m.length < 3) return [0, 0, 0];
    return [parseInt(m[0]), parseInt(m[1]), parseInt(m[2])];
  }

  function darkenColor(square) {
    const current = square.style.backgroundColor || "rgb(0,0,0)";
    const [r, g, b] = parseRGB(current);
    // If black, start from the picked color
    if (r === 0 && g === 0 && b === 0) {
      return colorPicker.value;
    }
    return `rgb(${Math.max(0, r - 25)}, ${Math.max(0, g - 25)}, ${Math.max(0, b - 25)})`;
  }

  function lightenColor(square) {
    const current = square.style.backgroundColor || "rgb(0,0,0)";
    const [r, g, b] = parseRGB(current);
    if (r === 0 && g === 0 && b === 0) {
      return colorPicker.value;
    }
    return `rgb(${Math.min(255, r + 25)}, ${Math.min(255, g + 25)}, ${Math.min(255, b + 25)})`;
  }

  // --- Drawing events ---
  function paintSquare(square) {
    square.style.backgroundColor = getDrawColor(square);
  }

  container.addEventListener("mousedown", (e) => {
    if (e.target.classList.contains("square")) {
      e.preventDefault();
      saveSnapshot();
      isMouseDown = true;
      paintSquare(e.target);
    }
  });

  container.addEventListener("mouseover", (e) => {
    if (isMouseDown && e.target.classList.contains("square")) {
      paintSquare(e.target);
    }
  });

  document.addEventListener("mouseup", () => {
    isMouseDown = false;
  });

  container.addEventListener("dragstart", (e) => e.preventDefault());

  // --- Touch support ---
  container.addEventListener("touchstart", (e) => {
    const touch = e.touches[0];
    const target = document.elementFromPoint(touch.clientX, touch.clientY);
    if (target && target.classList.contains("square")) {
      e.preventDefault();
      saveSnapshot();
      isMouseDown = true;
      paintSquare(target);
    }
  }, { passive: false });

  container.addEventListener("touchmove", (e) => {
    if (!isMouseDown) return;
    const touch = e.touches[0];
    const target = document.elementFromPoint(touch.clientX, touch.clientY);
    if (target && target.classList.contains("square")) {
      e.preventDefault();
      paintSquare(target);
    }
  }, { passive: false });

  container.addEventListener("touchend", () => {
    isMouseDown = false;
  });

  // --- Download as PNG ---
  function downloadCanvas() {
    const squares = container.querySelectorAll(".square");
    const size = currentGridSize;
    const cellPx = 10;
    const canvas = document.createElement("canvas");
    canvas.width = size * cellPx;
    canvas.height = size * cellPx;
    const ctx = canvas.getContext("2d");

    squares.forEach((sq, i) => {
      const row = Math.floor(i / size);
      const col = i % size;
      ctx.fillStyle = sq.style.backgroundColor || "rgb(0,0,0)";
      ctx.fillRect(col * cellPx, row * cellPx, cellPx, cellPx);
    });

    const link = document.createElement("a");
    link.download = "etch-a-sketch.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  }

  // --- Keyboard shortcuts ---
  document.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "z") {
      e.preventDefault();
      undo();
    }
  });

  // --- Init ---
  createGrid(currentGridSize);
  gridLabel.textContent = currentGridSize;
  gridLabel2.textContent = currentGridSize;
});

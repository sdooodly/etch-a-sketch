document.addEventListener("DOMContentLoaded", function() {
    //const slider = document.getElementById("slider");
    const container = document.querySelector(".container");
    let isMouseDown = false;
    let coloredSquares = [];

    const colorPicker = document.getElementById("color-picker");
    const warmButton = document.querySelector(".warm");
    const coolButton = document.querySelector(".cold");
    const noirButton = document.querySelector(".noir");
    const b_one = document.querySelector(".grid-10");
    const b_two = document.querySelector(".grid-20");
    const b_three = document.querySelector(".grid-30");
    const erase = document.querySelector(".erase")




    const warmColors = [
        "#FF5733",
        "#FFA07A",
        "#FF7F50",
        "#FF6347",
        "#FF4500",
        "#FF8C00",
        "#FF7256",
        "#FFA500",
        "#FFA07A",
        "#FF8C00"
    ];
    const coolColors = [
        "#007F7F",
        "#008080",
        "#008B8B",
        "#00BFFF",
        "#00CED1",
        "#00FA9A",
        "#00FF7F",
        "#00FF00",
        "#7FFFD4",
        "#66CDAA"
    ];
    const noirColors = [
        "#222222",
        "#333333",
        "#444444",
        "#555555",
        "#666666",
        "#777777",
        "#888888",
        "#999999",
        "#aaaaaa",
        "#bbbbbb"
    ];


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

    erase.addEventListener("click", function() {
        const selectedColor = "#000000";
        colorPicker.value = selectedColor;
        document.body.style.backgroundColor = selectedColor;
    });

    colorPicker.addEventListener("change", function() {
        const selectedColor = colorPicker.value;
        document.body.style.backgroundColor = selectedColor;
    });




    b_one.addEventListener("click", function() {
        container.innerHTML = "";
        coloredSquares = [];
        addSquare(10);
    })

    b_two.addEventListener("click", function() {
        container.innerHTML = "";
        coloredSquares = [];
        addSquare(20);
    })
    b_three.addEventListener("click", function() {
        container.innerHTML = "";
        coloredSquares = [];
        addSquare(30);
    })

    const addSquare = (input) => {
        for (let i = 0; i < (input * input); i++) {
            const squareWidth = 500 / input;
            const squareHeight = 500 / input;
            const square = document.createElement("div");
            square.classList.add("square");
            square.style.width = `${squareWidth}px`;
            square.style.height = `${squareHeight}px`;
            container.appendChild(square);

            square.addEventListener("mouseover", function() {
                if (isMouseDown) {
                    square.style.backgroundColor = colorPicker.value;
                    coloredSquares.push(square);
                }
            });

            square.addEventListener("mousedown", function() {
                isMouseDown = true;
                square.style.backgroundColor = colorPicker.value;
                coloredSquares.push(square);
            });

            square.addEventListener("mouseup", function() {
                isMouseDown = false;
            });
        }
    }



});

// //figure out
// const generateRandomColor = (string) => {
//     if (string === 'warm') {
//         // Generate a warm color
//         const hue = Math.floor(Math.random() * 41) + 10; // 10-50 (red-orange to yellow)
//         const saturation = Math.floor(Math.random() * 51) + 50; // 50-100 (more vivid)
//         const lightness = Math.floor(Math.random() * 41) + 40; // 40-80 (light to dark)
//         return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
//     } else if (string === 'cool') {
//         // Generate a cool color
//         const hue = 205; // Blue hue
//         const saturation = Math.floor(Math.random() * 31) + 70; // 70-100 (less vivid)
//         const lightness = Math.floor(Math.random() * 41) + 40; // 40-80 (light to dark)
//         return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
//     } else if (string === 'noir') {
//         // Generate a random gray color
//         const shade = Math.floor(Math.random() * 81) + 10; // 10-90 (light to dark)
//         return `rgb(${shade}, ${shade}, ${shade})`;
//     } else {
//         // Default to black
//         return '#000000';
//     }
// }
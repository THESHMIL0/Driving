// Get the canvas element from the HTML file
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Define the car's properties
const car = {
    x: canvas.width / 2 - 25,
    y: canvas.height - 100,
    width: 50,
    height: 80,
    color: 'red'
};

// Function to draw the car on the canvas
function drawCar() {
    ctx.fillStyle = car.color;
    ctx.fillRect(car.x, car.y, car.width, car.height);
}

// Draw the car for the first time
drawCar();

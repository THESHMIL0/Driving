// Get the canvas and its context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Define the car's properties
const car = {
    x: canvas.width / 2 - 25,
    y: canvas.height - 100,
    width: 50,
    height: 80,
    color: 'red',
    speed: 0,
    maxSpeed: 5,
    friction: 0.98,
    angle: 0
};

// Handle button presses using a holding state
const heldButtons = {
    accelerate: false,
    reverse: false,
    left: false,
    right: false
};

function handleButtonPress(buttonId, isPressed) {
    switch(buttonId) {
        case 'accelerate':
            heldButtons.accelerate = isPressed;
            break;
        case 'reverse':
            heldButtons.reverse = isPressed;
            break;
        case 'left':
            heldButtons.left = isPressed;
            break;
        case 'right':
            heldButtons.right = isPressed;
            break;
    }
}

// Add event listeners for both touch and mouse
document.getElementById('accelerate').addEventListener('touchstart', (e) => { e.preventDefault(); handleButtonPress('accelerate', true); });
document.getElementById('accelerate').addEventListener('touchend', () => handleButtonPress('accelerate', false));
document.getElementById('accelerate').addEventListener('mousedown', () => handleButtonPress('accelerate', true));
document.getElementById('accelerate').addEventListener('mouseup', () => handleButtonPress('accelerate', false));

document.getElementById('reverse').addEventListener('touchstart', (e) => { e.preventDefault(); handleButtonPress('reverse', true); });
document.getElementById('reverse').addEventListener('touchend', () => handleButtonPress('reverse', false));
document.getElementById('reverse').addEventListener('mousedown', () => handleButtonPress('reverse', true));
document.getElementById('reverse').addEventListener('mouseup', () => handleButtonPress('reverse', false));

document.getElementById('left').addEventListener('touchstart', (e) => { e.preventDefault(); handleButtonPress('left', true); });
document.getElementById('left').addEventListener('touchend', () => handleButtonPress('left', false));
document.getElementById('left').addEventListener('mousedown', () => handleButtonPress('left', true));
document.getElementById('left').addEventListener('mouseup', () => handleButtonPress('left', false));

document.getElementById('right').addEventListener('touchstart', (e) => { e.preventDefault(); handleButtonPress('right', true); });
document.getElementById('right').addEventListener('touchend', () => handleButtonPress('right', false));
document.getElementById('right').addEventListener('mousedown', () => handleButtonPress('right', true));
document.getElementById('right').addEventListener('mouseup', () => handleButtonPress('right', false));

// Function to draw the road
function drawRoad() {
    ctx.beginPath();
    ctx.lineWidth = 60;
    ctx.strokeStyle = '#7f8c8d';
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.stroke();
    
    ctx.lineWidth = 5;
    ctx.strokeStyle = '#ecf0f1';
    ctx.setLineDash([20, 10]);
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.stroke();
    ctx.setLineDash([]);
}

// The main game loop
function animate() {
    update();
    draw();
    requestAnimationFrame(animate);
}

function update() {
    // Update car's speed based on held buttons
    if (heldButtons.accelerate) {
        car.speed += 0.2;
    }
    if (heldButtons.reverse) {
        car.speed -= 0.2;
    }

    // Apply friction to slow the car down
    car.speed *= car.friction;

    // Limit the speed to the maxSpeed
    if (car.speed > car.maxSpeed) {
        car.speed = car.maxSpeed;
    }
    if (car.speed < -car.maxSpeed / 2) {
        car.speed = -car.maxSpeed / 2;
    }

    // Update car's position
    car.y -= Math.cos(car.angle) * car.speed;
    car.x += Math.sin(car.angle) * car.speed;

    // Update car's angle based on turning
    if (car.speed !== 0) {
        const flip = car.speed > 0 ? 1 : -1;
        if (heldButtons.left) {
            car.angle += 0.05 * flip;
        }
        if (heldButtons.right) {
            car.angle -= 0.05 * flip;
        }
    }
}

function draw() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the road first
    drawRoad();

    // Save the current canvas state before rotating
    ctx.save();
    ctx.translate(car.x + car.width / 2, car.y + car.height / 2);
    ctx.rotate(-car.angle);
    ctx.translate(-(car.x + car.width / 2), -(car.y + car.height / 2));

    // Draw the car with the new angle
    ctx.fillStyle = car.color;
    ctx.fillRect(car.x, car.y, car.width, car.height);

    // Restore the canvas state
    ctx.restore();
}

// This single line starts the entire game loop
animate();

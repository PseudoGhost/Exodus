// Set the player stats
let player;
let playerSpeed = 5;
let playerHealth = 10;
let playerMaxHealth = 10;

// Set the world stats
let dayCounter = 0;

// Function to generate a random integer
function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min) + min);
}

// Called on the first frame
function setup() {
	frameRate(60);
	createCanvas(windowWidth, windowHeight);

	// Set player properties
	player = new Sprite(50, 50);
	player.addImage("playerImage", loadImage("player.png"));
	player.diameter = 48;

	textSize(32);
}

// Called every frame
function draw() {
	clear();
	background("#32a852");

	// Kill the player if HP drops to 0
	if (playerHealth < 1) {
		return;
	}

	stroke(0);
	strokeWeight(4);
	noFill();
	rect(50, 30, 200, 20); // Outer health bar

	noStroke();
	fill(0, 255, 0);
	rect(50, 30, map(playerHealth, 0, playerMaxHealth, 0, 200), 20); // Inner health bar

	fill("white");

	// Player Movement
	if (kb.pressing("left")) player.vel.x = -playerSpeed;
	else if (kb.pressing("right")) player.vel.x = playerSpeed;
	else player.vel.x = 0;

	if (kb.pressing("up")) player.vel.y = -playerSpeed;
	else if (kb.pressing("down")) player.vel.y = playerSpeed;
	else player.vel.y = 0;

	player.rotateTowards(mouse, 0.4, 90);

	// Show stats via text in top left of the screen
	text("Days Survived: " + Math.floor(dayCounter), 50, 80);
}

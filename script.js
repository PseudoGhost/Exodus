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
	player = new Sprite(50, 50, 16, "circle");
	player.addImage("playerImage", loadImage("Images/player.png"));
	player.scale = 3;

	textSize(32);
}

// Called every frame
function draw() {

	// Kill the player if HP drops to 0
	if (HP < 1) {
		return;
	}

	clear();
	background("green");

	stroke(0);
	strokeWeight(4);
	noFill();
	rect(50, 30, 200, 20); // Outer health bar

	noStroke();
	fill(0, 255, 0);
	rect(50, 30, map(HP, 0, MaxHP, 0, 200), 20); // Inner health bar

	fill("white");

	// Show stats via text in top left of the screen
	text("Days Survived: " + Math.floor(dayCounter), 50, 80);
}
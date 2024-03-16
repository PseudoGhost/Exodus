// Set the player stats
let player;
let playerSpeed = 5;
let playerHealth = 10;
let playerMaxHealth = 10;

// Set the world stats
let dayCounter = 0;
let timePassed = 0;
let maxTimePassed = 800;
let isDay = true;

// Function to generate a random integer
function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min) + min);
}

function preload() {
	lexendFont = loadFont("lexend.ttf")
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
	textFont(lexendFont);
}

// Called every frame
function draw() {
	clear();
	background("#32a852");

	// Kill the player if HP drops to 0
	if (playerHealth < 1) {
		return;
	}

	timePassed += 1;

	stroke(0);
	strokeWeight(8);
	noFill();
	rect(15, windowHeight - 50, 200, 35, 3); // Outer health bar

	noStroke();
	fill("#00cc44");
	rect(15, windowHeight - 50, map(playerHealth, 0, playerMaxHealth, 0, 200), 35, 3); // Inner health bar

	stroke(0);
	strokeWeight(8);
	noFill();
	rect(windowWidth - 450, 30, 400, 35, 3); // Outer time bar

	noStroke();
	if (isDay) {
		fill(102, 204, 0);
	} else {
		fill(232, 0, 24);
	}
	rect(windowWidth - 450, 30, map(timePassed, 0, maxTimePassed, 0, 400), 35, 3); // Inner time bar

	fill("white");
	strokeWeight(1);
	stroke(1);

	// Player Movement
	if (kb.pressing("left")) player.vel.x = -playerSpeed;
	else if (kb.pressing("right")) player.vel.x = playerSpeed;
	else player.vel.x = 0;

	if (kb.pressing("up")) player.vel.y = -playerSpeed;
	else if (kb.pressing("down")) player.vel.y = playerSpeed;
	else player.vel.y = 0;

	player.rotateTowards(mouse, 0.4, 90);

	if (timePassed == maxTimePassed) {
		isDay = !isDay;
		timePassed = 0;
		dayCounter += 0.5;	
	}

	// Show stats via text in top left of the screen
	text("Days Survived: " + Math.floor(dayCounter), 20, 40);
}

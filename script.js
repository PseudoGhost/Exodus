// Set the player stats
let player;
let playerSpeed = 5;
let playerHealth = 10;
let playerMaxHealth = 10;
let immunityFrames = 0;

// Set the default enemy stats
let enemies = [];
let enemyHealth = 2;
let enemyMaxHealth = 2;
let enemySpawnTime = 600;
let enemyTimePassed = 0;
let enemyX = 0;
let enemyY = 0;
let enemySpeed = 3;
let enemyDamage = 1;

// Set the world stats
let dayCounter = 0;
let timePassed = 0;
let maxTimePassed = 2500;
let isDay = true;

class Enemy {
	constructor() {
		this.sprite = new Sprite(enemyX, enemyY);
		this.sprite.addImage("enemyImage", loadImage("enemy.png"));
		this.sprite.diameter = 48;
		this.sprite.collider = "dynamic";
		this.health = Math.ceil(enemyHealth);
		this.maxHealth = Math.ceil(enemyMaxHealth);
		enemies.push(this);
	}
}

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
	enemyTimePassed += 1;
	immunityFrames += 1;

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
		enemySpeed += 0.1;
		enemyDamage += 0.2;
	}

	if (enemyTimePassed >= enemySpawnTime) {
		if (!isDay) {
			enemyX = getRandomInt(-2500, 2500);
			enemyY = getRandomInt(-2500, 2500);
			new Enemy();
			enemyTimePassed = 0;
		}
	}

	if (immunityFrames > 29) {
		enemies.forEach((enemy, index) => {
			if (player.colliding(enemy.sprite)) {
				immunityFrames = 0;
				playerHealth -= enemyDamage;
			}
		})
	}

	enemies.forEach((enemy, index) => {
	        enemy.sprite.direction = enemy.sprite.angleTo(player);
	        enemy.sprite.speed = enemySpeed;
	})

	// Show stats via text in top left of the screen
	text("Days Survived: " + Math.floor(dayCounter), 20, 40);
}

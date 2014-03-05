var viewPort = {width:512,height:480};
// create pixi stage
var stage = new PIXI.Stage(0x000000);
// create pixi renderer instance
var renderer = PIXI.autoDetectRenderer(viewPort.width,viewPort.height);
// bind renderer view to dom
document.body.appendChild(renderer.view);

// PIXI requires you to load images as textures
// Then Create a Sprite asset with the texture object
// Below are examples of creating a background, hero, monster sprite
// create a background sprite
var bgTexture = PIXI.Texture.fromImage("http://localhost:5975/images/background.png");
var bgSprite = new PIXI.Sprite(bgTexture);
// important that you start at 0, will throw exception if
// you call addChildAt with an index that exceeds the .length
stage.addChildAt(bgSprite,0);

// Hero image
var heroTexture = PIXI.Texture.fromImage("http://localhost:5975/images/hero.png");
var heroSprite = new PIXI.Sprite(heroTexture);
stage.addChildAt(heroSprite,1);

// Monster image
var mobTexture = PIXI.Texture.fromImage("http://localhost:5975/images/monster.png");
var mobSprite = new PIXI.Sprite(mobTexture);
stage.addChildAt(mobSprite,2);

// Create a Pixi Text view and add to our stage
var textView = new PIXI.Text("", {fill:'white', font:'24px Helvetica'});
textView.position.x=32;
textView.position.y=32;
// set our text to stage
stage.addChild(textView,2);



// Game objects
var hero = {
	speed: 256 // movement in pixels per second
};
var monster = {};
var monstersCaught = 0;

// Handle keyboard controls
var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

// Reset the game when the player catches a monster
var reset = function () {
	heroSprite.position.x = viewPort.width / 2;
	heroSprite.position.y = viewPort.height / 2;

	// Throw the monster somewhere on the screen randomly
	mobSprite.position.x = 32 + (Math.random() * (viewPort.width - 64));
	mobSprite.position.y = 32 + (Math.random() * (viewPort.height - 64));
};

// Update game objects
var update = function (modifier) {
	if (38 in keysDown) { // Player holding up
		heroSprite.position.y -= hero.speed * modifier;
	}
	if (40 in keysDown) { // Player holding down
		heroSprite.position.y += hero.speed * modifier;
	}
	if (37 in keysDown) { // Player holding left
		heroSprite.position.x -= hero.speed * modifier;
	}
	if (39 in keysDown) { // Player holding right
		heroSprite.position.x += hero.speed * modifier;
	}

	// Are they touching?
	if (
		heroSprite.position.x <= (mobSprite.position.x + 32)
		&& mobSprite.position.x <= (heroSprite.position.x + 32)
		&& heroSprite.position.y <= (mobSprite.position.y + 32)
		&& mobSprite.position.y <= (heroSprite.position.y + 32)
	) {
		++monstersCaught;
		reset();
	}
};

// Draw everything
var render = function () {
    // update our text with goblins captured	
    textView.setText("Goblins caught: "+monstersCaught);
    
    // call the pixi renderer with stage
    renderer.render(stage);

};

// The main game loop
var main = function () {
	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	render();

	then = now;
};

// Let's play this game!
reset();
var then = Date.now();
setInterval(main, 1); // Execute as fast as possible

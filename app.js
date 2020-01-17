import keyboard from "./components/keyboard.js";
import Collision from "./components/collision.js";

let type = "WebGL";

if (!PIXI.utils.isWebGLSupported()) {
  type = "canvas";
}

PIXI.utils.sayHello(type);

// Aliases

let App = PIXI.Application;
let loader = PIXI.Loader.shared;
let res = PIXI.Loader.shared.resources;
let Sprite = PIXI.Sprite;

// Pixi App and Canvas
let app = new App({
  width: window.innerWidth,
  height: window.innerHeight,
  antialias: true,
  transparent: false,
  resolution: 1
});

document.body.appendChild(app.view);

app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";
app.renderer.autoDensity = true;
app.renderer.resize(window.innerWidth, window.innerHeight);

// Pixi Sprites and Images
loader
  .add("images/king-vs-pig.json")
  .on("progress", loadProgressHandler)
  .load(setup);

// let sprite = new Sprite(id['frameId.png']);
let king, pig, door, lifebar, id;
let state;

// Controls
let right = keyboard("d");
let left = keyboard("a");

function loadProgressHandler(loader, resource) {
  console.log("loading: " + resource.url);
  console.log("progress: " + loader.progress + "%");
}

function setup() {
  console.log("Starting!");
  state = play;
 
  // UI Containers
  const gameScene = new PIXI.Container();
  app.stage.addChild(gameScene);

  // Game Over
  const gameOverScene = new PIXI.Container();
  app.stage.addChild(gameOverScene);

  gameOverScene.visible = false;

  // health bar
  const healthBar = new PIXI.Container();
  healthBar.position.set(app.stage.width - 170, 4);
  app.stage.addChild(healthBar);

  // Texture Atlas /frame id textures
  id = loader.resources['images/king-vs-pig.json'].textures;

  king = new Sprite(id['king_ground.png']);
  gameScene.addChild(king);

  pig = new Sprite(id['pig_ground.png']);
  gameScene.addChild(pig);

  door = new Sprite(id['door_idle.png']);
  gameScene.addChild(door);

  // Create the black background rectanlge
  let innerBar = new PIXI.Graphics();
  innerBar.beginFill(0x00);
  innerBar.drawRect(0, 0, 128, 8);
  innerBar.endFill();
  healthBar.addChild(innerBar);

  // Create the front red rectangle
  let outerBar = new PIXI.Graphics();
  outerBar.beginFill(0xff3300);
  outerBar.drawRect(0, 0, 128, 8);
  outerBar.endFill();
  healthBar.addChild(outerBar);

  healthBar.outer = outerBar;

  let style = new PIXI.TextStyle({
    fontFamily: "Futura",
    fontSize: 64,
    fill: "white"
  });
  let message = new PIXI.Text("The End", style);
  message.x = 120;
  message.y = app.stage.height / 2 - 32;
  gameOverScene.addChild(message);

  king.x = app.view.height / 2;
  king.y = app.view.width / 2;

  king.vx = 0;
  king.vy = 0;

  // Game Loop Ticker
  app.ticker.add(delta => gameLoop(delta));

  // Player Controls
  // Moving Left
  left.press = () => {
    king.vx = -1;
  };

  left.release = () => {
    if (!right.isDown) {
      king.vx = 0;
    }
  };

  // Moving Right
  right.press = () => {
    king.vx = 1;
  };

  right.release = () => {
    if (!left.isDown) {
      king.vx = 0;
    }
  };
}

// game loop keeps track of player's speed and velocity
function gameLoop(delta) {
  state(delta);
}

function play(delta) {
  let speed = 3 * delta;

  // Use Player.vy and Player.vx (velocity y and x)
  // to change the player's X and Y positions with speed
  king.x += king.vx * speed;
  king.y += king.vy * speed;
}

function cameraOnObject(obj) {
  // figure out what pivot does
  app.stage.pivot.x = obj.position.x;
  app.stage.pivot.y = obj.position.y;

  // app.renderer is the entire screen of the html page
  app.stage.position.x = app.renderer.width / 2;
  app.stage.position.y = app.renderer.height / 2;
}

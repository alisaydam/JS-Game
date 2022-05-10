let playerState = "run";
const dropDown = document.getElementById("animations");
dropDown.addEventListener("change", function (e) {
  playerState = e.target.value;
});

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

const CANVAS_WIDTH = (canvas.width = 600);
const CANVAS_HEIGHT = (canvas.height = 600);

//* Same as document.createElement("img");
const playerImage = new Image();
playerImage.src = "shadow_dog.png";
const spriteWidth = 575; //* 6872(Sprite sheet width)/12 columns of sprite
const spriteHeight = 523; //* 6872(Sprite sheet width)/12 columns of sprite

let gameFrame = 0;
const staggerFrames = 5;
const spriteAnimations = [];
const animationState = [
  {
    name: "idle",
    frames: 7,
  },
  {
    name: "jump",
    frames: 7,
  },
  {
    name: "fall",
    frames: 6,
  },
  {
    name: "run",
    frames: 9,
  },
  {
    name: "dizzy",
    frames: 11,
  },
  {
    name: "sit",
    frames: 5,
  },
  {
    name: "roll",
    frames: 7,
  },
  {
    name: "bite",
    frames: 7,
  },
  {
    name: "KO",
    frames: 12,
  },
  {
    name: "getHit",
    frames: 4,
  },
];

animationState.forEach((state, index) => {
  let frames = {
    loc: [],
  };
  for (let j = 0; j < state.frames; j++) {
    let positionX = j * spriteWidth;
    let positionY = index * spriteHeight;
    frames.loc.push({ x: positionX, y: positionY });
  }
  spriteAnimations[state.name] = frames;
});
function animate() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  let position =
    Math.floor(gameFrame / staggerFrames) %
    spriteAnimations[playerState].loc.length;
  let frameX = spriteWidth * position;
  let frameY = spriteAnimations[playerState].loc[position].y;
  // ctx.fillRect(x, 50, 100, 100);
  //* where my image should be drawn
  //* drawImageArgs Image, where should be placed(x,y), witdh, height
  //* To cut out a part of a sprite user 9 args
  //* ctx.drawImage(image, (sx,sy,sw,sh)-> cut out this part)
  ctx.drawImage(
    playerImage,
    frameX, //*Horizontal sprites
    frameY, //* vertical sprites
    spriteWidth,
    spriteHeight,
    0,
    0,
    CANVAS_WIDTH,
    CANVAS_HEIGHT
  );

  gameFrame++;
  requestAnimationFrame(animate);
}

animate();

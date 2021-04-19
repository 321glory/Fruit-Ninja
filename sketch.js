var PLAY = 1;
var END = 0;
var gameState = 1;
var sword, alien, fruit1, fruit2, fruit3, fruit4, gameOver, knifeSound, gameoverSound;
var swordImg, alienImg, gameOverImg;
var fruitG, alienG;

function preload(){
  swordImg = loadImage("sword.png");
  alienImg = loadAnimation("alien1.png","alien2.png");
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png")
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  gameOverImg = loadImage("gameover.png");
  knifeSound = loadSound("knifeSound.mp3");
  gameoverSound = loadSound("gameover.mp3");
}

function setup(){
  createCanvas(windowWidth, windowHeight);
  sword = createSprite(200, 200, 20, 20);
  sword.addImage(swordImg);
  sword.scale = 0.7;
  
  gameOver = createSprite(width/2, height/2, 20, 20);
  gameOver.addImage(gameOverImg);
  gameOver.visible = false;
  
  fruitG = new Group();
  alienG = new Group();
  
  score = 0;
}

function draw(){
  background("skyblue");
  fill("violet");
  textSize(15);
  text("Score : " + score, width/2, height-500);
  drawSprites();
  
  if(gameState === PLAY){
    sword.x = mouseX;
    sword.y = mouseY;

    if(fruitG.isTouching(sword)){
      fruitG.destroyEach();
      score = score + 5;
      gameState = PLAY;
      knifeSound.play();
    }

    if(alienG.isTouching(sword)){
      gameState = END;
      gameoverSound.play();
    }
    
    spawnFruits();
    createAliens();
  }

  if(gameState === END){
    score = 0;
    fruitG.destroyEach();
    sword.visible = false;
    gameOver.visible = true;
  }
}

function spawnFruits(){
  if(frameCount % 60 == 0){
    var fruit = createSprite(200, 200, 20, 20);
    fruit.velocityX = -(5 + score/500);
    fruit.scale = 0.2;
    
    var rand = Math.round(random(1,4));
    switch(rand) {
      case 1: fruit.addImage(fruit1);
              break;
      case 2: fruit.addImage(fruit2);
              break;
      case 3: fruit.addImage(fruit3);
              break;
      case 4: fruit.addImage(fruit4);
              break;
      default: break;
    }
    
    position = Math.round(random(1, 2));
    if(position == 1){
      fruit.x = width;
      fruit.velocityX = -(5+(score/4));
    }
    else if(position == 2){
      fruit.x = 0;
      fruit.velocityX = (5+(score/4));
    }
    
    fruitG.add(fruit);
  }
}

function createAliens(){
  if(frameCount % 60 === 0) {
    alien = createSprite(width,height-35,10,40);
    alien.y = Math.round(random(30, 400));
    alien.addAnimation("alien",alienImg);
    alien.velocityX = -(5+(score/10));
    alien.lifetime = 400;
    alienG.add(alien);
  }
}
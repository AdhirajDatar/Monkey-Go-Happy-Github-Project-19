//Global Variables
var bananaImage, obstacleImage, obstacleGroup, foodGroup, background1,ground;

 var score = 0;

function preload() {
  runningMonkey = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png", );

  bImage = loadImage("jungle.jpg");
  stoneImage = loadImage("stone.png");
  fruitImage = loadImage("Banana.png");


}


function setup() {
  createCanvas(600, 300);

  background1 = createSprite(300, 9, 800, 600);
  background1.addImage(bImage);
  background1.velocityX = -6;

  monkey = createSprite(50, 250, 30, 30);
  monkey.addAnimation("monkey", runningMonkey);
  monkey.scale = 0.2 ;
  
  ground = createSprite (300,300,600,10); 

  foodGroup = createGroup();
  obstacleGroup = createGroup();

}


function draw() {
  background(255);
  
  console.log(monkey.y);

  background1.velocityX = -6;

  if (background1.x < 300) {
    background1.x = background1.width / 2;
  }
  
  if (obstacleGroup.isTouching(monkey)) {
     monkey.scale =  0.2 ;
     score = score - 5;
    obstacleGroup.destroyEach();
    

  }
  
  if (keyDown("space") && monkey.y >= 233 ) {
    monkey.velocityY = -10;
  }
  
   monkey.velocityY = monkey.velocityY + 0.8;
  monkey.collide(ground);
  
  switch (score) {

    case 10 : monkey.scale = 0.22;
              break;
    case 20 : monkey.scale = 0.24;
              break;
    case 30 : monkey.scale = 0.26;
              break;             
    case 40 : monkey.scale = 0.28;
              break;
    default : break;          

  }

  if (foodGroup.isTouching(monkey)) {
    score = score + 2;
    foodGroup.destroyEach();

  }


  stone();
  food();
  
  drawSprites();
  
  stroke("black");
  textSize(20);
  fill("black");
  time = Math.round(frameCount/20);
  text("Score : " + score,300,50);

}

function stone() {
  if (frameCount % 300 === 0) {
    var obstacle = createSprite(600, 280, 23, 33);
    obstacle.addImage(stoneImage);
    obstacle.scale = 0.15;

    obstacle.velocityX = -10;
    obstacle.lifetime = 60;

    obstacleGroup.add(obstacle);

  }
}

//create the food(bananas)
function food() {
  if (World.frameCount % 80 === 0) {
    var banana = createSprite(600, 56);
    banana.y = random(140, 254);
    banana.addImage(fruitImage);
    banana.scale = 0.05;

    banana.velocityX = -10;
    banana.lifetime = 100;

    foodGroup.add(banana);
  }
}
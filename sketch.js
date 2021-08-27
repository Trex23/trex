var Trex, Trex_running;
var ground, ground2;
var invisible;
var cloud, cloud2;
var altura;
var obstaculo, obstaculo1, obstaculo2, obstaculo3, obstaculo4, obstaculo5, ostaculo6;
var score=0;
var cloudsGroup, obstaclesGroup;
var PLAY=1;
var END=0;
var gameState=PLAY;
var trex_collided;
var gameOver,gameOverImg, restart,restartImg;
var jump, checkPoint, die;
var meteorito, meteoritoImg, meteoritoGroup;
var ave, aveImg, aveGroup, ave2;

function preload(){
  Trex_running=loadAnimation("trex1.png","trex3.png","trex4.png");
  ground2=loadImage("ground2.png");
  cloud2=loadImage("cloud.png");
  obstaculo1=loadImage("obstacle1.png");
  obstaculo2=loadImage("obstacle2.png");
  obstaculo3=loadImage("obstacle3.png");
  obstaculo4=loadImage("obstacle4.png");
  obstaculo5=loadImage("obstacle5.png");
  obstaculo6=loadImage("obstacle6.png");
  trex_collided=loadAnimation("trex_collided.png");
  gameOverImg=loadImage("gameOver.png");
  restartImg=loadImage("restart.png");
  jump=loadSound("jump.mp3");
  checkPoint=loadSound("checkPoint.mp3");
  die=loadSound("die.mp3");
  meteoritoImg=loadImage("meteorito2.0.png");
  aveImg=loadAnimation("Imagen3.png","Imagen2.png","Imagen4.png","Imagen1.png");
  ave2=loadAnimation("Ave_asustada.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  Trex= createSprite(50,height-40,20,50);
  Trex.addAnimation("running",Trex_running);
  Trex.addAnimation("collided",trex_collided);
  Trex.scale=0.5;
  ground=createSprite(width/2,height-10,width,20);
  ground.x=ground.width/2;
  ground.addImage("suelo",ground2);
  invisible=createSprite(width/2,height-3,width,5);
  invisible.visible=false;
  cloudsGroup=createGroup();
  obstaclesGroup=  createGroup();
  Trex.setCollider("circle",0,0,40);
  gameOver=createSprite(width/2,height/2-50);
  restart=createSprite(width/2,height/2);
  gameOver.addImage(gameOverImg);
  restart.addImage(restartImg);
  gameOver.scale=0.5;
  restart.scale=0.5;
  meteoritoGroup= createGroup();
  aveGroup= createGroup();
  
}

function draw() {
  background("white");

  text("Score: "+ score, 520, 10);
  if(gameState===PLAY){
   score=score+ Math.round(getFrameRate()/60); 
    if(touches.length>0||keyDown("space")&& Trex.y>100){
    Trex.velocityY=-10;
      jump.play();
      touches=[];
  }
  Trex.velocityY=Trex.velocityY+0.8;
   ground.velocityX=-4-score/500;
  if(ground.x<0){
    ground.x=ground.width/2;
  } 
    clouds();
  obstaculos();
    meteoritos();
    if(obstaclesGroup.isTouching(Trex)||meteoritoGroup.isTouching(Trex)||aveGroup.isTouching(Trex)){
      gameState=END;
      die.play();
    }
    gameOver.visible=false;
    restart.visible=false;
    if(score>0&&score%500===0){
      checkPoint.play();
    }
  }else if(gameState===END){
    ground.velocityX=0;
    Trex.changeAnimation("collided",trex_collided);
    Trex.velocityY=0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    meteoritoGroup.setVelocityXEach(0);
    meteoritoGroup.setVelocityYEach(0);
    aveGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    meteoritoGroup.setLifetimeEach(-1);
    aveGroup.setLifetimeEach(-1);
    gameOver.visible=true;
    restart.visible=true;
    if(touches.length>0||mousePressedOver(restart)){
      reset();
      touches=[];
    }
  }
  
  Trex.collide(invisible);
  
  drawSprites();
  
}

function reset(){
  gameState=PLAY;
  score=0;
  gameOver.visible=false;
  restart.visible=false;
  obstaclesGroup.destroyEach();
  meteoritoGroup.destroyEach();
  cloudsGroup.destroyEach();
  aveGroup.destroyEach();
  Trex.changeAnimation("running", Trex_running);
}



function clouds(){
  if (frameCount%60===0){
    cloud=createSprite(width,70, 50,30);
    altura=Math.round(random(10,80));
    cloud.y=altura;
    cloud.velocityX=-3;
    cloud.addImage(cloud2);
    cloud.scale=0.5;
    cloud.lifetime=200;
    cloud.depth=Trex.depth;
    Trex.depth=Trex.depth+1;
    cloudsGroup.add(cloud);
  }
}

function obstaculos(){
  if(frameCount%60===0){
    obstaculo=createSprite(width,height-30,20,40);
    obstaculo.velocityX=-5-score/500;
    var ran=Math.round(random(1,6));
    switch(ran){
      case 1: obstaculo.addImage(obstaculo1);
      break;
      case 2: obstaculo.addImage(obstaculo2);
      break;
      case 3: obstaculo.addImage(obstaculo3);
      break;
      case 4: obstaculo.addImage(obstaculo4);
      break;
      case 5: obstaculo.addImage(obstaculo5);
      break;
      case 6: obstaculo.addImage(obstaculo6);
      break;
      default:break;
    }
    obstaculo.scale=0.6;
    obstaculo.lifetime=200;
    obstaclesGroup.add(obstaculo);
  }
  
}

function meteoritos(){
  if(frameCount%100===0){
    var rand=Math.round(random(1,2));
    switch(rand){
      case 1: meteorito=createSprite(590,height/2,20,20);
        meteorito.velocityX=-5-score/500;
        meteorito.velocityY=2;
        meteorito.addImage(meteoritoImg);
        meteorito.scale=0.1;
        meteorito.lifetime=100;
        meteoritoGroup.add(meteorito);
        break;
      case 2: ave=createSprite(0,height/2,20,20);
        ave.velocityX=5;
        ave.addAnimation("Imagen",aveImg);
        ave.addAnimation("Asustada", ave2);
        ave.scale=0.07;
        ave.liftime=120;
        
        aveGroup.add(ave);
        break;
      default:break;
    }   

  }
}
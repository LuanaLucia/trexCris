var trex, trex_correndo, trex_colidiu;
var solo, soloinvisivel, imagemdosolo;

var nuvem, grupodenuvens, imagemdanuvem;
var grupodeobstaculos, obstaculo1, obstaculo2, obstaculo3, obstaculo4, obstaculo5, obstaculo6;

var restart,imgrestart

var gameover,imggameover

var pontuacao;

var somdepular;

var estadojogo = "inicio"

var somcheckpoint;

function preload(){
  trex_correndo = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_colidiu = loadAnimation("trex_collided.png");
  
  somdepular = loadSound("jump.mp3")
  
  somcheckpoint = loadSound("checkPoint.mp3")
  
  imagemdosolo = loadImage("ground2.png");
  
  imagemdanuvem = loadImage("cloud.png");
  
  imgrestart = loadImage("restart.png")  
  
  imggameover = loadImage("GAME OVER 2.0.png")
  
  obstaculo1 = loadImage("obstacle1.png");
  obstaculo2 = loadImage("obstacle2.png");
  obstaculo3 = loadImage("obstacle3.png");
  obstaculo4 = loadImage("obstacle4.png");
  obstaculo5 = loadImage("obstacle5.png");
  obstaculo6 = loadImage("obstacle6.png");
  
}

function setup() {
  createCanvas(600, 200);
 
  
  gameover = createSprite(300,120,10,10)
  gameover.addImage(imggameover)
  gameover.scale = 0.6;
  gameover.visible = false
  
  restart = createSprite(300,75,10,10)
  restart.addImage(imgrestart)
  restart.scale = 0.6;
  restart.visible = false
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_correndo);
  trex.addAnimation("collided" , trex_colidiu)
  trex.scale = 0.5;
  
  solo = createSprite(200,180,400,20);
  solo.addImage("ground",imagemdosolo);
  solo.x = solo.width /2;
 
  
  soloinvisivel = createSprite(200,190,400,10);
  soloinvisivel.visible = false;
  
  grupodenuvens = new Group();
  grupodeobstaculos = new Group();
  
  console.log("Oi" + 5);
  
  pontuacao = 0;
  
  trex.setCollider("circle",0,0,45)
  trex.debug = true
}

function draw() {
  background(255);
  text("Pontuacao: "+ pontuacao, 500,50);
  //pontuacao  pontuacao + Math.round(frameCount/60);
  if (pontuacao%500 === 0 && pontuacao > 10){
    somcheckpoint.play()
  }
  
  if (keyDown("space")&& estadojogo === "encerrar" ){ 
    reset()
  }
  
  if(mousePressedOver(restart)){
    reset()
    trex.velocityY = -13;
    estadojogo = "jogar";
    somdepular.play()
  }
  

  
  if(keyDown("space")&& trex.y >= 100) {
    trex.velocityY = -13;
    estadojogo = "jogar";
    somdepular.play()
  }
  
  trex.velocityY = trex.velocityY + 0.8
  
  if (solo.x < 0){
    solo.x = solo.width/2;
  }
  
  trex.collide(soloinvisivel);
  
  if (estadojogo === "jogar"){
    //gerar as nuvens
   gerarNuvens()
    //gerar os obstaculos
   gerarObstaculos();
    //movimentar o solo
   solo.velocityX = -7;
    pontuacao = pontuacao + 1;
    restart.visible = false;
    gameover.visible = false;
  }
  
  if (trex.isTouching(grupodeobstaculos)){
    estadojogo = "encerrar"
    
  }
  
  if (estadojogo === "encerrar"){
    grupodenuvens.setVelocityXEach(0);
    grupodenuvens.setLifetimeEach(-1);
    grupodeobstaculos.setVelocityXEach(0)
    grupodeobstaculos.setLifetimeEach(-1)
    solo.velocityX =0;
    restart.visible = true;
    gameover.visible = true;
  }
  
  
  drawSprites();
}

function gerarObstaculos(){
 if (frameCount % 60 === 0){
   var obstaculo = createSprite(605,165,10,40);
  obstaculo.velocityX = -6;
   
 
   
    // //gerar obstáculos aleatórios
    var rand = Math.round(random(1,6));
    switch(rand) {
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
      default: break;
    }
   
    //atribuir escala e tempo de duração ao obstáculo         
    obstaculo.scale = 0.5;
    obstaculo.lifetime = 300;
   grupodeobstaculos.add(obstaculo)
 }
}


function gerarNuvens() {
  //escreva o código aqui para gerar as nuvens 
  if (frameCount % 60 === 0) {
    nuvem = createSprite(600,100,40,10);
    nuvem.y = Math.round(random(10,60));
    nuvem.addImage(imagemdanuvem);
    nuvem.scale = 0.5;
    nuvem.velocityX = -3;
    
     //atribuir tempo de duração à variável
    nuvem.lifetime = 200;
    
    //ajustando a profundidade
    nuvem.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    grupodenuvens.add(nuvem);
  }
  
}
function reset(){
  grupodeobstaculos.setLifetimeEach(0)
    grupodenuvens.setLifetimeEach(0)
    pontuacao = 0;
  
 
  
}
const World=Matter.World
const Engine=Matter.Engine
const Bodies=Matter.Bodies
var Kid,kid,tree1,road,car1,house1,scooter,gamestate=0
var life=5
var xpos
var hearts=[]
var res

var xsling,ysling 




function preload(){
  road=loadImage("connection.png")
  //tree=loadImage("trees.png")
  kid1 =loadImage("kid.png")
  car1=loadImage("car_1.png")
  house1=loadImage("house1.png")
  heart=loadImage("heart.png")
}


function setup() {
  createCanvas(displayWidth,displayHeight);
  //Kid=createSprite(displayWidth/4,displayHeight/2+200, 50, 50);
 // Kid.addImage(kid)
 // Kid.scale=0.5
  xsling= displayWidth/2;
  ysling= displayHeight/2+200 
  xpos=width/9
 createHeart()

//Camera.off()

engine=Engine.create()
world=engine.world

  tree1= new Tree(width,height/2,300,300)
  //tree1.addImage(tree)
  kid=new boy(displayWidth/2,displayHeight/2+200, 70, 70)
  ground=new Ground(displayWidth/2,displayHeight-50,displayWidth*6,50)
  sling=new SlingShot(kid.body,{x:xsling,y:ysling})

  res=createSprite(width/2,height/4)
  res.visible=false
}
function createHeart(){
for(var heartss=0;heartss<5;heartss++){
  hearts[heartss]=createSprite(xpos,height/8,10,10)
xpos+=50
hearts[heartss].addImage(heart)
hearts[heartss].scale=0.2  
}
}

function draw() {
  background("white"); 
  image(road,0,0,4*displayWidth,displayHeight)
  Engine.update(engine)
 
  sling.display()
if(kid.body.position.x>=1198&&kid.body.position.y<=212&&kid.body.position.y>27&&kid.body.position.x<1400
){
  Matter.Body.setStatic(kid.body,true)
xsling=kid.body.position.x
ysling=kid.body.position.y
console.log(xsling+","+ysling)
gamestate=0
sling.attach(kid.body,{
  x:xsling,
  y:ysling
})
}
//if(gamestate==1)
camera.position.x=kid.body.position.x
camera.position.y=height/2

//if(tree1.body.position.x-kid.body.position.x==300){
 // Matter.Body.setStatic(kid.body,true)}
  //ground.display()
  drawSprites();
tree1.display()
  kid.display ()
  textSize(20)
  text("Press spacebar to regenerate your charcter",width/2,height/7)
  
  if(life==0){
    gamestate= 2
    res.visible=true
  }
  if(gamestate==2){
    if(mousePressedOver(res)){
      restart()

    }




  }
  //console.log(mouseX+","+mouseY)
}

function restart(){

  image(road,0,0,4*displayWidth,displayHeight)
  xsling= displayWidth/2;
  ysling= displayHeight/2+200 
Matter.Body.setPosition(kid.body,{x:xsling,y:ysling})
sling.attach(kid.body,{
  x:xsling,
  y:ysling
})
gamestate=0
life=6

res.visible=false
 xpos=width/9
createHeart()
}

function keyPressed(){
if(keyCode==32&&gamestate==1){
  Matter.Body.setPosition(kid.body,{
    x:xsling,y:ysling
  })
  sling.attach(kid.body,{
    x:xsling,
    y:ysling
  })
  gamestate=0
  life--
  if (life>=0){
    hearts[life].destroy()
  }
}
}


function mouseDragged(){
  if(gamestate==0){
  Matter.Body.setPosition(kid.body,{
    x:mouseX,y:mouseY
   
  })
}
}


function mouseReleased() 
{ if(gamestate==0) {
   sling.fly()
    gamestate=1
   } 
   if(gamestate==0&&xsling>=1198&&ysling<=212&&ysling>27&&xsling<=1400)
   { sling.fly()
     Matter.Body.setStatic(kid.body,false) 
     Matter.Body.applyForce(kid.body,kid.body.position,{x:100,y:-100}) 
     gamestate=1 }
     }
var dog,sadDog,happyDog;
var lastFed;

function preload(){
  sadDog=loadImage("Images/Dog.png");
  happyDog=loadImage("Images/happy dog.png");
}

function setup() {
  database=firebase.database()
  createCanvas(1000,400);
  
foodObject=new Food()
foodStock=database.ref('Food')
foodStock.on("value",readStock)

  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

feed=createButton('feed the dog')
feed.position(700,95)
feed.mousePressed(feedDog)

addFood=createButton('add Food')
addFood.position(800,95)
addFood.mousePressed(addFoods)

}

function draw() {
  background(46,139,87);

foodObject.display()
fedTime=database.ref("FeedTime")
fedTime.on("value",function(data){
  lastFed=data.val()
})

fill(255,255,255)
textSize(15)
if(lastFed>12){
text(" last Fed: "+lastFed%12+' PM ',350,30)
}
else if(lastFed===0){
text(" last Fed: "+12+' AM ',350,30)
}

else{
  text(" last Fed: "+lastFed+ ' AM ',350,30)

}

  drawSprites();
}
//function to read food Stock
function readStock(data){
foodS=data.val()
foodObject.updateFoodStock(foodS)
}

//function to update food stock and last fed time
function feedDog(){
dog.addImage(happyDog)
var foodStock_val=foodObject.getFoodStock()
if(foodStock_val<=0){
  foodObject.updateFoodStock(foodStock_val*0)
}  
else{
  foodObject.updateFoodStock(foodStock_val-1)
}
database.ref('/').update({
Food:foodObject.getFoodStock(),
FeedTime:hour()  
})
}

//function to add food in stock
function addFoods(){
  foodS++
  database.ref('/').update({
  Food:foodS
  }) 
}
var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var feed , lastFed;
var feedDogs;
var fedTime;

//create feed and lastFed variable here


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here

  addFood=createButton("Add Food");
  addFood.position(700,95);
  addFood.mousePressed(addFoods);

  feedDogs = createButton("Feed Dog");
  feedDogs.position(800,95);
  feedDogs.mousePressed(feedDog);
}

function draw() {
  background(46,139,87);
  foodObj.display();

  fedTime = database.ref("FoodTime");
  fedTime.on("value",function(data){
    lastFed = data.val();
  })
  fill(255);
  textSize(20);
 if(lastFed>=12){
   text("Last Fed " + lastFed%12 + ":pm" , 300,95 ); 
 }
else if(lastFed===12){
 text("Last Fed 12:am",300,95);
}
else{
  text("Last Fed " + lastFed + ":am", 300,95);
}
 

  //write code to display text lastFed time here

 
  drawSprites();
}


function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);
  var foodValue = foodObj.getFoodStock();
  if(foodValue <= 0){
    foodObj.updateFoodStock(foodValue*0);
  }
  else
  {
    foodObj.updateFoodStock(foodValue - 1);
  }
  database.ref('/').update({
    food : foodObj.getFoodStock(),
    FoodTime: hour(),
  })

}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    food:foodS
  })
}


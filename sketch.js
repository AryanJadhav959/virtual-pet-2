//Create variables here
var dog,dogHappy;
var foodS,foodStock
var database;
var feed,addFoodS,feedDog;
var lastFed,fedTime;
var foodObj;



function preload()
{
  //load images here
  dog = loadImage('images/Dog.png');
  dogHappy = loadImage('images/happydog.png');
}

function setup() {
	createCanvas(500, 500);
  doggy = createSprite(250,350,10,10);
  doggy.addImage(dog);
  doggy.scale = 0.15;

  foodObj = new Foods(100,150,10,10);

  database = firebase.database();
  foodStock = database.ref('Food');
  foodStock.on("value",readStock);

 
}

function draw() {  
  background(46, 139, 87);

  feed = createButton("Feed the dog");
  feed.position(570,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add food");
  addFood.position(500,95);
  addFood.mousePressed(addFoodS);
  foodObj.display();

  fedTime=database.ref('feedTime');
  feedTime.on("value",function(data){
    lastFed = data.val();
  });

  function feedDog(){
    doggy.addImage(dogHappy);

    foodObj.updateFoodStock(foodObj.getFoodStock()-1)
    database.ref('/').update({
      Food:foodObj.getFoodStock(),
      FeedTime:hour()
    })
  }

  function addFoods(){
    foodS++;
    database.ref('/').update({
      Food:foodS
    })
  }

  drawSprites();
  //add styles here
  textSize(20);
  fill(0);
  stroke(2);
 
}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  if(x <= 0){
    x = 0 ; 
  }
  else
  {
    x = x - 1;
  }
  database.ref('/').update({
    Food : x 
  })
}
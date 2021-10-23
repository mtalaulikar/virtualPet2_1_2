//Create variables here
var dog, dogImage, happyDog, foodS, database, foodStock;
var feedPet, addFood;
var fedTime, lastFed;
var food;
function preload()
{
	//load images here
  dogImage = loadImage("images/dogImg.png");
  happyDogImage = loadImage("images/dogImg1.png");
  houseImage = loadImage("images/house.png")
  milkImage = loadImage("images/Milk.png")
}

function setup() {
	createCanvas(500, 500);
  dog = createSprite(440,400);
  dog.addImage(dogImage);
  dog.scale = 0.2;
  food = new Food();

  database = firebase.database();
  foodStockRef = database.ref('Food');
  foodStockRef.on("value", function(data){
    foodS = data.val();
    food.updateFoodStock(foodS);
    
  });
  

  
  feedPet = createButton("Feed Pet");
  feedPet.position(500,60);
  feedPet.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(600, 60);
  addFood.mousePressed(addFoods);

  
  
  
}


function draw() {  
  background(houseImage);
  food.display();
  feedTime = database.ref('FeedTime');
  feedTime.on("value", function(data){
    lastFed = data.val();
  });
  textSize(15);
  if(lastFed > 12){
    text('Last Fed : ' + lastFed%12 + "PM", 350,30);
  } else if(lastFed === 0) {
    text("Last Fed : 12 AM", 350,30);
  } else {
    text('Last Fed : ' + lastFed + "AM", 350,30);
  }
  if (hour() - lastFed >=1){
    dog.addImage(dogImage);
  }
 drawSprites();
  
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food : foodS
  })
}

function feedDog(){
  dog.addImage(happyDogImage);
  image(milkImage,dog.x - 100, dog.y,70,70);
  if(food.getFoodStock() <= 0) {
    dog.addImage(dogImage);
  } else {
    food.updateFoodStock(food.getFoodStock() - 1);
  }
  
  database.ref('/').update({
    Food : food.getFoodStock(),
    FeedTime : hour()
  })
}




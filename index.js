/**
Sources
=======
https://www.w3schools.com/graphics/game_gravity.asp
https://developer.ibm.com/industries/gaming/tutorials/wa-build2dphysicsengine/

Approach
=======
With my current level of knowledge with the Canvas API, I attempted to build 
a working solution with ES6 JS. 
**/

//Helper Functions
var randomNumber = function (min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
};

//Utility Functions
function getFormData($form){
    var unindexed_array = $form.serializeArray();
    var indexed_array = {};

    $.map(unindexed_array, function(n, i){
        indexed_array[n['name']] = n['value'];
    });

    return indexed_array;
}

//Global Values
var canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight; 
var ctx = canvas.getContext('2d');

//Global Position Values
var top = 0;
var rightLim = window.innerWidth;
var bottom = window.innerHeight;
var leftLim = 0;

//Shape Entity
class Shape {
  constructor(type, color, spawnLoc){
    this.type = type;
    this.color = color;
    //spawn location for shapes
    this.spawnLoc = {
      x: randomNumber(leftLim - 30, rightLim - 30),
      y: bottom - 100
    };
    this.speedX = 0;
    this.speedY = 0;
    this.gravity = 0.05;
    this.gravitySpeed = 0;
    this.draw();
  }
  
  //getters
  getType(){ 
    return this.type;
  }
  getColor(){
    return this.color;
  }
  //setters
  setType(type){ 
    this.type = type;
  }
  setColor(color){
    this.color = color;
  }
  //generate shape
  draw(){
    var type = this.type;
    switch(type){
      //cube
      case 'cube':
        var x = this.spawnLoc.x;
        var y = this.spawnLoc.y;
        ctx.fillStyle = this.color;
        ctx.fillRect(x, y, 100, 100);
        break;
      //circle
      case 'circle':
        this.spawnLoc.y += 50;
        var x = this.spawnLoc.x;
        var y = this.spawnLoc.y;
        var r = 50;
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(x, y, 50, 0, 2 * Math.PI);
        ctx.fill();
        break;
      //triangle
      case 'triangle':
        var x = this.spawnLoc.x;
        var y = this.spawnLoc.y;
        var height = 100;
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.moveTo(x, y);
        ctx.lineTo(x + height, y);
        ctx.lineTo(x, y + height);
        ctx.closePath();
        ctx.fill();
    }
  }
  
  //animate shape
  update(){
    var type = this.type;
    
    switch(type){
      case 'circle':
        var x = this.spawnLoc.x;
        var y = this.spawnLoc.y;
        var r = 50;
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(x, y, 50, 0, 2 * Math.PI);
        ctx.fill();
        break;
    }
  }
  
  newPos(){
    this.gravitySpeed += this.gravity;
    this.x -= this.speedX;
    this.y -= this.speedY + this.gravitySpeed;
    this.hitTop();
  }
  hitTop(){
    var top = 0;
      if (this.y > 0) {
          this.y = 0;
          this.gravitySpeed = 0;
      }
   }
}

// Clears screen
function clearScreen(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
}

// Animate function
function animate(obj) {
  requestAnimationFrame(animate)
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  obj.newPos();
  obj.update();
}

//All the existing shapes in the canvas
var shapes = [];


$('[data-clear-screen]').on('click',function(event){
  event.preventDefault();
  clearScreen();
});

//Checking for form submit events
$('form').on('submit', function(event){
  var self = $(this);

  //Get data from form
  event.preventDefault();
  var data = getFormData(self);
  var shape = data.shape;
  var color = data.color;
  var shiba = data.shiba === 'yes'? true:false;

  //Create shape from the form data
  var obj = new Shape(shape,color);
  
  //Add that shape to the canvas
  shapes.push(obj);
});



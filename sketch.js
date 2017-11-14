var myData;
var people = [];
var col;
var value = 0;

function preload() {
  myData = loadJSON('assets/peopleinspace.json');
}

function setup() {
  createCanvas(500, 500);
  
  //print(myData);
  for(var i = 0; i < myData.people.length; i++) {
    var astroData = myData.people[i];
    print(astroData);
    var newAstronaut = new Astronaut(astroData.launchdate, astroData.name, astroData.title);
    people.push(newAstronaut);
  }
}

function draw() {
  background(value,value,0);
  stroke(255, 191, 0);
  strokeWeight(10);
  
  if(mouseIsPressed == true) {
    col=230;
      strokeWeight(10);
  } else {
    col=130;
      strokeWeight(0);
  }

	for(var i = 0; i < people.length; i++) {
	  var astronaut = people[i];
	  astronaut.move();
	  astronaut.display();
	  
	}
	
}


function mouseDragged() {
  value = value + 5;
  if (value > 255) {
    value = 0;
  }
}


function Astronaut(launchDate, name, title) {
    
    this.name = name;
    this.title = title;
    
    // transform the launch date from String
    // to a date Object calculated in milliseconds
    this.launchDate = Date.parse(launchDate);
    // calculate the time spent in space
    var timeInSpace = Date.now() - this.launchDate;
    // define radius according to the time spent in space
    this.radius = floor(timeInSpace / (1000 * 60 * 60 * 24)) / 5;
    
    this.x = random(this.radius, width-this.radius);
    this.y = random(this.radius, height-this.radius);
    
    this.incrementX = 1;
    this.incrementY = 1;
    
    
    this.display = function() {
        //col=255;
        if(this.title == 'commander') {
          fill(0,0,col);
        } else {
          fill(col,col,50);
        }
        ellipse(this.x, this.y, this.radius * 2);
        
        fill(0);
        //textAlign(CENTER);
        //text(this.name, this.x, this.y + this.radius + 15);
    }
    
    this.move = function() {
        
        this.x += this.incrementX;
        this.y += this.incrementY;
        
        if (this.x > width - this.radius || this.x < this.radius){
            this.incrementX *= -1
            print(this.x);
            print(this.radius);
        }

        if (this.y > height - this.radius || this.y < this.radius){
            this.incrementY *= -1
            print(this.y);
            print(this.radius);
        }
        
        
    }   
}
const DEBUGHEIGHTCHANGE = 10;
const NOFBUTTERFLIES = 10;

var sketchWidth;
var sketchHeight;
var textHeight;
// var scrollPosition = 0;
var scrollPosition = window.scrollY;
var relPosition = 0;

butterFlies = [];

function setup() {
    print("p5 starting...");

    sketchWidth = document.getElementById("nature").offsetWidth;
    sketchHeight = window.innerHeight;
    textHeight = document.getElementById("prose").offsetHeight;;
    recalculateRelativePosition();

    var canvas = createCanvas(sketchWidth, sketchHeight);
    canvas.parent('nature');

    for(var i = 0; i < NOFBUTTERFLIES; i++) {
        butterFlies.push({
            'x': width * random(),
            'y': height/2 + height/2 * random(),
            's': 5 + random() * 10
        });
    };
}

function draw() {
    recalculateRelativePosition();
    background(80 * relPosition,
               220 * relPosition,
               80 * relPosition);

    flutter();
    drawButterflies();

    stroke('white');
    line(0, height * relPosition, width, height * relPosition);

    textAlign(CENTER, CENTER);
}

function flutter() {
    butterFlies.forEach(b => {
        b.x += map(random(), 0, 1, -4, 4);
        if (b.x < 0) {b.x = width};
        if (b.x > width) {b.x = 0};
        
        b.y += map(random(), 0, 1, -4, 4);
        if (b.y < 0) {b.y = height};

        b.s = constrain(b.s + random() * 5, 5, 15);
    });
}

function drawButterflies() {
    butterFlies.forEach(b => {
        push();
        translate(b.x, b.y);
        rotate(HALF_PI);
        stroke(0, 0, 0, 255*relPosition);
        textSize(b.s);
        textFont('times new roman');
        // text("🦋", 0, 0);
        text('>B', 0, 0);
        pop();
    });
}

function recalculateRelativePosition() {
    // relPosition = map(scrollPosition, 0, textHeight - window.innerHeight, 0, 1);
    relPosition = map(window.scrollY, 0, textHeight - window.innerHeight, 0, 1);  
}

/*
function mouseWheel(event) {
    scrollPosition = constrain(scrollPosition += event.delta, 0, textHeight);
    recalculateRelativePosition();
    // console.log(round(relPosition, 2));
}
*/

function windowResized(e) {
    console.log(e);
    
    sketchWidth = document.getElementById("nature").offsetWidth;
    sketchHeight = window.innerHeight;
    textHeight = document.getElementById("prose").offsetHeight;
    resizeCanvas(sketchWidth, sketchHeight - DEBUGHEIGHTCHANGE);
    recalculateRelativePosition();

    // butterFlies.forEach(b => {
    // could move them there relative here
    // });
}

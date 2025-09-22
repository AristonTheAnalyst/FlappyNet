//Game variables

let bird;
let gravity = 0.7;
let gameStarted = false;

function setup() {
    createCanvas(800, 600);

    bird = {
        x:100,
        y:height/2,
        velocity:0,
        size:30
    };

}

function draw() {
    background(135, 206, 235); // Sky blue background

    //Update bird physics
    if(gameStarted) {
        bird.velocity += gravity;
        bird.y += bird.velocity;
    }

    //Draw bird
    fill(255, 255, 0); // Yellow bird
    ellipse(bird.x, bird.y, bird.size);

    //Ground
    fill(0, 255, 0); // Green ground
    rect(0, height - 50, width, 50);
}

function keyPressed() {
    //When spacebar is pressed
    if(key === ' '){
        gameStarted = true;
        bird.velocity = -12;
    }
}

function createPipe() {
    let gapHeight = 150;
    let gapY = random(gapSize, height - 50 - gapSize);
}

function updatePipes() {
    for(let i = pipes.length - 1; i >= 0; i--) {
        pipes[i].x -= 3; //Pipe Speed

        //Remove off-screen pipes
        if(pipes[i].x < -pipes[i].width) {
            pipes.splice(i,1);
        }
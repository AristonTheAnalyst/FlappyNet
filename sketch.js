//Game variables

let bird;
let gravity = 0.6;
let gameStarted = false;
let pipes = []; 
let score = 0; 
let gameOver = false; 

function setup() {
    createCanvas(800, 600);

    bird = {
        x:300,
        y:height/2,
        velocity:0,
        size:30
    };

    pipes.push(createPipe());

}

    
function draw() {
    background(135, 206, 235);
    
    if(gameStarted && !gameOver) {
        bird.velocity += gravity;
        bird.y += bird.velocity;
        updatePipes();
        
        // Check for collisions
        if (checkCollisions()) {
            gameOver = true;
        }
    }
    
    // Draw bird
    fill(255, 255, 0);
    ellipse(bird.x, bird.y, bird.size);
    
    drawPipes();
    
    // Ground
    fill(0, 255, 0);
    rect(0, height - 50, width, 50);
    
    // Show score
    fill(255);
    textSize(32);
    text('Score: ' + score, 20, 40);
    
    // Show game over message
    if (gameOver) {
        fill(255);
        textAlign(CENTER);
        textSize(48);
        text('GAME OVER', width/2, height/2);
        textSize(24);
        text('Press R to restart', width/2, height/2 + 50);
        textAlign(LEFT); // Reset alignment
    }
}



function createPipe() {
    let gapSize = 150;
    let gapY = random(gapSize, height - 50 - gapSize);

    return { 
        x: width,
        gapY: gapY,
        gapSize: gapSize,
        width: 80,
        scored: false
    };
}

function updatePipes() {
    for(let i = pipes.length - 1; i >= 0; i--) {
        pipes[i].x -= 3; //Pipe Speed

        //Remove off-screen pipes
        if(pipes[i].x < -pipes[i].width) {
            pipes.splice(i,1);
        }

        // Score update when bird passes pipe
        if(!pipes[i].scored && bird.x > pipes[i].x + pipes[i].width) {
            score++;
            pipes[i].scored = true;
        }

    }   // Add new pipe when last pipe is halfway across screen
    if(pipes[pipes.length - 1].x < width / 2) {
        pipes.push(createPipe());
    }
}

function drawPipes() {
    fill(0, 255, 0); // Green pipes
    
    for(let pipe of pipes) {
        // Top pipe
        rect(pipe.x, 0, pipe.width, pipe.gapY);
        
        // Bottom pipe
        rect(pipe.x, pipe.gapY + pipe.gapSize, pipe.width, height - 50 - (pipe.gapY + pipe.gapSize));
    }
}

function keyPressed() {
    //When spacebar is pressed
    if(key === ' ' && !gameOver){
        gameStarted = true;
        bird.velocity = -11; //Flap strength
    }
    
    // Restart game with R key
    if(key === 'r' || key === 'R') {
        if(gameOver) {
            // Reset everything
            gameOver = false;
            gameStarted = false;
            score = 0;
            bird.y = height/2;
            bird.velocity = 0;
            pipes = [];
            pipes.push(createPipe());
        }
    }
}


function checkCollisions() {
    // Check ground collision
    if (bird.y + bird.size/2 > height - 50) {
        return true; // Hit ground
    }
    
    // Check ceiling collision
    if (bird.y - bird.size/2 < 0) {
        return true; // Hit ceiling
    }
    
    // Check pipe collisions
    for (let pipe of pipes) {
        // Only check pipes that are near the bird
        if (bird.x + bird.size/2 > pipe.x && bird.x - bird.size/2 < pipe.x + pipe.width) {
            // Check if bird is in the gap
            if (bird.y - bird.size/2 < pipe.gapY || bird.y + bird.size/2 > pipe.gapY + pipe.gapSize) {
                return true; // Hit pipe
            }
        }
    }
    
    return false; // No collision
}
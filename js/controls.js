function moveUp(){
    let pX = gameState.player.pos_x
    let pY = gameState.player.pos_y
    let map = gameState.currentLayout
    if (!gameState.isPlaying){
        // Ignore command

    }
    else if(map[pY-1][pX] == 0){
        // Animate movement blocked

    } else {
        //Update position
        gameState.player.pos_y -= 1
        
        evaluateLevelEnd()

        //Animate Walls
        showStartingWalls()
        
    }
}
function moveDown(){
    let pX = gameState.player.pos_x
    let pY = gameState.player.pos_y
    let map = gameState.currentLayout
    if(!gameState.isPlaying){
        // Ignore command
    } else if (map[pY+1][pX] == 0){
        // Animate movement blocked
    } else {
        //Update position
        gameState.player.pos_y += 1
        
        evaluateLevelEnd()

        //Animate Walls
        showStartingWalls()
        
    }
}
function moveLeft(){
    let pX = gameState.player.pos_x
    let pY = gameState.player.pos_y
    let map = gameState.currentLayout
    if(!gameState.isPlaying){
        // Ignore Command
    } else if (map[pY][pX-1] == 0){
        // Animate movement blocked
        if (gameState.player.isMoving){

        } else {
            gameState.player.isMoving = true
            gameState.player.direction = 'l'
        }
    } else {
        //Update position
        gameState.player.pos_x -= 1
        
        evaluateLevelEnd()

        //Animate Walls
        showStartingWalls()
        
    }
}
function moveRight(){
    let pX = gameState.player.pos_x
    let pY = gameState.player.pos_y
    let map = gameState.currentLayout
    if(!gameState.isPlaying){
        // Ignore Command
    } else if (map[pY][pX+1] == 0){
        // Animate movement blocked
    } else {
        //Update position
        gameState.player.pos_x += 1
        
        evaluateLevelEnd()

        //Animate Walls
        showStartingWalls()
        
    }
}


document.onkeydown = function (event){
    switch(event.key){
        case 'ArrowUp':
            moveUp()
            break;
        case 'ArrowDown':
            moveDown()
            break;
        case 'ArrowLeft':
            moveLeft()
            break;
        case 'ArrowRight':
            moveRight()
            break;
        default:
            break;
    }
}
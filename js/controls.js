function moveUp(){
    if (!gameState.isPlaying){
        return false
    }
    let dir = 't'
    let pX = gameState.player.pos_x
    let pY = gameState.player.pos_y
    let map = gameState.currentLayout
    if(map[pY-1][pX] == 0){
        // Animate movement blocked
        movePlayer(dir)

    } else {
        //Update position
        gameState.player.pos_y -= 1
        movePlayer(dir)

        evaluateLevelEnd()
        //Animate Walls
        shouldAnimateWalls()
        
    }
}
function moveDown(){
    if (!gameState.isPlaying){
        return false
    }
    let dir = 'b'
    let pX = gameState.player.pos_x
    let pY = gameState.player.pos_y
    let map = gameState.currentLayout
    if (map[pY+1][pX] == 0){
        movePlayer(dir)
    } else {
        //Update position
        gameState.player.pos_y += 1
        movePlayer(dir)
        
        evaluateLevelEnd()

        //Animate Walls
        shouldAnimateWalls()
        
    }
}
function moveLeft(){
    if (!gameState.isPlaying){
        return false
    }
    let dir = 'l'
    let pX = gameState.player.pos_x
    let pY = gameState.player.pos_y
    let map = gameState.currentLayout
    if (map[pY][pX-1] == 0){
        // Animate movement blocked
        movePlayer(dir)
    } else {
        //Update position
        gameState.player.pos_x -= 1
        movePlayer(dir)
        evaluateLevelEnd()

        //Animate Walls
        shouldAnimateWalls()
        
    }
}

function moveRight(){
    if (!gameState.isPlaying){
        return false
    }
    let dir = 'r'
    let pX = gameState.player.pos_x
    let pY = gameState.player.pos_y
    let map = gameState.currentLayout
    if (map[pY][pX+1] == 0){
        movePlayer(dir)
    } else {
        //Update position
        gameState.player.pos_x += 1
        movePlayer(dir)
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
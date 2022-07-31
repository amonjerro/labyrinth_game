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
        shouldAnimateWalls(dir)
        
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
        shouldAnimateWalls(dir)
        
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
        shouldAnimateWalls(dir)
        
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
        showStartingWalls(dir)
        
    }
}


function setUpMovementCombinations(){
    gameState.borders['l'].movementCombinations.hidden.t = gameState.borders['l'].up
    gameState.borders['l'].movementCombinations.showing.t = gameState.borders['l'].down
    gameState.borders['l'].movementCombinations.hidden.r = gameState.borders['l'].left
    gameState.borders['l'].movementCombinations.showing.r = gameState.borders['l'].right
    gameState.borders['l'].movementCombinations.hidden.b = gameState.borders['l'].down
    gameState.borders['l'].movementCombinations.showing.b = gameState.borders['l'].up
    gameState.borders['l'].movementCombinations.hidden.l = gameState.borders['l'].right
    gameState.borders['l'].movementCombinations.showing.l = gameState.borders['l'].left

    gameState.borders['r'].movementCombinations.hidden.t = gameState.borders['r'].up
    gameState.borders['r'].movementCombinations.showing.t = gameState.borders['r'].down
    gameState.borders['r'].movementCombinations.hidden.r = gameState.borders['r'].right
    gameState.borders['r'].movementCombinations.showing.r = gameState.borders['r'].left
    gameState.borders['r'].movementCombinations.hidden.b = gameState.borders['r'].down
    gameState.borders['r'].movementCombinations.showing.b = gameState.borders['r'].up
    gameState.borders['r'].movementCombinations.hidden.l = gameState.borders['r'].left
    gameState.borders['r'].movementCombinations.showing.l = gameState.borders['r'].right

    gameState.borders['t'].movementCombinations.hidden.t = gameState.borders['t'].up
    gameState.borders['t'].movementCombinations.showing.t = gameState.borders['t'].down
    gameState.borders['t'].movementCombinations.hidden.r = gameState.borders['t'].right
    gameState.borders['t'].movementCombinations.showing.r = gameState.borders['t'].left
    gameState.borders['t'].movementCombinations.hidden.b = gameState.borders['t'].down
    gameState.borders['t'].movementCombinations.showing.b = gameState.borders['t'].down
    gameState.borders['t'].movementCombinations.hidden.l = gameState.borders['t'].left
    gameState.borders['t'].movementCombinations.showing.l = gameState.borders['t'].right

    gameState.borders['b'].movementCombinations.hidden.t = gameState.borders['b'].down
    gameState.borders['b'].movementCombinations.showing.t = gameState.borders['b'].up
    gameState.borders['b'].movementCombinations.hidden.r = gameState.borders['b'].right
    gameState.borders['b'].movementCombinations.showing.r = gameState.borders['b'].left
    gameState.borders['b'].movementCombinations.hidden.b = gameState.borders['b'].up
    gameState.borders['b'].movementCombinations.showing.b = gameState.borders['b'].down
    gameState.borders['b'].movementCombinations.hidden.l = gameState.borders['b'].left
    gameState.borders['b'].movementCombinations.showing.l = gameState.borders['b'].right


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
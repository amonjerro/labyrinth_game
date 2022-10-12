gameState = {
    theCanvas:null,
    cnvCtx:null,
    isPlaying:true,
    drawingEnd:false,
    center:{
        x:null,
        y:null,
    },
    player:{
        pos_x:null,
        pos_y:null,
        size:40
    },
    endLocation:{
        pos_x:null,
        pos_y:null
    },
    currentLayout:null,
    backgroundGradientLayout:null,
    maxBackground:0,
    currentLevel:-1,
    borders:{
        'l':null,
        'r':null,
        't':null,
        'b':null
    }
    
}

const DIR_KEYS = ['l','r','t','b']
const INVERSE_DIRS = {
    'l':'r',
    'r':'l',
    't':'b',
    'b':'t'
}

const maps = [
    //Level_0
    [
        {
            layout: [
                [0,0,0,0,0],
                [0,1,0,1,0],
                [0,1,0,1,0],
                [0,1,1,1,0],
                [0,0,0,0,0]
            ],
            start_spots:[{x:1, y:1}, {x:3, y:1}],
            exit_spots:[{x:3, y:1}, {x:1, y:1}]
        },
        {
            layout:[
                [0,0,0,0,0],
                [0,1,1,0,0],
                [0,0,1,0,0],
                [0,0,1,1,0],
                [0,0,0,0,0]
            ],
            start_spots:[{x:1, y:1}, {x:3, y:3}],
            exit_spots:[{x:3, y:3}, {x:1, y:1}]
        }
    ],
    //Level 1
    [
        {
            layout: [
                [0,0,0,0,0,0,0,0],
                [0,1,0,1,1,1,1,0],
                [0,1,0,1,0,0,1,0],
                [0,1,1,1,0,1,0,0],
                [0,0,1,0,1,1,1,0],
                [0,1,1,1,1,0,1,0],
                [0,0,0,0,0,0,0,0]
            ],
            start_spots:[{x:1,y:1}, {x:6, y:2}, {x:5, y:3}],
            exit_spots:[{x:5,y:3},{x:6, y:5},{x:6, y:2}]
        },
        {
            layout:[
                [0,0,0,0,0,0,0,0],
                [0,1,1,1,1,1,0,0],
                [0,0,1,0,0,1,0,0],
                [0,1,0,1,1,1,0,0],
                [0,1,1,0,1,0,1,0],
                [0,0,1,1,1,1,1,0],
                [0,0,0,0,0,0,0,0]
            ],
            start_spots:[{x:3, y:3}, {x:2, y:2}, {x:6, y:4}],
            exit_spots:[{x:1, y:3}, {x:6, y:4}, {x:2,y:2}]
        }
    ],
    //Level 2
    [
        {
            layout:[
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],//0
                [0, 1, 0, 0, 1, 1, 1, 0, 1, 1, 0],//1
                [0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 0],//2
                [0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0],//3
                [0, 0, 1, 0, 1, 1, 1, 0, 1, 0, 0],//4
                [0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0],//5
                [0, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0],//6
                [0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0],//7
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]//8
               //0  1  2  3  4  5  6  7  8  9  10
            ],
            start_spots:[{x:1,y:1},{x:9,y:1},{x:9,y:7},{x:3,y:5}],
            exit_spots:[{x:6,y:7},{x:7,y:5},{x:4, y:4},{x:8,y:4}]
        }
    ]
]

function changeLevel(){
    gameState.currentLevel += 1
    if (gameState.currentLevel > 0){
        hideLevelTransition()
    } 

    pause()

    //Pick information
    let available_maps = maps[gameState.currentLevel]
    let mapPickIndex = Math.floor(Math.random()*available_maps.length)
    gameState.currentLayout = available_maps[mapPickIndex].layout
    gameState.backgroundGradientLayout = []
    for (let i = 0; i < gameState.currentLayout.length; i++){
        gameState.backgroundGradientLayout.push(gameState.currentLayout[i].slice())
    }

    let positionsIndex = Math.floor(Math.random()*available_maps[mapPickIndex].start_spots.length)
    gameState.player.setPosX(available_maps[mapPickIndex].start_spots[positionsIndex].x)
    gameState.player.setPosY(available_maps[mapPickIndex].start_spots[positionsIndex].y)
    gameState.endLocation.pos_x = available_maps[mapPickIndex].exit_spots[positionsIndex].x
    gameState.endLocation.pos_y = available_maps[mapPickIndex].exit_spots[positionsIndex].y

    calculateBackgroundLayer(gameState.endLocation.pos_x, gameState.endLocation.pos_y)
    showStartingWalls()
    unpause()

}

function checkDir(x, y){
    return gameState.currentLayout[y][x] == 1
}

function calculateBackgroundLayer(x, y){
    //FIFO queue flood fill
    let horizon = []
    let visited = {}
    gameState.maxBackground = 0

    if(checkDir(x, y+1)){
        horizon.push({x:x, y:y+1, value:1})
    }
    if(checkDir(x, y-1)){
        horizon.push({x:x, y:y-1, value:1})

    }
    if(checkDir(x-1, y)){
        horizon.push({x:x-1, y:y, value:1})

    }
    if(checkDir(x+1, y)){
        horizon.push({x:x+1, y:y, value:1})

    }    
    
    visited[`x${x}y${y}`] = true

    while(horizon.length > 0){
        let popped = horizon.shift()
        gameState.backgroundGradientLayout[popped.y][popped.x] = popped.value
        if (popped.value > gameState.maxBackground){
            gameState.maxBackground = popped.value
        }
        if(checkDir(popped.x, popped.y+1) && !visited[`x${popped.x}y${popped.y+1}`]){
            horizon.push({x:popped.x, y:popped.y+1, value:popped.value+1})
        }
        if(checkDir(popped.x, popped.y-1)  && !visited[`x${popped.x}y${popped.y-1}`]){
            horizon.push({x:popped.x, y:popped.y-1, value:popped.value+1})
    
        }
        if(checkDir(popped.x-1, popped.y)  && !visited[`x${popped.x-1}y${popped.y}`]){
            horizon.push({x:popped.x-1, y:popped.y, value:popped.value+1})
    
        }
        if(checkDir(popped.x+1, popped.y)  && !visited[`x${popped.x+1}y${popped.y}`]){
            horizon.push({x:popped.x+1, y:popped.y, value:popped.value+1})
    
        }
        visited[`x${popped.x}y${popped.y}`] = true

    }

}

function evaluateLevelEnd(){
    let pX = gameState.player.pos_x
    let pY = gameState.player.pos_y
    
    let end_x = gameState.endLocation.pos_x
    let end_y = gameState.endLocation.pos_y

    if (pX == end_x && pY == end_y){
        return true
    }
    return false
}

function showStartingWalls(){
    let pX = gameState.player.pos_x
    let pY = gameState.player.pos_y

    let map = gameState.currentLayout

    if (map[pY-1][pX] == 0){
        gameState.borders['t'].show()
    } else {
        gameState.borders['t'].squishHeight()
        gameState.borders['t'].hide('t')
    }

    if (map[pY+1][pX] == 0){
        gameState.borders['b'].show()
    } else {
        gameState.borders['b'].squishHeight()
        gameState.borders['b'].hide('b')
    }

    if (map[pY][pX-1] == 0){
        gameState.borders['l'].show()
    } else {
        gameState.borders['l'].squishWidth()
        gameState.borders['l'].hide('l')
    }

    if (map[pY][pX+1] == 0){
        gameState.borders['r'].show()
    } else {
        gameState.borders['r'].squishWidth()
        gameState.borders['r'].hide('r')
    }
}

function updateBorderMotion(dir, hide, movement_dir){
    gameState.borders[dir].isHidden = hide
    gameState.borders[dir].isMoving = true

    if (gameState.borders[dir].isHidden ){
        gameState.borders[dir].movementFunc = gameState.borders[dir].movementCombinations.hidden[movement_dir]
    } else {
        gameState.borders[dir].movementFunc = gameState.borders[dir].movementCombinations.showing[movement_dir]
    }
     
}

function shouldAnimateWalls(movement_dir){
    let pX = gameState.player.pos_x
    let pY = gameState.player.pos_y

    let map = gameState.currentLayout

    let dir = 't'
    if (map[pY-1][pX] == 0 && gameState.borders[dir].isHidden){
        updateBorderMotion(dir, false, movement_dir)
    } else if ( !gameState.borders[dir].isHidden && map[pY-1][pX] == 1) {
        updateBorderMotion(dir, true, movement_dir)
    }

    dir = 'b'
    if (map[pY+1][pX] == 0 && gameState.borders[dir].isHidden){
        updateBorderMotion(dir, false, movement_dir)
    } else if (!gameState.borders[dir].isHidden && map[pY+1][pX] == 1) {
        updateBorderMotion(dir, true, movement_dir)
    }

    dir = 'l'
    if (map[pY][pX-1] == 0 && gameState.borders[dir].isHidden){
        updateBorderMotion(dir, false, movement_dir)
    } else if(map[pY][pX-1] == 1 && !gameState.borders[dir].isHidden) {
        updateBorderMotion(dir, true, movement_dir)
    }

    dir = 'r'
    if (map[pY][pX+1] == 0 && gameState.borders[dir].isHidden){
        updateBorderMotion(dir, false, movement_dir)
    } else if(map[pY][pX+1] == 1 && !gameState.borders[dir].isHidden) {
        updateBorderMotion(dir, true, movement_dir)
    }
}

function getBorders(){
    let pX = gameState.player.pos_x
    let pY = gameState.player.pos_y

    let map = gameState.currentLayout
    return {
        't':map[pY-1][pX],
        'b':map[pY+1][pX],
        'l':map[pY][pX-1],
        'r':map[pY][pX+1],
    }
}

function getCurrentBackground(){
    let pos_x = gameState.player.pos_x
    let pos_y = gameState.player.pos_y
    let currentBackground = gameState.backgroundGradientLayout[pos_y][pos_x]
    return currentBackground
}

function initialize(){
    gameState.theCanvas = document.getElementById('the_canvas')
    gameState.cnvCtx = gameState.theCanvas.getContext('2d')

    gameState.center.x = gameState.theCanvas.width/2
    gameState.center.y = gameState.theCanvas.height/2

    gameState.player = new Player(gameState.center.x, gameState.center.y, gameState.player.size)
    gameState.companion = new Companion(gameState.center.x, gameState.center.y, gameState.player.size)

    //Create Bottom Border
    gameState.borders['b'] = new Border(0, gameState.theCanvas.height-20, gameState.theCanvas.width, 20)

    //Create Top Border
    gameState.borders['t'] = new Border(0, 0, gameState.theCanvas.width, 20)

    //Create Left Border
    gameState.borders['l'] = new Border(0, 21, 20, gameState.theCanvas.height-42)

    //Create Right Border
    gameState.borders['r'] = new Border(gameState.theCanvas.width-20, 21, 20, gameState.theCanvas.height-42)

    setUpMovementCombinations()

    changeLevel()
    gameState.player.show()
    gameState.animationFrameId = requestAnimationFrame(draw)
}

function unpause(){
    gameState.isPlaying = true;
    requestAnimationFrame(draw)
}

function pause(){
    cancelAnimationFrame(gameState.animationFrameId)
    gameState.isPlaying = false;
}

function draw(){
    paintBackground(null, null, null, null)

    if (gameState.player.isMoving){
        gameState.player.moveFunctions[gameState.player.direction]()
    }

    DIR_KEYS.forEach((key)=>{
        if (gameState.borders[key].movementFunc){
            gameState.borders[key].move()
        }
        gameState.borders[key].draw()
    })


    gameState.player.show()
    gameState.animationFrameId = requestAnimationFrame(draw)
    
}

function drawEnd(){
    if (gameState.player.isMoving){
        gameState.player.moveFunctions[gameState.player.direction]()
    } else {
        gameState.drawingEnd = true
    }

    if (gameState.drawingEnd){
        //Player needs to move left
        gameState.player.moveToEnd()

        //Companion needs to fade in from right
        gameState.companion.update()

    }

    gameState.player.show()
    gameState.companion.show()
    if(gameState.companion.movementOngoing || !gameState.player.atEnd){
        gameState.animationFrameId = requestAnimationFrame(drawEnd)
    } else {
        cancelAnimationFrame(gameState.animationFrameId)
    }
        
}
gameState = {
    theCanvas:null,
    cnvCtx:null,
    isPlaying:true,
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
    currentLevel:0,
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

maps = [
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
            exit_spots:[{x:5,y:3},{x:1, y:5},{x:6, y:2}]
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
            exit_spots:[{x:1, y:3}, {x:6, y:4}, {x:1,y:1}]
        }
    ],
    [
        {
            layout:[
                [0,0,0,0,0,0,0,0,0,0,0],
                [0,1,0,0,1,1,1,0,1,1,0],
                [0,1,1,1,1,0,1,0,1,0,0],
                [0,0,1,0,0,0,1,1,1,0,0],
                [0,0,1,0,1,1,1,0,1,1,0],
                [0,1,1,1,0,0,0,1,0,0,0],
                [0,1,0,0,1,1,1,1,1,0,0],
                [0,1,1,1,1,0,1,0,1,1,0],
                [0,0,0,0,0,0,0,0,0,0,0]
            ],
            start_spots:[{x:1,y:1},{x:9,y:1},{x:9,y:7},{x:3,y:5}],
            exit_spots:[{x:4,y:9},{x:7,y:5},{x:5, y:4},{x:9,y:4}]
        }
    ]
]

function changeLevel(level){
    
    //Check to see if we are the end of the game
    if (level >= maps.length){
        paintEnd()
        gameState.isPlaying = false
        return false
    }

    gameState.currentLevel = level
    //Pick information
    let available_maps = maps[gameState.currentLevel]
    let mapPickIndex = Math.floor(Math.random()*available_maps.length)
    gameState.currentLayout = available_maps[mapPickIndex].layout
    let positionsIndex = Math.floor(Math.random()*available_maps[mapPickIndex].start_spots.length)
    gameState.player.setPosX(available_maps[mapPickIndex].start_spots[positionsIndex].x)
    gameState.player.setPosY(available_maps[mapPickIndex].start_spots[positionsIndex].y)
    gameState.endLocation.pos_x = available_maps[mapPickIndex].exit_spots[positionsIndex].x
    gameState.endLocation.pos_y = available_maps[mapPickIndex].exit_spots[positionsIndex].y
}

function evaluateLevelEnd(){
    let pX = gameState.player.pos_x
    let pY = gameState.player.pos_y
    
    let end_x = gameState.endLocation.pos_x
    let end_y = gameState.endLocation.pos_y

    if (pX == end_x && pY == end_y){
        changeLevel(gameState.currentLevel+1)
    }
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

function initialize(){
    gameState.theCanvas = document.getElementById('the_canvas')
    gameState.cnvCtx = gameState.theCanvas.getContext('2d')

    gameState.center.x = gameState.theCanvas.width/2
    gameState.center.y = gameState.theCanvas.height/2

    gameState.player = new Player(gameState.center.x, gameState.center.y, gameState.player.size)

    //Create Bottom Border
    gameState.borders['b'] = new Border(0, gameState.theCanvas.height-20, gameState.theCanvas.width, 20)

    //Create Top Border
    gameState.borders['t'] = new Border(0, 0, gameState.theCanvas.width, 20)

    //Create Left Border
    gameState.borders['l'] = new Border(0, 21, 20, gameState.theCanvas.height-42)

    //Create Right Border
    gameState.borders['r'] = new Border(gameState.theCanvas.width-20, 21, 20, gameState.theCanvas.height-42)

    setUpMovementCombinations()

    changeLevel(0)
    showStartingWalls()
    gameState.player.show()
    requestAnimationFrame(draw)
}

function draw(){
    if (gameState.player.isMoving){
        gameState.player.moveFunctions[gameState.player.direction]()
    }

    DIR_KEYS.forEach((key)=>{
        gameState.borders[key].move()
        gameState.borders[key].draw()
    })


    gameState.player.show()
    requestAnimationFrame(draw)
}
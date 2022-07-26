gameState = {
    theCanvas:null,
    cnvCtx:null,
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
            start_spots:[{x:3, y:3}, {x:2, y:2}, {x:6, y:5}],
            exit_spots:[{x:1, y:3}, {x:6, y:5}, {x:1,y:1}]
        }
    ]
]

function changeLevel(level){
    gameState.currentLevel = level
    //Pick information
    let available_maps = maps[gameState.currentLevel]
    let mapPickIndex = Math.floor(Math.random()*available_maps.length)
    gameState.currentLayout = available_maps[mapPickIndex].layout
    let positionsIndex = Math.floor(Math.random()*available_maps[mapPickIndex].start_spots.length)
    gameState.player.pos_x = available_maps[mapPickIndex].start_spots[positionsIndex].x
    gameState.player.pos_y = available_maps[mapPickIndex].start_spots[positionsIndex].y
    gameState.endLocation.pos_x = available_maps[mapPickIndex].exit_spots[positionsIndex].x
    gameState.endLocation.pos_y = available_maps[mapPickIndex].exit_spots[positionsIndex].y
}

function showStartingWalls(){
    let pX = gameState.player.pos_x
    let pY = gameState.player.pos_y

    let map = gameState.currentLayout

    if (map[pY-1][pX] == 0){
        gameState.borders['t'].show()
    } else {
        gameState.borders['t'].hide()
    }
    if (map[pY+1][pX] == 0){
        gameState.borders['b'].show()
    } else {
        gameState.borders['b'].hide()
    }
    if (map[pY][pX-1] == 0){
        gameState.borders['l'].show()
    } else {
        gameState.borders['l'].hide()
    }
    if (map[pY][pX+1] == 0){
        gameState.borders['r'].show()
    } else {
        gameState.borders['r'].hide()
    }
}

function initialize(){
    gameState.theCanvas = document.getElementById('the_canvas')
    gameState.cnvCtx = gameState.theCanvas.getContext('2d')

    gameState.center.x = gameState.theCanvas.width/2
    gameState.center.y = gameState.theCanvas.height/2


    //Create Bottom Border
    gameState.borders['b'] = new Border(0, gameState.theCanvas.height-20, gameState.theCanvas.width, 20)

    //Create Top Border
    gameState.borders['t'] = new Border(0, 0, gameState.theCanvas.width, 20)

    //Create Left Border
    gameState.borders['l'] = new Border(0, 21, 20, gameState.theCanvas.height-42)

    //Create Right Border
    gameState.borders['r'] = new Border(gameState.theCanvas.width-20, 21, 20, gameState.theCanvas.height-42)

    changeLevel(0)
    paintPlayer()
    showStartingWalls()
}
gameState = {
    theCanvas:null,
    cnvCtx:null,
    player:{
        pos_x:null,
        pos_y:null
    },
    endLocation:{
        pos_x:null,
        pos_y:null
    },
    currentLayout:null,
    currentLevel:0
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
    gamestate.currentLevel = level
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


function initialize(){
    gameState.theCanvas = document.getElementById('the_canvas')
    gameState.cnvCtx = gameState.theCanvas.getContext('2d')

    changeLevel(0)
}
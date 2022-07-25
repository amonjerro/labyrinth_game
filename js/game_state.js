gameState = {
    theCanvas:null,
    cnvCtx:null,
    player:{
        pos_x:null,
        pos_y:null
    },
    current_level:0
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


function initialize(){
    gameState.theCanvas = document.getElementById('the_canvas')
    gameState.cnvCtx = gameState.theCanvas.getContext('2d')
}
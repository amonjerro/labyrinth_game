const HEX_VALUES = ['f','e','d','c','b','a',9,8,7,6,5,4]

function Border(x, y, width, height){

    this.x = x;
    this.y = y;

    this.starting_x = this.x;
    this.starting_y = this.y;
    
    this.maxHeight = height;
    this.maxWidth = width;

    this.apparentWidth = this.maxWidth
    this.apparentHeight = this.maxHeight
    this.isMoving = false
    this.isHidden = false
    this.movementFunc = null

    this.currentFrame = 0
    this.maxFrames = 59

    this.show = () =>{
        this.isHidden = false
        this.apparentHeight = this.maxHeight
        this.apparentWidth = this.maxWidth
        this.draw()
    }

    this.draw = () => {
        this.clear()
        gameState.cnvCtx.beginPath()
        gameState.cnvCtx.fillStyle = '#000'
        gameState.cnvCtx.rect(this.x, this.y, this.apparentWidth, this.apparentHeight)
        gameState.cnvCtx.fill()
        gameState.cnvCtx.closePath()

    }

    this.clear = () => {
        paintBackground(this.starting_x-1, this.starting_y-1, this.maxWidth+1, this.maxHeight+1)
    }

    this.squishHeight = () => {
        this.apparentHeight = 0
    }
    this.squishWidth = () => {
        this.apparentWidth = 0
    }

    this.hide = () => {
        this.isHidden = true
        this.draw()
    }

    this.evaluateAnimationEnd = () => {
        if(this.currentFrame == this.maxFrames){
            this.isMoving = false
            this.currentFrame = 0
            this.movementFunc = null

            this.x = this.starting_x
            this.y = this.starting_y
        }
    }

    this.left = (factor) => {
        this.apparentHeight = this.maxHeight
        this.apparentWidth = clampTo(this.maxWidth * factor, 0, this.maxWidth)
        
        if(this.currentFrame == this.maxFrames){
            if (this.isHidden){
                this.apparentWidth = 0
            } else {
                this.apparentWidth = this.maxWidth
                this.apparentHeight = this.maxHeight
            }
        }
    }

    this.up = (factor) => {
        this.apparentWidth = this.maxWidth

        this.apparentHeight = clampTo(this.maxHeight * factor, 0, this.maxHeight)
        this.y = clampTo(this.starting_y+(this.maxHeight-this.apparentHeight), 0, null) 

        if(this.currentFrame == this.maxFrames){
            if (this.isHidden){
                this.apparentHeight = 0
            } else {
                this.apparentHeight = this.maxHeight
            }
        }
    }

    this.down = (factor) => {
        this.apparentWidth = this.maxWidth

        this.apparentHeight = clampTo(this.maxHeight * factor, 0, this.maxHeight)
        if(this.currentFrame == this.maxFrames){
            if (this.isHidden){
                this.apparentHeight = 0
            } else {
                this.apparentHeight = this.maxHeight
            }
        }
    }
    
    this.right = (factor) => {
        this.apparentHeight = this.maxHeight

        this.apparentWidth = clampTo(this.maxWidth * factor, 0, this.maxWidth)
        this.x = clampTo(this.starting_x+(this.maxWidth-this.apparentWidth), 0, null)
        if(this.currentFrame == this.maxFrames){
            if (this.isHidden){
                this.apparentWidth = 0
            } else {
                this.apparentWidth = this.maxWidth
            }
        }
    }

    this.movementCombinations = {
        'hidden':{
            'l':null,
            'r':null,
            'b':null,
            't':null    
        },
        'showing':{
            'l':null,
            'r':null,
            'b':null,
            't':null
        }
    }

    this.move = () => {
        if (!this.isMoving){
            return null
        }
        
        this.currentFrame += 1
        let movementFactor = sigmoid(this.currentFrame / this.maxFrames)
        if (this.isHidden){
            movementFactor = 1-movementFactor
        }
        this.movementFunc(movementFactor)

        this.evaluateAnimationEnd()
    }
}

function Player(x, y, size){
    this.x = x
    this.y = y

    this.midX = this.x
    this.midY = this.y

    this.size = size
    this.pos_x = null
    this.pos_y = null
    this.atEnd = false

    this.isMoving = false
    this.direction = ''
    this.currentFrame = 0
    this.maxFrames = 59

    this.endLeft = this.midX - this.size
    this.endRight = this.midX + this.size
    this.endUp = this.midY - this.size
    this.endDown = this.midY + this.size

    this.show = () => {
        let canvasW = gameState.theCanvas.width
        let canvasH = gameState.theCanvas.height

        paintBackground(21,21, canvasW-42, canvasH-42)
        gameState.cnvCtx.beginPath()
        gameState.cnvCtx.fillStyle = '#000'
        gameState.cnvCtx.arc(this.x, this.y, this.size, 0, 2*Math.PI)
        gameState.cnvCtx.fill()
        gameState.cnvCtx.closePath()
    }

    this.setPosX = (x) => {
        this.pos_x = x
    }

    this.setPosY = (y) => {
        this.pos_y = y
    }

    this.moveLeft = () =>{

        let frameCountPerLeg = 30
        this.currentFrame += 1
        let inputX = this.currentFrame % frameCountPerLeg
        let movementFactor = sigmoid(inputX/frameCountPerLeg)

        if(this.currentFrame > frameCountPerLeg){
            movementFactor = 1 - movementFactor
        }

        if (inputX > 0){
            this.x = this.midX-(this.size*movementFactor)
        }

        if (this.currentFrame == this.maxFrames){
            this.isMoving = false
            this.currentFrame = 0
            this.x = this.midX
        }
        
    }

    this.moveUp = () =>{
        let frameCountPerLeg = 30
        this.currentFrame += 1
        let inputX = this.currentFrame % frameCountPerLeg
        let movementFactor = sigmoid(inputX/frameCountPerLeg)

        if(this.currentFrame > frameCountPerLeg){
            movementFactor = 1 - movementFactor
        }

        if (inputX > 0){
            this.y = this.midY-(this.size*movementFactor)
        }

        if (this.currentFrame == this.maxFrames){
            this.isMoving = false
            this.currentFrame = 0
            this.y = this.midY
        }
    }

    this.moveDown = () => {
        let frameCountPerLeg = 30
        this.currentFrame += 1
        let inputX = this.currentFrame % frameCountPerLeg
        let movementFactor = sigmoid(inputX/frameCountPerLeg)

        if(this.currentFrame > frameCountPerLeg){
            movementFactor = 1 - movementFactor
        }

        if (inputX > 0){
            this.y = this.midY+(this.size*movementFactor)
        }

        if (this.currentFrame == this.maxFrames){
            this.isMoving = false
            this.currentFrame = 0
            this.y = this.midY
        }
    }

    this.moveRight = () => {
        let frameCountPerLeg = 30
        this.currentFrame += 1
        let inputX = this.currentFrame % frameCountPerLeg
        let movementFactor = sigmoid(inputX/frameCountPerLeg)

        if(this.currentFrame > frameCountPerLeg){
            movementFactor = 1 - movementFactor
        }

        if (inputX > 0){
            this.x = this.midX+(this.size*movementFactor)
        }

        if (this.currentFrame == this.maxFrames){
            this.isMoving = false
            this.currentFrame = 0
            this.x = this.midX
        }
    }

    this.moveToEnd = () => {
        this.currentFrame += 1
        let inputX = this.currentFrame%this.maxFrames
        let movementFactor = sigmoid(inputX/this.maxFrames)

        if (inputX > 0 && !this.atEnd){
            this.x = this.midX + (2*this.size * movementFactor)
        }

        if (this.currentFrame == this.maxFrames){
            this.atEnd = true
        }


    }

    this.moveFunctions = {
        'l':this.moveLeft,
        'r':this.moveRight,
        'b':this.moveDown,
        't':this.moveUp
    }
}

function Companion (x,y, size) {
    
    this.size = size
    this.maxFrames = 59
    this.x = x-this.size*3
    this.y = y
    this.origin_x = this.x
    this.currentFrame = 0
    this.alphaChannelValue = 0
    this.fillStyle = `rgba(0,0,0,0)`
    this.movementOngoing = true
    
    this.show = () => {
        gameState.cnvCtx.beginPath()
        gameState.cnvCtx.fillStyle = this.fillStyle
        gameState.cnvCtx.arc(this.x, this.y, this.size, 0, 2*Math.PI)
        gameState.cnvCtx.fill()
        gameState.cnvCtx.closePath()
    }


    this.update = () => {
        this.currentFrame += 1

        let inputX = this.currentFrame % this.maxFrames
        let movementFactor = sigmoid(inputX / this.maxFrames)

        if (inputX > 0 && this.movementOngoing){
            this.fillStyle = `rgba(0,0,0,${movementFactor})`
            this.x = this.origin_x + movementFactor*this.size
        }

        if (this.currentFrame == this.maxFrames){
            this.movementOngoing = false
        }

    }
}

function getBackgroundValue(bg){
    let norm = normalize(bg, 0, gameState.maxBackground)
    let denorm = Math.floor(denormalize(norm, 0, HEX_VALUES.length-1))
    return '#'+HEX_VALUES[denorm]+HEX_VALUES[denorm]+HEX_VALUES[denorm]
}

function paintBackground(x,y,w,h){

    let bgX = 0
    let bgY = 0
    let bgW = gameState.theCanvas.width
    let bgH = gameState.theCanvas.height
    if (x != null){
        bgX = x
    }
    if (y != null){
        bgY = y
    }

    if (w != null){
        bgW = w
    }
    if (h != null){
        bgH = h
    }

    let currentBackground = getCurrentBackground()
    let fillstring = getBackgroundValue(currentBackground)
    
    gameState.cnvCtx.clearRect(bgX, bgY, bgW, bgH)
    gameState.cnvCtx.beginPath()
    gameState.cnvCtx.fillStyle = fillstring
    gameState.cnvCtx.rect(bgX, bgY, bgW, bgH)
    gameState.cnvCtx.fill()
    gameState.cnvCtx.closePath()
}


function movePlayer(dir){
    if (gameState.player.isMoving){
        //Do Something Here?
    } else {
        gameState.player.isMoving = true
        gameState.player.direction = dir
    }
}
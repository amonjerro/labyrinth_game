function Border(x, y, width, height){

    this.x = x;
    this.y = y;

    this.starting_x = this.x;
    this.starting_y = this.y;
    
    this.maxHeight = height;
    this.maxWidth = width;

    this.apparentWidth = 0
    this.apparentHeight = 0
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
        gameState.cnvCtx.clearRect(this.starting_x, this.starting_y, this.maxWidth, this.maxHeight)
    }

    this.hide = () => {
        this.apparentHeight = 0
        this.apparentWidth = 0
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
        this.apparentWidth = this.maxWidth * factor
        
        if(this.currentFrame == this.maxFrames){
            if (this.isHidden){
                this.apparentWidth = 0
            } else {
                this.apparentWidth = this.maxWidth
            }
        }
    }

    this.up = (factor) => {
        this.apparentHeight = this.maxHeight * factor
        this.y = this.starting_y+(this.maxHeight-this.apparentHeight)


        if(this.currentFrame == this.maxFrames){
            if (this.isHidden){
                this.apparentHeight = 0
            } else {
                this.apparentHeight = this.maxHeight
            }
        }
    }

    this.down = (factor) => {
        this.apparentHeight = this.maxHeight * factor

        if(this.currentFrame == this.maxFrames){
            if (this.isHidden){
                this.apparentHeight = 0
            } else {
                this.apparentHeight = this.maxHeight
            }
        }
    }
    
    this.right = (factor) => {
        this.apparentWidth = this.maxWidth * factor

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

        gameState.cnvCtx.clearRect(21,21, canvasW-42, canvasH-42)
        gameState.cnvCtx.beginPath()
        gameState.fillStyle = '#000'
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
    this.moveFunctions = {
        'l':this.moveLeft,
        'r':this.moveRight,
        'b':this.moveDown,
        't':this.moveUp
    }
}

function paintEnd(){
    let centerX = gameState.center.x
    let centerY = gameState.center.y
    let canvasW = gameState.theCanvas.width
    let canvasH = gameState.theCanvas.height
    let pS = gameState.player.size

    gameState.cnvCtx.clearRect(21,21, canvasW-42, canvasH-42)

    gameState.cnvCtx.beginPath()
    gameState.fillStyle = '#000'
    gameState.cnvCtx.arc(centerX-pS-5, centerY, pS, 0, 2*Math.PI)
    gameState.cnvCtx.fill()
    gameState.cnvCtx.closePath()

    gameState.cnvCtx.beginPath()
    gameState.fillStyle = '#000'
    gameState.cnvCtx.arc(centerX+pS+5, centerY, pS, 0, 2*Math.PI)
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
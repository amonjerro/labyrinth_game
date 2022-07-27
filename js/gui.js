function Border(x, y, width, height){
    this.x = x;
    this.y = y;
    this.maxHeight = height;
    this.maxWidth = width;

    this.apparentWidth = 0
    this.apparentHeight = 0
    this.isMoving = false

    this.show = () =>{
        gameState.cnvCtx.beginPath()
        gameState.cnvCtx.fillStyle = '#000'
        gameState.cnvCtx.rect(this.x, this.y, this.maxWidth, this.maxHeight)
        gameState.cnvCtx.fill()
        gameState.cnvCtx.closePath()
    }

    this.hide = (i) => {
        gameState.cnvCtx.clearRect(this.x, this.y, this.maxWidth, this.maxHeight)
    }

    this.disappearLeft = () => {

    }
    this.appearLeft = () => {

    }
    

    this.disappearUp = () => {

    }
    this.appearUp = () => {

    }

    this.disappearDown = () => {

    }
    this.appearDown = () => {

    }
    

    this.disappearRight = () => {

    }
    this.appearRight = () => {

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
    this.maxFrames = 60

    this.endLeft = this.x - this.size
    this.endRight = this.x + this.size
    this.endUp = this.y - this.size
    this.endDown = this.y + this.size

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
        console.log('MOVING!')
        let frameCountPerLeg = 30
        this.currentFrame += 1
        let inputX = this.currentFrame % frameCountPerLeg
        let movementFactor = sigmoid(inputX/frameCountPerLeg)
        if (this.currentFrame >= frameCountPerLeg){
            movementFactor *= -1
        }
        this.x -= this.size*movementFactor

        if (this.currentFrame == this.maxFrames){
            this.isMoving = false
            this.currentFrame = 0
        }
        
    }

    this.moveUp = () =>{

    }

    this.moveDown = () => {

    }

    this.moveRight = () => {

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

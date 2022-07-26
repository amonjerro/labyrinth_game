function Border(x, y, width, height){
    this.x = x;
    this.y = y;
    this.maxHeight = height;
    this.maxWidth = width;

    this.apparentWidth = 0
    this.apparentHeight = 0

    this.show = () =>{
        gameState.cnvCtx.fillStyle = '#000'
        gameState.cnvCtx.rect(this.x, this.y, this.maxWidth, this.maxHeight)
        gameState.cnvCtx.fill()
    }

    this.hide = () => {
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

function paintPlayer(){
    let centerX = gameState.center.x
    let centerY = gameState.center.y
    gameState.cnvCtx.beginPath()
    gameState.fillStyle = '#000'
    gameState.cnvCtx.arc(centerX, centerY, gameState.player.size, 0, 2*Math.PI)
    gameState.cnvCtx.fill()
    gameState.cnvCtx.closePath()
}

function paintEnd(){
    let centerX = gameState.center.x
    let centerY = gameState.center.y
    let pS = gameState.player.size
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

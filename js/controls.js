function moveUp(){
    console.log('Move Up')
}
function moveDown(){
    console.log('Move Down')
}
function moveLeft(){
    console.log('Move Left')
}
function moveRight(){
    console.log('Move Right')
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
function sigmoid(x){
    let denom = 1+Math.exp(-8*x+4)
    return 1/denom
}
function sigmoid(x){
    let denom = 1+Math.exp(-8*x+4)
    return 1/denom
}

function clampTo(value, min, max){
    let returnable = value
    if (value < min){
        returnable = min
    }
    if (max && value > max){
        returnable = max
    }
    return returnable
}

function normalize(value, min, max){
    return (value-min) / (max-min)
}

function denormalize(value, min, max){
    return (max-min)*(value)+min
}
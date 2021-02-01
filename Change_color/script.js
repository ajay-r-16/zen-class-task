function changeColor(){
    console.log("clicked")
    var div = document.getElementById("color");
    console.log("#"+((Math.floor(Math.random())).toString(16)));
    document.body.style.backgroundColor = getRandom();
}

function getRandom(){
    let value = "0123456789ABCDEF";
    let color = "#";
    for(let i=0;i<6;i++){
        color+=value[Math.floor(Math.random()*16)];
    }
    return color;
}
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    renderer.setSize(canvas.width, canvas.height);
}

function changeRotation() {
    if (rotate){
        rotate = false;
        document.getElementById("rotation-button").value = "Start";
    } else {
        rotate = true;
        document.getElementById("rotation-button").value = "Stop";
    }
}

function moveRotation() {
    if (rotate){
        rotate = false;
        document.getElementById("rotation-button").value = "Start";
    }
    var val = document.getElementById("rotation-range").value;
    pivot.rotation.x = val*Math.PI/8-Math.PI/2;
    document.getElementById("rad").innerHTML = "\u03C0"+val+"/8";
    changeColorSun();
}

function changeScene() {
    option = document.getElementById("select-scenes").value;
    switch(option) {
        case "pyramid":
            displayBasicScene();
            break;
        case "kukulkan":
            displayPyramidScene();
            break;
        case "colosseum":
            displayColosseum();
            break;
        case "eiffel":
            displayEiffel();
            break;
        case "saintB":
            displaySaintBasil();
            break;
        case "statueOL":
            displayLiberty();
            break;
        case "japanTemp":
            displayJapaneseTemp();
            break;
        case "easterSta":
            displayEaster();
            break;
      }
}

function initEvent() {
    window.addEventListener('resize', resizeCanvas, false);
    document.getElementById("rotation-button").addEventListener("click", changeRotation);
    document.getElementById("select-scenes").addEventListener("change", changeScene);
    document.addEventListener("keydown", (event) => {if(event.key=="p"){changeRotation();}});
    document.getElementById("rotation-range").addEventListener("input", moveRotation, false);
 }

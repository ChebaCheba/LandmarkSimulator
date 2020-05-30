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
    var val = document.getElementById("rotation-range").value;
    pivot.rotation.x = val*Math.PI/8-Math.PI/2;
    document.getElementById("rad").innerHTML = "\u03C0"+val+"/8";
    changeColorSun();
}

function changeScene() {
    if (changed){
        displayBasicScene();
        changed = false;
    } else {
        displayPyramidScene();
        changed = true;
    }
}

function initEvent() {
    window.addEventListener('resize', resizeCanvas, false);
    document.getElementById("rotation-button").addEventListener("click", changeRotation);
    document.getElementById("change-scene").addEventListener("click", changeScene);
    document.addEventListener("keydown", (event) => {if(event.key=="p"){changeRotation();}});
    document.getElementById("rotation-range").addEventListener("input", moveRotation, false);
 }

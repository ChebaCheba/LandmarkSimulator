function resizeCanvas() {
    if(view!="mult"){
        setNormalRenderer();
    } else{
        displayMultipleViews(40., 5., 5.);
    }
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
        case "sphinx":
            displaySphinx();
            break;
        case "bigben":
            displayBigBen();
            break;
      }
}

function changeView(){
    option = document.getElementById("select-cams").value;
    switch(option) {
        case "pers":
            view = "pers";
            setNormalRenderer();
            changeScene();
            break;
        case "orth":
            view = "orth";
            setNormalRenderer();
            changeScene();
            break;
        case "mult":
            view = "mult";
            changeScene();
            break;
    }
}

function changeMode(){
    if(editM){
        editM = false;
        document.getElementById("edit-trans").value = "Go to EditMode";
        unloadEditTools();
    } else{
        document.getElementById("edit-trans").value = "Go to ViewMode";
        loadEditTools();
        editM = true;
    }
}

function putObj(){
    option = document.getElementById("select-obj").value;
    console.log(option);
    addObj(option);
}

function keyDownEvent(event){
    if(event.key=="p"){
        changeRotation();
    }
}

function onMouseClick(event){
    if (infoDisplayed){
        camera.remove(camera.children[0]);
        infoDisplayed = false;
        return;
    }
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    raycaster.setFromCamera( mouse, camera );

	// calculate objects intersecting the picking ray
	var intersects = raycaster.intersectObjects( scene.children );

    if (intersects.length > 0) {
        //document.getElementById("shape-name").innerHTML = intersects[0].object.name;
        console.log(intersects[0].object.name);
        if(intersects[0].object.name!="floor" && !(editM)){
            displayInfo();
            infoDisplayed = true;
        }
        //selectedObj = intersects[0].object;
        if(editM){
            selectedObj = intersects[0].object;
            document.getElementById("select-label").innerHTML = "Selected Object: "+intersects[0].object.name;  
        }
    
    }
}

function changeMaterial()
{
    value = document.getElementById("select-material").value;
    if (value == "wf"){
        matEdit = new THREE.MeshBasicMaterial({color: colorEdit, wireframe: true});
    } else if (value == "nm"){
        matEdit = new THREE.MeshNormalMaterial(); 
    } else if (value == "bs"){
        matEdit = new THREE.MeshBasicMaterial({color: colorEdit}); 
    } else if (value == "lb"){
        matEdit = new THREE.MeshLambertMaterial({color: colorEdit}); 
    } else if (value == "pg"){
        matEdit = new THREE.MeshPhongMaterial({color: colorEdit, shininess: 100}); 
    } else if (value == "im"){
        var texture = new THREE.TextureLoader().load( './textures/rocksurface.jpg' );
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set( 20, 20 );
        matEdit = new THREE.MeshPhongMaterial({map: texture, shininess: 100}); 
    }
    if(selectedObj){
        changeMat();
    }
}

function colorPaletteEvent() {
    colorEdit = document.getElementById("vertexColour").colorValue.value;
    changeMaterial();
  }

function initEvent() {
    window.addEventListener('resize', resizeCanvas, false);
    document.getElementById("rotation-button").addEventListener("click", changeRotation);
    document.getElementById("edit-trans").addEventListener("click", changeMode);
    document.getElementById("select-scenes").addEventListener("change", changeScene);
    document.getElementById("select-obj").addEventListener("change", putObj);
    document.getElementById("select-material").addEventListener("change", changeMaterial);
    document.getElementById("select-cams").addEventListener("change", changeView);
    document.addEventListener("keydown", (event) => {keyDownEvent(event)});
    document.getElementById("rotation-range").addEventListener("input", moveRotation, false);
    document.getElementById("canvas").addEventListener('click', onMouseClick, false);
    document.getElementById("trans-button").addEventListener('click', translateObj);
    document.getElementById("sca-button").addEventListener('click', scaleObj);
    document.getElementById("rot-button").addEventListener('click', rotateObj);
 }

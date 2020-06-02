"use strict"
var canvas, canvas2, canvas3, canvas4;
var renderer, renderer2, renderer3, renderer4;
var scene;
var camera, camera2, camera3, camera4;
var controls1, controls2, controls3, controls4;
var light, light2, directLight;
var sun, moon;
var pivot;
var rotate;
var changed;
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
var infoDisplayed;
var view;
var editM;
var colorEdit, matEdit;
var selectedObj;
var listener, sound, audioLoader, mute;
var infoObj;

function main()
{
    // INIT VAR
    rotate = true;
    changed = false;
    infoDisplayed = false;
    editM = false;
    mute = true;
    view = "pers";
    colorEdit = 0x6134eb;
    matEdit = new THREE.MeshBasicMaterial({color: colorEdit, wireframe: true});
    // CANVAS
    canvas = document.getElementById("canvas");
    canvas2 = document.getElementById("canvas2");
    canvas3 = document.getElementById("canvas3");
    canvas4 = document.getElementById("canvas4");

    //EDIT TOOLS
    document.getElementById("edit").style.visibility = "hidden";
    document.getElementById("transform-controls").style.visibility = "hidden";
    document.getElementById("select-label").style.visibility = "hidden";

    //loadEditTools();
    //RENDERER
    setNormalRenderer();

    //DISPLAY SCENE
    displayBasicScene();
    // ACTION
    requestAnimationFrame(renderLoop);              // RENDER LOOP

    //INIT EVENT HANDLERS
    initEvent()
}

function handledload(geometry, material)
{
    mesh = new THREE.Mesh(geometry, material);
            
     // SCENE GRAPH
    scene.add(light);
    scene.add(mesh);
}

function changeColorSun(){
    // colors: 0xfff7b3, 0xaaaaaa, ffc1b3, ffd6b3
    if (((pivot.rotation.x >= Math.PI/4) && (pivot.rotation.x <= 3*Math.PI/8)) || ((pivot.rotation.x <= 7*Math.PI/4) && (pivot.rotation.x >= 13*Math.PI/8))){
        light.color.setHex(0xfff7b3);
    } else if ((pivot.rotation.x < Math.PI/4) || (pivot.rotation.x > 7*Math.PI/4)) {
        light.color.setHex(0xaaaaaa);
    } else {
        light.color.setHex(0xff5f3b);
    }
}

function sunRotate(){
    if (pivot.rotation.x>2*Math.PI){
        pivot.rotation.x = 0.0;
    } 
    pivot.rotation.x += 0.01;
    changeColorSun();
}
       
function renderLoop() {
    renderer.autoClear = false;
    renderer.clear();
    if(view == "pers" || view == "orth"){
        renderer.render(scene, camera);
    } else {
        renderer.render(scene, camera);
        renderer2.render(scene, camera2);
        renderer3.render(scene, camera3);
        renderer4.render(scene, camera4);
    }
    if (rotate){
        sunRotate();
    }
    requestAnimationFrame(renderLoop);
}
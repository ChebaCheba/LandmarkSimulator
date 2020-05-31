"use strict"
var canvas;
var renderer;
var scene;
var camera;
var light, light2;
var sun, moon;
var pivot;
var rotate;
var changed;
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
var infoDisplayed;

function main()
{
    // INIT VAR
    rotate = true;
    changed = false;
    infoDisplayed = false;
    // RENDERER
    canvas = document.getElementById("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    renderer = new THREE.WebGLRenderer({canvas: canvas});
    renderer.setSize(canvas.width, canvas.height);
    renderer.setClearColor("black");             
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    
    //DISPLAY SCENE
    displayBasicScene();
    // ACTION
    requestAnimationFrame(renderLoop);              // RENDER LOOP

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
    renderer.render(scene, camera);
    if (rotate){
        sunRotate();
    }
    requestAnimationFrame(renderLoop);
}
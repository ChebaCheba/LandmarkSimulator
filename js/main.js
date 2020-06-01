"use strict"
var canvas;
var renderer, renderer2, renderer3, renderer4;
var scene;
var camera, camera2, camera3, camera4;
var controls1, controls2, controls3, controls4;
var light, light2;
var sun, moon;
var pivot;
var rotate;
var changed;
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
var infoDisplayed;
var renderers, cameras, controls;
var view;

function setNormalRenderer(){
    renderer = new THREE.WebGLRenderer({canvas: canvas});
    renderer.setSize(canvas.width, canvas.height);
    renderer.setClearColor("black");             
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
}

function displayMultipleViews(){
    renderer = new THREE.WebGLRenderer({canvas: canvas});
    renderer.setSize(canvas.width/2, canvas.height/2);
    renderer.setClearColor("black");             
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    camera = new THREE.OrthographicCamera(-10,10, 10, -10, -500, 10000);
    
}

function main()
{
    // INIT VAR
    rotate = true;
    changed = false;
    infoDisplayed = false;
    view = "pers";
    // RENDERER
    canvas = document.getElementById("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    setNormalRenderer();
    //displayMultipleViews();    
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
"use strict"
var canvas;
var renderer;
var scene;
var camera;
var light, light2;
var sun, moon;
var pivot;
var rotate;

function main()
{
    // INIT VAR
    rotate = true;
    // RENDERER
    canvas = document.getElementById("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    renderer = new THREE.WebGLRenderer({canvas: canvas});
    renderer.setSize(canvas.width, canvas.height);
    renderer.setClearColor("black");             
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;   
    
    pivot = new Group();
    pivot.position.set( 0.0, 0.0, 0 );
    // MODEL
    // GEOMETRY
    var geometry = new THREE.SphereGeometry(1., 100, 100);
    var geometry2 = new THREE.SphereGeometry(0.1, 100, 100);
    var floor = new THREE.PlaneGeometry(10, 10, 10, 10);
    // MATERIAL
    var material = new THREE.MeshBasicMaterial({color: 0xaaaaaa, map: new THREE.TextureLoader().load('./textures/sun-map.jpg')});
    var material2 = new THREE.MeshBasicMaterial({color: 0xaaaaaa, map: new THREE.TextureLoader().load('./textures/moon-map.jpg')});
    var floorTexture = new THREE.TextureLoader().load('./textures/stoneterrain.png');
    //var floorMaterial = new THREE.MeshPhongMaterial({map: loader.load('./textures/grass.jpg'), shininess: 100});   
    floorTexture.wrapS = THREE.RepeatWrapping;
    floorTexture.wrapT = THREE.RepeatWrapping;
    floorTexture.repeat.set( 4, 4 );
    var floorMaterial = new THREE.MeshPhongMaterial({map: floorTexture, shininess: 30});
    
    // MESH (GEOMETRY + MATERIAL)
    sun = new THREE.Mesh(geometry, material);
    sun.position.y = 50.;
    moon = new THREE.Mesh(geometry2, material2);
    moon.position.y = -10.;
    //mesh.position.x = 5.;      
    var floorMesh = new THREE.Mesh(floor,floorMaterial);
    floorMesh.material.side = THREE.DoubleSide;
    floorMesh.rotation.x = Math.PI/2;
    floorMesh.position.y = -1;
    floorMesh.receiveShadow = true;
    // LIGHTS
    //light = new THREE.AmbientLight(); 
    light = new THREE.PointLight(0xffc1b3, 5, 100);
    light.position.set(sun.position.x,sun.position.y,sun.position.z);
    light.castShadow = true;

    light2 = new THREE.PointLight(0xaaaaaa, 1, 100);
    light2.position.set(moon.position.x,moon.position.y,moon.position.z);
    light2.castShadow = true;
    // CAMERAS
    camera = new THREE.PerspectiveCamera(60., canvas.width / canvas.height, 0.01, 10000.);  // CAMERA
    camera.position.set(0., 5., 5.);      
    var controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.maxPolarAngle = Math.PI/2+0.01; 
    //var sky = new THREE.Mesh(new THREE.PlaneGeometry(10, 10, 0), new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load("./textures/sky.jpg"), depthTest: false}));      

    pivot.add(light);
    pivot.add(sun);
    pivot.add(moon);
    pivot.add(light2);
    console.log(pivot.rotation.x);
    var pyramid = new Pyramid();
    pyramid.setTextureMaterial();
    // SCENE
    scene = new THREE.Scene(); 
    scene.add(pivot);
    scene.add(pyramid);
    //scene.add(mesh);
    scene.add(floorMesh);                                
    scene.add(camera);
    //scene.add(light);

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
        console.log("amarillo");
    } else if ((pivot.rotation.x < Math.PI/4) || (pivot.rotation.x > 7*Math.PI/4)) {
        light.color.setHex(0xaaaaaa);
        console.log("blanco");
    } else {
        light.color.setHex(0xff5f3b);
        console.log("rojo");
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
    //mesh.rotation.x = mesh.rotation.x + 0.01;
    //mesh.rotation.y = mesh.rotation.y + 0.01;
    if (rotate){
        sunRotate();
    }
    requestAnimationFrame(renderLoop);
}
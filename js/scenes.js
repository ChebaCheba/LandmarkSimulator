"use strict"

function displayBasicScene(){
    // GEOMETRY
    var geometry = new THREE.SphereGeometry(1., 100, 100);
    var geometry2 = new THREE.SphereGeometry(0.1, 100, 100);
    var floor = new THREE.PlaneGeometry(10, 10, 10, 10);
    // CREATE PIVOT FOR S/M ROTATATION
    pivot = new Group();
    pivot.position.set( 0.0, 0.0, 0 );
    // MATERIAL
    var material = new THREE.MeshBasicMaterial({color: 0xaaaaaa, map: new THREE.TextureLoader().load('./textures/sun-map.jpg')});
    var material2 = new THREE.MeshBasicMaterial({color: 0xaaaaaa, map: new THREE.TextureLoader().load('./textures/moon-map.jpg')});
    var floorTexture = new THREE.TextureLoader().load('./textures/stoneterrain.png');  
    floorTexture.wrapS = THREE.RepeatWrapping;
    floorTexture.wrapT = THREE.RepeatWrapping;
    floorTexture.repeat.set( 4, 4 );
    var floorMaterial = new THREE.MeshPhongMaterial({map: floorTexture, shininess: 30});
    var floorMesh = new THREE.Mesh(floor,floorMaterial);
    floorMesh.material.side = THREE.DoubleSide;
    floorMesh.rotation.x = Math.PI/2;
    floorMesh.position.y = -1;
    floorMesh.receiveShadow = true;
    // MESH FOR SUN AND MOON
    sun = new THREE.Mesh(geometry, material);
    sun.position.y = 50.;
    moon = new THREE.Mesh(geometry2, material2);
    moon.position.y = -10.;  
    // CAMERAS
    camera = new THREE.PerspectiveCamera(60., canvas.width / canvas.height, 0.01, 10000.);  // CAMERA
    camera.position.set(0., 5., 5.);      
    var controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.maxPolarAngle = Math.PI/2+0.01; 
    var pyramid = new Pyramid();
    pyramid.setTextureMaterial();
    // LIGHTS 
    light = new THREE.PointLight(0xffc1b3, 5, 100);
    light.position.set(sun.position.x,sun.position.y,sun.position.z);
    light.castShadow = true;

    light2 = new THREE.PointLight(0xaaaaaa, 1, 100);
    light2.position.set(moon.position.x,moon.position.y,moon.position.z);
    light2.castShadow = true;      
    // ADD OBJECTS TO PIVOT
    pivot.add(light);
    pivot.add(sun);
    pivot.add(moon);
    pivot.add(light2);
    // SCENE
    scene = new THREE.Scene(); 
    scene.add(pivot);
    scene.add(pyramid);
    scene.add(floorMesh);                                
    scene.add(camera);
}
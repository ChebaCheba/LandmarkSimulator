"use strict"

function displaySunMoon(ySun, yMoon){
    // CREATE PIVOT FOR S/M ROTATATION
    pivot = new Group();
    pivot.position.set( 0.0, 0.0, 0 );
    // GEOMETRY
    var geometry = new THREE.SphereGeometry(1., 100, 100);
    var geometry2 = new THREE.SphereGeometry(0.1, 100, 100);
    var material = new THREE.MeshBasicMaterial({color: 0xaaaaaa, map: new THREE.TextureLoader().load('./textures/sun-map.jpg')});
    var material2 = new THREE.MeshBasicMaterial({color: 0xaaaaaa, map: new THREE.TextureLoader().load('./textures/moon-map.jpg')});
    // MESH FOR SUN AND MOON
    sun = new THREE.Mesh(geometry, material);
    sun.position.y = ySun;
    moon = new THREE.Mesh(geometry2, material2);
    moon.position.y = yMoon; 
    
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
    scene.add(pivot);
}

function displayBasicScene(){
    // GEOMETRY
    var floor = new THREE.PlaneGeometry(10, 10, 10, 10);

    // MATERIAL
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
     
    // CAMERAS
    camera = new THREE.PerspectiveCamera(60., canvas.width / canvas.height, 0.01, 10000.);  // CAMERA
    camera.position.set(0., 5., 5.);      
    var controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.maxPolarAngle = Math.PI/2+0.01;

    //PYRAMID 
    var pyramid = new Pyramid();
    pyramid.setTextureMaterial();

    // SCENE
    scene = new THREE.Scene(); 
    
    scene.add(pyramid);
    scene.add(floorMesh); 
    
    displaySunMoon(50,-10);
    //scene.add(camera);
}

function displayPyramidScene(){
    // GEOMETRY
    var floor = new THREE.PlaneGeometry(100, 100, 100, 100);

    // MATERIAL
    var floorTexture = new THREE.TextureLoader().load('./textures/stoneterrain.png');  
    floorTexture.wrapS = THREE.RepeatWrapping;
    floorTexture.wrapT = THREE.RepeatWrapping;
    floorTexture.repeat.set( 6, 6 );
    var floorMaterial = new THREE.MeshPhongMaterial({map: floorTexture, shininess: 30});
    var floorMesh = new THREE.Mesh(floor,floorMaterial);
    floorMesh.material.side = THREE.DoubleSide;
    floorMesh.rotation.x = Math.PI/2;
    //floorMesh.position.y = -1;
    floorMesh.receiveShadow = true;
    // CAMERAS
    camera = new THREE.PerspectiveCamera(60., canvas.width / canvas.height, 0.01, 10000.);  // CAMERA
    camera.position.set(25., 5., 5.);      
    var controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.maxPolarAngle = Math.PI/2-0.01; 
    //OBJLOADER
    var meshPy = null;

    var objLoader = new THREE.OBJLoader();
    //objLoader.setMaterials( materials );
    objLoader.load( './models/Mayan_Pyramide.obj', function ( object ) {
    //object.children[0].material.wireframe = true;
    object.traverse( function ( child ) {
        //var texture = new THREE.Texture();
        var texture = new THREE.TextureLoader().load( './textures/rocksurface.jpg' );
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;

        if ( child instanceof THREE.Mesh ) {
            var mat = new THREE.MeshPhongMaterial( {
                shininess: 20,
                map: texture
            } );

            child.material = mat;
            child.castShadow = true;

       }
    });
    meshPy = object;
    scene.add( meshPy );

    } );

    //SCENE
    scene = new THREE.Scene();
    light = new THREE.AmbientLight();
    scene.add(light); 
    scene.add(floorMesh); 
    displaySunMoon(100,-20);
}
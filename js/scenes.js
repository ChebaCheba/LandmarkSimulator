"use strict"

function displaySunMoon(ySun, yMoon, sunInts, moonInts, sunD, moonD){
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
    light = new THREE.PointLight(0xffc1b3, sunInts, sunD);
    light.position.set(sun.position.x,sun.position.y,sun.position.z);
    light.castShadow = true;

    light2 = new THREE.PointLight(0xaaaaaa, moonInts, moonD);
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
    var floor = new THREE.PlaneGeometry(50, 50, 50, 50);

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
    camera.position.set(20., 5., 5.);      
    var controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.maxPolarAngle = Math.PI/2+0.01;

    //PYRAMID 
    var pyramid = new Pyramid();
    pyramid.setTextureMaterial();
    pyramid.scale.set(5,5,5);
    pyramid.position.y = 4;
    // SCENE
    scene = new THREE.Scene(); 
    
    scene.add(pyramid);
    scene.add(floorMesh); 
    
    displaySunMoon(50,-10,5,1,100,100);
    //scene.add(camera);
}

function displayFloor(floorY){
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
    floorMesh.position.y = floorY;
    floorMesh.receiveShadow = true;
    scene.add(floorMesh); 
}

function displayPyramidScene(){
    
    // CAMERAS
    camera = new THREE.PerspectiveCamera(60., canvas.width / canvas.height, 0.01, 10000.);  // CAMERA
    camera.position.set(40., 5., 5.);      
    var controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.maxPolarAngle = Math.PI/2-0.01; 
    //OBJLOADER
    var meshPy = null;

    var objLoader = new THREE.OBJLoader();
    objLoader.load( './models/altar_pyramid.obj', function ( object ) {
    object.traverse( function ( child ) {
        //var texture = new THREE.Texture();
        var texture = new THREE.TextureLoader().load( './textures/rocksurface.jpg' );
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set( 20, 20 );
        if ( child instanceof THREE.Mesh ) {
            var mat = new THREE.MeshPhongMaterial( {
                shininess: 30,
                map: texture
            } );

            child.material = mat;
            child.castShadow = true;

       }
    });
    meshPy = object;
    meshPy.rotation.x = -Math.PI/2;
    meshPy.scale.set(0.01,0.01,0.01);
    scene.add( meshPy );

    } );

    //SCENE
    scene = new THREE.Scene();
    displayFloor(0);
    displaySunMoon(250,-50, 4, 1, 750, 750);
}


function displayEiffel(){
    // CAMERAS
    camera = new THREE.PerspectiveCamera(60., canvas.width / canvas.height, 0.01, 10000.);  // CAMERA
    camera.position.set(130., 20., 5.);      
    var controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.maxPolarAngle = Math.PI/2-0.01; 
    //OBJLOADER
    var meshPy = null;
    var objLoader = new THREE.OBJLoader();
    objLoader.load( './models/10067_Eiffel_Tower_v1_max2010_it1.obj', function ( object ) {
        var texture = new THREE.TextureLoader().load( './textures/rocksurface.jpg' );
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set( 20, 20 );
    object.traverse( function ( child ) {
        if ( child instanceof THREE.Mesh ) {
            var mat = new THREE.MeshPhongMaterial( {
                shininess: 30,
                map: texture
            } );
            child.material = mat;
            child.castShadow = true;


       }
    meshPy = object;
    meshPy.rotation.x = -Math.PI/2;
    meshPy.scale.set(0.002,0.002,0.002);
    scene.add( meshPy );

    } );});//});
    //SCENE
    scene = new THREE.Scene();
    displayFloor(0); 
    displaySunMoon(250,-50, 4, 1, 750, 750);
}

function displayColosseum(){
     // CAMERAS
     camera = new THREE.PerspectiveCamera(60., canvas.width / canvas.height, 0.01, 10000.);  // CAMERA
     camera.position.set(70., 5., 5.);      
     var controls = new THREE.OrbitControls(camera, renderer.domElement);
     controls.maxPolarAngle = Math.PI/2-0.01; 
     //OBJLOADER
     var meshPy = null;
 
     var objLoader = new THREE.OBJLoader();
     objLoader.load( './models/colosseum.obj', function ( object ) {
     object.traverse( function ( child ) {
         //var texture = new THREE.Texture();
         var texture = new THREE.TextureLoader().load( './textures/rocksurface.jpg' );
         texture.wrapS = THREE.RepeatWrapping;
         texture.wrapT = THREE.RepeatWrapping;
         texture.repeat.set( 20, 20 );
         if ( child instanceof THREE.Mesh ) {
             var mat = new THREE.MeshPhongMaterial( {
                 shininess: 30,
                 map: texture
             } );
 
             child.material = mat;
             child.castShadow = true;
 
        }
     });
     meshPy = object;
     //meshPy.rotation.x = -Math.PI/2;
     meshPy.scale.set(5,5,5);
     meshPy.position.y = -5.5;
     meshPy.position.x = -5.5;
     scene.add( meshPy );
 
     } );
 
     //SCENE
     scene = new THREE.Scene();
     displayFloor(0);
     displaySunMoon(250,-50, 4, 1, 750, 750);
}

function displaySaintBasil(){
    // CAMERAS
    camera = new THREE.PerspectiveCamera(60., canvas.width / canvas.height, 0.01, 10000.);  // CAMERA
    camera.position.set(130., 30., 5.);      
    var controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.maxPolarAngle = Math.PI/2-0.01; 
    //OBJLOADER
    var meshPy = null;

    var objLoader = new THREE.OBJLoader();
    objLoader.load( './models/10086_saint_basil_cathedral_v1_L3.obj', function ( object ) {
    object.traverse( function ( child ) {
        //var texture = new THREE.Texture();
        var texture = new THREE.TextureLoader().load( './textures/rocksurface.jpg' );
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set( 20, 20 );
        if ( child instanceof THREE.Mesh ) {
            var mat = new THREE.MeshPhongMaterial( {
                shininess: 30,
                map: texture
            } );

            child.material = mat;
            child.castShadow = true;

       }
    });
    meshPy = object;
    meshPy.rotation.x = -Math.PI/2;
    meshPy.scale.set(0.001,0.001,0.001);
    //meshPy.position.y = -5.5;
    //meshPy.position.x = -5.5;
    scene.add( meshPy );

    } );

    //SCENE
    scene = new THREE.Scene();
    displayFloor(0);
    displaySunMoon(250,-50, 4, 1, 750, 750);
}

function displayLiberty(){
    // CAMERAS
    camera = new THREE.PerspectiveCamera(60., canvas.width / canvas.height, 0.01, 10000.);  // CAMERA
    camera.position.set(50., 50., 5.);      
    var controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.maxPolarAngle = Math.PI/2-0.01; 
    //OBJLOADER
    var meshPy = null;

    var objLoader = new THREE.OBJLoader();
    objLoader.load( './models/LibertStatue.obj', function ( object ) {
    object.traverse( function ( child ) {
        //var texture = new THREE.Texture();
        var texture = new THREE.TextureLoader().load( './textures/rocksurface.jpg' );
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set( 20, 20 );
        if ( child instanceof THREE.Mesh ) {
            var mat = new THREE.MeshPhongMaterial( {
                shininess: 30,
                map: texture
            } );

            child.material = mat;
            child.castShadow = true;

       }
    });
    meshPy = object;
    meshPy.rotation.y = Math.PI/2;
    meshPy.scale.set(20,20,20);
    //meshPy.position.y = -5.5;
    //meshPy.position.x = -5.5;
    scene.add( meshPy );

    } );

    //SCENE
    scene = new THREE.Scene();
    displayFloor(0);
    displaySunMoon(250,-50, 4, 1, 750, 750);
}

function displayJapaneseTemp(){
    // CAMERAS
    camera = new THREE.PerspectiveCamera(60., canvas.width / canvas.height, 0.01, 10000.);  // CAMERA
    camera.position.set(100., 30., 5.);      
    var controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.maxPolarAngle = Math.PI/2-0.01; 
    //OBJLOADER
    var meshPy = null;

    var objLoader = new THREE.OBJLoader();
    objLoader.load( './models/Japanese_Temple.obj', function ( object ) {
    object.traverse( function ( child ) {
        //var texture = new THREE.Texture();
        var texture = new THREE.TextureLoader().load( './textures/rocksurface.jpg' );
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set( 20, 20 );
        if ( child instanceof THREE.Mesh ) {
            var mat = new THREE.MeshPhongMaterial( {
                shininess: 30,
                map: texture
            } );

            child.material = mat;
            child.castShadow = true;

       }
    });
    meshPy = object;
    meshPy.rotation.y = Math.PI/2;
    //meshPy.scale.set(20,20,20);
    //meshPy.position.y = -5.5;
    //meshPy.position.x = -5.5;
    scene.add( meshPy );

    } );

    //SCENE
    scene = new THREE.Scene();
    displayFloor(0);
    displaySunMoon(250,-50, 4, 1, 750, 750);
}

function displayEaster(){
    // CAMERAS
    camera = new THREE.PerspectiveCamera(60., canvas.width / canvas.height, 0.01, 10000.);  // CAMERA
    camera.position.set(100., 30., 5.);      
    var controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.maxPolarAngle = Math.PI/2-0.01; 
    //OBJLOADER
    var meshPy = null;

    var objLoader = new THREE.OBJLoader();
    objLoader.load( './models/12329_Statue_v1_l3.obj', function ( object ) {
    object.traverse( function ( child ) {
        //var texture = new THREE.Texture();
        var texture = new THREE.TextureLoader().load( './textures/rocksurface.jpg' );
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set( 20, 20 );
        if ( child instanceof THREE.Mesh ) {
            var mat = new THREE.MeshPhongMaterial( {
                shininess: 30,
                map: texture
            } );

            child.material = mat;
            child.castShadow = true;

       }
    });
    meshPy = object;
    meshPy.rotation.x = -Math.PI/2;
    meshPy.scale.set(0.1,0.1,0.1);
    meshPy.position.y = -3.5;
    //meshPy.position.x = -5.5;
    scene.add( meshPy );

    } );

    //SCENE
    scene = new THREE.Scene();
    displayFloor(0);
    displaySunMoon(250,-50, 4, 1, 750, 750);
}
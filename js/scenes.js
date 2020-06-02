"use strict"

function displaySunMoon(ySun, yMoon, sunInts, moonInts, sunD, moonD){
    // CREATE PIVOT FOR S/M ROTATATION
    pivot = new Group();
    pivot.position.set( 0.0, 0.0, 0 );
    // GEOMETRY
    var geometry = new THREE.SphereGeometry(1., 100, 100);
    var geometry2 = new THREE.SphereGeometry(0.1, 100, 100);
    var material = new THREE.MeshBasicMaterial(/*{color: 0xaaaaaa, map: new THREE.TextureLoader().load('./textures/sun-map.jpg')}*/);
    var material2 = new THREE.MeshBasicMaterial(/*{color: 0xaaaaaa/*, map: new THREE.TextureLoader().load('./textures/moon-map.jpg')}*/);
    // MESH FOR SUN AND MOON
    sun = new THREE.Mesh(geometry, material);
    sun.position.y = ySun;
    sun.material.colorWrite = false;
    moon = new THREE.Mesh(geometry2, material2);
    moon.position.y = yMoon;
    moon.material.colorWrite = false; 
    
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
    floorMesh.name = "floor";
    scene.add(floorMesh); 
}

function displayBasicScene(){
     
    if(view == "pers"){
        displayPerspectiveCam(20.,5.,5.);
    } else if(view=="orth"){
        displayOrthogonalCam(30.,50.,30.);
    } else {
        displayMultipleViews(20.,5.,5.);
    }
    
    displayMusic('egypt_music.ogg');

    //PYRAMID 
    var pyramid = new Pyramid();
    pyramid.setTextureMaterial();
    pyramid.scale.set(5,5,5);
    pyramid.position.y = 4;
    // SCENE
    scene = new THREE.Scene(); 
    scene.add(pyramid);
    scene.add(camera);
    if(view=="mult"){
        scene.add(camera2);
        scene.add(camera3);
        scene.add(camera4);
    }
    displayFloor(-1.); 
    
    displaySunMoon(50,-10,5,1,100,100);
    //scene.add(camera);
}

function displayPyramidScene(){
    
    // CAMERAS
    if(view == "pers"){
        displayPerspectiveCam(40.,5.,5.);
    } else if(view=="orth"){
        displayOrthogonalCam(40.,5.,5.);
    } else {
        displayMultipleViews(40.,5.,5.);
    }
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
            child.rotation.x = -Math.PI/2;
            child.scale.set(0.01,0.01,0.01);
            child.name = "kukulkan";
            scene.add(child);
            
       }
    });
    meshPy = object;
    //meshPy.rotation.x = -Math.PI/2;
    //meshPy.scale.set(0.01,0.01,0.01);
    //meshPy.name = "landmark";
    //console.log(meshPy.name);
    //scene.add( meshPy );

    } );

    //SCENE
    scene = new THREE.Scene();
    scene.add(camera);
    if(view=="mult"){
        scene.add(camera2);
        scene.add(camera3);
        scene.add(camera4);
    }
    displayFloor(0);
    displaySunMoon(250,-50, 4, 1, 750, 750);
}

function displayEiffel(){
    // CAMERAS
    
    if(view == "pers"){
        displayPerspectiveCam(130.,20.,5.);
    } else if(view=="orth"){
        displayOrthogonalCam(40.,5.,5.);
    } else {
        displayMultipleViews(130.,20.,5.);
    }
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
            child.rotation.x = -Math.PI/2;
            child.scale.set(0.002,0.002,0.002);
            child.name = "eiffel";
            scene.add(child);
       }
    meshPy = object;
    //meshPy.rotation.x = -Math.PI/2;
    //meshPy.scale.set(0.002,0.002,0.002);
    //scene.add( meshPy );

    } );});//});
    //SCENE
    scene = new THREE.Scene();
    scene.add(camera);
    if(view=="mult"){
        scene.add(camera2);
        scene.add(camera3);
        scene.add(camera4);
    }
    displayFloor(0); 
    displaySunMoon(250,-50, 4, 1, 750, 750);
}

function displayColosseum(){
     // CAMERAS
     if(view == "pers"){
        displayPerspectiveCam(70.,7.,5.);
    } else if(view=="orth"){
        displayOrthogonalCam(40.,5.,5.);
    } else {
        displayMultipleViews(70.,7.,5.);
    }
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
            child.scale.set(5,5,5);
            child.name = "colosseum";
            child.position.y = -5.5;
            child.position.x = -5.5;
            scene.add(child);
 
        }
     });
     meshPy = object;
     //meshPy.rotation.x = -Math.PI/2;
     //meshPy.scale.set(5,5,5);
     //meshPy.position.y = -5.5;
     //meshPy.position.x = -5.5;
     //scene.add( meshPy );
 
     } );
 
     //SCENE
     scene = new THREE.Scene();
     scene.add(camera);
     if(view=="mult"){
        scene.add(camera2);
        scene.add(camera3);
        scene.add(camera4);
    }
     displayFloor(0);
     displaySunMoon(250,-50, 4, 1, 750, 750);
}

function displaySaintBasil(){
    // CAMERAS
    if(view == "pers"){
        displayPerspectiveCam(130.,30.,5.);
    } else if(view=="orth"){
        displayOrthogonalCam(40.,5.,5.);
    } else {
        displayMultipleViews(130.,30.,5.);
    }
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
            child.rotation.x = -Math.PI/2;
            child.scale.set(0.001,0.001,0.001);
            child.name = "saintbasil";
            scene.add(child);

       }
    });
    meshPy = object;
    //meshPy.rotation.x = -Math.PI/2;
    //meshPy.scale.set(0.001,0.001,0.001);
    //meshPy.position.y = -5.5;
    //meshPy.position.x = -5.5;
    //scene.add( meshPy );

    } );

    //SCENE
    scene = new THREE.Scene();
    scene.add(camera);
    if(view=="mult"){
        scene.add(camera2);
        scene.add(camera3);
        scene.add(camera4);
    }
    displayFloor(0);
    displaySunMoon(250,-50, 4, 1, 750, 750);
}

function displayLiberty(){
    // CAMERAS 
    if(view == "pers"){
        displayPerspectiveCam(50.,50.,5.);
    } else if(view=="orth"){
        displayOrthogonalCam(40.,5.,5.);
    } else {
        displayMultipleViews(50.,50.,5.);
    }
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
            child.scale.set(20,20,20);
            child.name = "statueofliberty";
            scene.add(child);


       }
    });
    meshPy = object;
    //meshPy.rotation.y = Math.PI/2;
    //meshPy.scale.set(20,20,20);
    //meshPy.position.y = -5.5;
    //meshPy.position.x = -5.5;
    //scene.add( meshPy );

    } );

    //SCENE
    scene = new THREE.Scene();
    scene.add(camera);
    if(view=="mult"){
        scene.add(camera2);
        scene.add(camera3);
        scene.add(camera4);
    }
    displayFloor(0);
    displaySunMoon(250,-50, 4, 1, 750, 750);
}

function displayJapaneseTemp(){
    // CAMERAS
    if(view == "pers"){
        displayPerspectiveCam(100.,30.,5.);
    } else if(view=="orth"){
        displayOrthogonalCam(40.,5.,5.);
    } else {
        displayMultipleViews(100.,30.,5.);
    }
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
            child.name = "tojitemp";
            scene.add(child);
       }
    });
    meshPy = object;
    //meshPy.rotation.y = Math.PI/2;
    //meshPy.scale.set(20,20,20);
    //meshPy.position.y = -5.5;
    //meshPy.position.x = -5.5;
    //scene.add( meshPy );

    } );

    //SCENE
    scene = new THREE.Scene();
    scene.add(camera);
    if(view=="mult"){
        scene.add(camera2);
        scene.add(camera3);
        scene.add(camera4);
    }
    displayFloor(0);
    displaySunMoon(250,-50, 4, 1, 750, 750);
}

function displayEaster(){
    // CAMERAS
    if(view == "pers"){
        displayPerspectiveCam(100.,30.,5.);
    } else if(view=="orth"){
        displayOrthogonalCam(40.,5.,5.);
    } else {
        displayMultipleViews(100.,30.,5.);
    }
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
            child.rotation.x = -Math.PI/2;
            child.scale.set(0.1,0.1,0.1);
            child.position.y = -3.5;
            child.name = "easterstatue";
            scene.add(child);
       }
    });
    meshPy = object;
    //meshPy.rotation.x = -Math.PI/2;
    //meshPy.scale.set(0.1,0.1,0.1);
    //meshPy.position.y = -3.5;
    //meshPy.position.x = -5.5;
    //scene.add( meshPy );
    } );

    //SCENE
    scene = new THREE.Scene();
    scene.add(camera);
    if(view=="mult"){
        scene.add(camera2);
        scene.add(camera3);
        scene.add(camera4);
    }
    displayFloor(0);
    displaySunMoon(250,-50, 4, 1, 750, 750);
}

function displaySphinx(){
    // CAMERAS 
    if(view == "pers"){
        displayPerspectiveCam(100.,30.,5.);
    } else if(view=="orth"){
        displayOrthogonalCam(40.,5.,5.);
    } else {
        displayMultipleViews(100.,30.,5.);
    }
    //OBJLOADER
    var meshPy = null;

    var objLoader = new THREE.OBJLoader();
    objLoader.load( './models/10085_egypt_sphinx_iterations-2.obj', function ( object ) {
    object.traverse( function ( child ) {
        //var texture = new THREE.Texture();
        var texture = new THREE.TextureLoader().load( './textures/rocksurface.jpg' );
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set( 20, 20 );
        if ( child instanceof THREE.Mesh ) {
            var mat = new THREE.MeshPhongMaterial( {
                shininess: 30,
                map: texture,
            } );

            child.material = mat;
            child.castShadow = true;
            child.rotation.x = -Math.PI/2;
            child.scale.set(0.01,0.01,0.01);
            child.name = "sphinx";
            scene.add(child);
       }
    });
    meshPy = object;
    //meshPy.rotation.x = -Math.PI/2;
    //meshPy.scale.set(0.01,0.01,0.01);
    //meshPy.position.y = -3.5;
    //meshPy.position.x = -5.5;
    scene.add( meshPy );
    } );

    //SCENE
    scene = new THREE.Scene();
    scene.add(camera);
    if(view=="mult"){
        scene.add(camera2);
        scene.add(camera3);
        scene.add(camera4);
    }
    displayFloor(0);
    displaySunMoon(250,-50, 4, 1, 750, 750);
}

function displayBigBen(){
    // CAMERAS 
    if(view == "pers"){
        displayPerspectiveCam(130.,80.,50.);
    } else if(view=="orth"){
        displayOrthogonalCam(40.,40.,5.);
    } else {
        displayMultipleViews(130.,80.,50.);
    }
    //OBJLOADER
    var meshPy = null;

    var objLoader = new THREE.OBJLoader();
    objLoader.load( './models/15586_Big_Ben_Clock_Tower_v1.obj', function ( object ) {
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
            child.rotation.x = -Math.PI/2;
            child.scale.set(5,5,5);
            child.name = "bigben";
            child.position.y = -3;
            scene.add(child);
       }
    });
    meshPy = object;
    //meshPy.rotation.x = -Math.PI/2;
    //meshPy.scale.set(5,5,5);
    //meshPy.position.y = -3;
    //meshPy.position.x = -5.5;
    scene.add( meshPy );

    } );

    //SCENE
    scene = new THREE.Scene();
    scene.add(camera);
    if(view=="mult"){
        scene.add(camera2);
        scene.add(camera3);
        scene.add(camera4);
    }
    displayFloor(0);
    displaySunMoon(250,-50, 4, 1, 750, 750);
}

function displayInfo(){
    if (view != "pers") {
        return;
    }
    // GEOMETRY
    var info = new THREE.PlaneGeometry(10, 10, 10, 10);

    // MATERIAL
    var infoTexture = new THREE.TextureLoader().load('./textures/info.png');
    var infoMaterial = new THREE.MeshPhongMaterial({map: infoTexture, transparent: true});
    var infoMesh = new THREE.Mesh(info,infoMaterial);
    infoMesh.name = "info";
    camera.add(infoMesh);
    infoMesh.position.set(0,0,-10)
}
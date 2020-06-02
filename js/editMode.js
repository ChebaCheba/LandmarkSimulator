function loadEditTools(){
    setNormalRenderer();
    document.getElementById("edit").style.visibility = "visible";
    document.getElementById("transform-controls").style.visibility = "visible";
    document.getElementById("select-label").style.visibility = "visible";
    document.getElementById("controls").style.visibility = "hidden";
    document.getElementById("change-scene").style.visibility = "hidden";
    document.getElementById("change-camera").style.visibility = "hidden";
    
    document.getElementById("select-obj").addEventListener("change", putObj);
    editScene();
}

function unloadEditTools(){
    document.getElementById("edit").style.visibility = "hidden";
    document.getElementById("transform-controls").style.visibility = "hidden";
    document.getElementById("controls").style.visibility = "visible";
    document.getElementById("change-scene").style.visibility = "visible";
    document.getElementById("change-camera").style.visibility = "visible";
    document.getElementById("select-label").innerHTML = "";
    selectedObj = null;
    changeScene();
}

function editScene(){
    light = new THREE.AmbientLight();
    directLight = new THREE.DirectionalLight( 0xffffff );
    directLight.position.set( 0, 1, 1 ).normalize();
    displayPerspectiveCam(40.,5.,5.);
    controls1.maxPolarAngle = 2*Math.PI;
    if(!mute){
        playMusic();
    }
    displayMusic('mii.ogg');
    scene = new THREE.Scene();
    scene.add(light);
    scene.add(directLight);
    scene.add(camera);
}

function addObj(obj){
    switch(obj) {
        case "pd":
            console.log("piramid");
            var pyramid = new Pyramid();
            pyramid.scale.set(5,5,5);
            pyramid.setTextureMaterial();
            scene.add(pyramid);
            break;
        case "kn":
            var objLoader = new THREE.OBJLoader();
            objLoader.load( './models/altar_pyramid.obj', function ( object ) {
            object.traverse( function ( child ) {
            //var texture = new THREE.Texture();
        if ( child instanceof THREE.Mesh ) {
            var mat = matEdit;

            child.material = mat;
            child.castShadow = true;
            child.rotation.x = -Math.PI/2;
            child.scale.set(0.01,0.01,0.01);
            child.name = "Kukulkan";
            scene.add(child);
            
       }
    });
    } );
            break;
        case "cm":
            var objLoader = new THREE.OBJLoader();
     objLoader.load( './models/colosseum.obj', function ( object ) {
     object.traverse( function ( child ) {
         //var texture = new THREE.Texture();
         if ( child instanceof THREE.Mesh ) {
             var mat = matEdit;
 
             child.material = mat;
             child.castShadow = true;
            child.scale.set(5,5,5);
            child.name = "Colosseum";
            child.position.y = -5.5;
            child.position.x = -5.5;
            scene.add(child);
 
        }
     });
     meshPy = object;
     } );
            break;
        case "el":
            var objLoader = new THREE.OBJLoader();
    objLoader.load( './models/10067_Eiffel_Tower_v1_max2010_it1.obj', function ( object ) {
    object.traverse( function ( child ) {
        if ( child instanceof THREE.Mesh ) {
            var mat = matEdit;
            child.material = mat;
            child.castShadow = true;
            child.rotation.x = -Math.PI/2;
            child.scale.set(0.002,0.002,0.002);
            child.name = "Eiffel";
            scene.add(child);
       }

    } );});
            break;
        case "sb":
            var objLoader = new THREE.OBJLoader();
    objLoader.load( './models/10086_saint_basil_cathedral_v1_L3.obj', function ( object ) {
    object.traverse( function ( child ) {
        if ( child instanceof THREE.Mesh ) {
            var mat = matEdit;

            child.material = mat;
            child.castShadow = true;
            child.rotation.x = -Math.PI/2;
            child.scale.set(0.001,0.001,0.001);
            child.name = "SaintBasil";
            scene.add(child);

       }
    });

    } );
            break;
        case "sl":
            var objLoader = new THREE.OBJLoader();
    objLoader.load( './models/LibertStatue.obj', function ( object ) {
    object.traverse( function ( child ) {
        if ( child instanceof THREE.Mesh ) {
            var mat = matEdit;

            child.material = mat;
            child.castShadow = true;
            child.scale.set(20,20,20);
            child.name = "SatueOfLiberty";
            scene.add(child);


       }
    });

    } );
            break;
        case "jp":
            var objLoader = new THREE.OBJLoader();
    objLoader.load( './models/Japanese_Temple.obj', function ( object ) {
    object.traverse( function ( child ) {
        if ( child instanceof THREE.Mesh ) {
            var mat = matEdit;

            child.material = mat;
            child.castShadow = true;
            child.name = "TojoTemple";
            scene.add(child);
       }
    });

    } );
            break;
        case "ea":
            var objLoader = new THREE.OBJLoader();
    objLoader.load( './models/12329_Statue_v1_l3.obj', function ( object ) {
    object.traverse( function ( child ) {
        if ( child instanceof THREE.Mesh ) {
            var mat = matEdit;

            child.material = mat;
            child.castShadow = true;
            child.rotation.x = -Math.PI/2;
            child.scale.set(0.1,0.1,0.1);
            child.position.y = -3.5;
            child.name = "EasterStatue";
            scene.add(child);
       }
    });
    } );
            break;
        case "sx":
            var objLoader = new THREE.OBJLoader();
    objLoader.load( './models/10085_egypt_sphinx_iterations-2.obj', function ( object ) {
    object.traverse( function ( child ) {
        if ( child instanceof THREE.Mesh ) {
            var mat = matEdit;

            child.material = mat;
            child.castShadow = true;
            child.rotation.x = -Math.PI/2;
            child.scale.set(0.01,0.01,0.01);
            child.name = "Sphinx";
            scene.add(child);
       }
    });
    } );
            break;
        case "bn":
            var objLoader = new THREE.OBJLoader();
    objLoader.load( './models/15586_Big_Ben_Clock_Tower_v1.obj', function ( object ) {
    object.traverse( function ( child ) {
        if ( child instanceof THREE.Mesh ) {
            var mat = matEdit;

            child.material = mat;
            child.castShadow = true;
            child.rotation.x = -Math.PI/2;
            child.scale.set(5,5,5);
            child.name = "BigBen";
            child.position.y = -3;
            scene.add(child);
       }
    });

    } );
            break;
      }
}

function translateObj(){
    if(selectedObj!=null){
        var x = document.getElementById("x-trans").value;
        var y = document.getElementById("y-trans").value;
        var z = document.getElementById("z-trans").value;
        selectedObj.translateX(x);
        selectedObj.translateY(y);
        selectedObj.translateZ(z);
    }
}

function rotateObj(){
    if(selectedObj!=null){
        var x = document.getElementById("rot-range-x").value*Math.PI/8;
        var y = document.getElementById("rot-range-y").value*Math.PI/8;
        var z = document.getElementById("rot-range-z").value*Math.PI/8;
        selectedObj.rotation.set(x,y,z);
    }
}

function scaleObj(){
    if(selectedObj!=null){
        var x = document.getElementById("x-scal").value*selectedObj.scale.x;
        var y = document.getElementById("y-scal").value*selectedObj.scale.y;
        var z = document.getElementById("z-scal").value*selectedObj.scale.z;
        selectedObj.scale.set(x,y,z);
    }
}

function changeMat(){
    selectedObj.material = matEdit;
}

function changeColor(){
    selectedObj.material.color.setHex(colorEdit);
}

function removeObject(){
    if(selectedObj){
        scene.remove(selectedObj);
        selectedObj = null;
        document.getElementById("select-label").innerHTML = "";
    }
}
function setNormalRenderer(){
    canvas.style.height = null;
    canvas.style.width = null;
    canvas.style.left = null;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas2.style.visibility = 'hidden';
    canvas3.style.visibility = 'hidden';
    canvas4.style.visibility = 'hidden';

    renderer = new THREE.WebGLRenderer({canvas: canvas});
    renderer.setSize(canvas.width, canvas.height);
    renderer.setClearColor("black");             
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
}

function displayMultipleViews(xP,yP,zP){
    canvas.style.height = null;
    canvas.style.width = null;
    canvas.width = window.innerWidth/2;
    canvas.height = window.innerHeight/2;
    canvas.style.left = 50+'%';
    canvas2.style.visibility = 'visible';
    canvas2.width = window.innerWidth/2;
    canvas2.height = window.innerHeight/2;
    canvas3.style.visibility = 'visible';
    canvas3.width = window.innerWidth/2;
    canvas3.height = window.innerHeight/2;
    canvas3.style.top = 50+'%';
    canvas4.style.visibility = 'visible';
    canvas4.width = window.innerWidth/2;
    canvas4.height = window.innerHeight/2;
    canvas4.style.left = 50+'%';
    canvas4.style.top = 50+'%';
    // PERSPECTIVE
    renderer = new THREE.WebGLRenderer({canvas: canvas});
    renderer.setViewport(0,0,canvas.width, canvas.height);
    renderer.setScissor(0,0,canvas.width, canvas.height);
    renderer.enableScissorTest (true);
    renderer.setClearColor("black");             
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    
    camera = new THREE.PerspectiveCamera(60., canvas.width / canvas.height, 0.01, 10000.);  // CAMERA
    camera.position.set(xP, yP, zP);
    controls1 = new THREE.OrbitControls(camera, renderer.domElement);
    controls1.maxPolarAngle = Math.PI/2-0.01;

    // ORTHOGONAL TOP
    renderer2 = new THREE.WebGLRenderer({canvas: canvas2});
    renderer2.setViewport(0,0,canvas2.width, canvas2.height);
    renderer2.setScissor(0,0,canvas2.width, canvas2.height);
    renderer2.enableScissorTest (true);
    renderer2.setClearColor("black");             
    renderer2.shadowMap.enabled = true;
    renderer2.shadowMap.type = THREE.PCFSoftShadowMap;
    
    camera2 = new THREE.OrthographicCamera(-10,10, 20, 0, -500, 10000);
    controls2 = new THREE.OrbitControls(camera2, renderer2.domElement);
    camera2.position.set(40.,10.,5.);
    controls2.maxPolarAngle = Math.PI/2+0.01;
    camera2.rotation.x = -Math.PI/2;

    // ORTHOGONAL FRONT
    renderer3 = new THREE.WebGLRenderer({canvas: canvas3});
    renderer3.setViewport(0,0,canvas3.width, canvas3.height);
    renderer3.setScissor(0,0,canvas3.width, canvas3.height);
    renderer3.enableScissorTest (true);
    renderer3.setClearColor("black");             
    renderer3.shadowMap.enabled = true;
    renderer3.shadowMap.type = THREE.PCFSoftShadowMap;
    
    camera3 = new THREE.OrthographicCamera(-10,10, 20, 0, -500, 10000);
    controls3 = new THREE.OrbitControls(camera3, renderer3.domElement);
    camera3.position.set(40.,10.,5.);
    controls3.maxPolarAngle = Math.PI/2+0.01;

    // ORTHOGONAL SIDE
    renderer4 = new THREE.WebGLRenderer({canvas: canvas4});
    renderer4.setViewport(0,0,canvas4.width, canvas4.height);
    renderer4.setScissor(0,0,canvas4.width, canvas4.height);
    renderer4.enableScissorTest (true);
    renderer4.setClearColor("black");             
    renderer4.shadowMap.enabled = true;
    renderer4.shadowMap.type = THREE.PCFSoftShadowMap;
    
    camera4 = new THREE.OrthographicCamera(-10,10, 20, 0, -500, 10000);
    controls4 = new THREE.OrbitControls(camera4, renderer4.domElement);
    camera4.position.set(40.,10.,5.);
    controls4.maxPolarAngle = Math.PI/2+0.01;
    camera4.rotation.y = -Math.PI/2;
}

function displayPerspectiveCam(x, y, z){
    // CAMERAS
    camera = new THREE.PerspectiveCamera(60., canvas.width / canvas.height, 0.01, 10000.);  // CAMERA
    camera.position.set(x, y, z);
    controls1 = new THREE.OrbitControls(camera, renderer.domElement);
    controls1.maxPolarAngle = Math.PI/2-0.01;
    displayMusic();
}

function displayOrthogonalCam(x,y,z){
    // CAMERAS
    camera = new THREE.OrthographicCamera(-10,10, 20, 0, -500, 10000);
    controls1 = new THREE.OrbitControls(camera, renderer.domElement);
    camera.position.set(x,y,z);
    controls1.maxPolarAngle = Math.PI/2+0.01;
}

function displayMusic(track){

        if(listener!= null){
            camera.remove(listener);
            sound.pause();
        }

        listener = new THREE.AudioListener();
        camera.add( listener );

        // create a global audio source
        sound = new THREE.Audio( listener );

        // load a sound and set it as the Audio object's buffer
        audioLoader = new THREE.AudioLoader();
        audioLoader.load( './music/'+track, function( buffer ) {
	    sound.setBuffer( buffer );
	    sound.setLoop( true );
	    sound.setVolume( 0.5 );
	    sound.pause();
        });
}
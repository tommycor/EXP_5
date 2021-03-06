window.onload = function() {
    var abtract = new draw();

    window.addEventListener('mousemove', abtract.update, false);
    window.addEventListener('click', abtract.consoleBitch, false);

    window.addEventListener('resize', abtract.handleResize, false);


    // requestAnimationFrame(abtract.render);
};

var draw = function() {
    this.init();
    this.reduceSpeed = 7;
};

draw.prototype.init = function(){

    this.render = this.render.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.update = this.update.bind(this);
    this.consoleBitch = this.consoleBitch.bind(this);

    this.mouseout = false;

    this.container = document.getElementById('exp');
    // this.container = document;

    //// INIT
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 5000);

    ////RENDERER
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setClearColor(0x888888, 1.0);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.shadowMapEnabled = true;

    // position and point the camera to the center of the scene
    this.camera.position.x = 500;
    this.camera.position.y = 40;
    this.camera.position.z = 1000;
    this.camera.lookAt( this.scene.position );

    // add spotlight for the shadows
    this.spotLight = new THREE.SpotLight(0xffffff);
    this.spotLight.position.set(10, 20, 20);
    this.spotLight.shadowCameraNear = 20;
    this.spotLight.shadowCameraFar = 50;
    this.spotLight.castShadow = true;
    this.scene.add( this.spotLight );

    this.scene.add(new THREE.AmbientLight(0xffffff));

    this.geometry = new THREE.SphereGeometry(700, 100, 80);
    this.uniforms = {
      mouse: {
        type: 'v3',
        value: new THREE.Vector3( 0, 0, 0 )
      },
      time: {
        type: 'f',
        value: 0.0
      }
    };

    this.material = new THREE.ShaderMaterial( {
        wireframe: true,
        uniforms: this.uniforms,
        vertexShader: document.getElementById( 'vertexShader' ).textContent,
        fragmentShader: document.getElementById( 'fragmentShader' ).textContent
    });

    this.Mesh = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.Mesh);

    this.container.appendChild(this.renderer.domElement);

    this.control = new function(){
        this.camX = 1500;
        this.camY = 1500;
        this.camZ = 1500;
    };
    this.addControlGui(this.control);
    this.addStatsObject();

    this.render();

    console.log("Initialazing!");
};

draw.prototype.render = function() {
    this.camera.position.x = this.control.camX;
    this.camera.position.y = this.control.camY;
    this.camera.position.z = this.control.camZ;
    this.camera.lookAt( this.scene.position );

    // console.log(this.uniforms.mouse.value);

    this.stats.update();
    this.renderer.render(this.scene, this.camera);

    this.uniforms.time.value ++;

    if ( this.mouseout === true ){
        this.uniforms.mouse.value.x -= this.reduceSpeed;
        this.uniforms.mouse.value.y -= this.reduceSpeed;
        this.uniforms.mouse.value.z -= this.reduceSpeed;
    }

    requestAnimationFrame(this.render);
};

draw.prototype.update = function(event) {
    var mouse = getPosition(event, this.Mesh, this.camera);

    if (typeof mouse !== 'undefined') {
        this.uniforms.mouse.value = new THREE.Vector3( mouse.x, mouse.y, mouse.z );
        this.mouseout = false;
    }
    else {
        this.mouseout = true;
    }
};

draw.prototype.consoleBitch = function(event) {
    console.log(this.uniforms.mouse.value.x);
};



draw.prototype.addControlGui = function(controlObject) {
    var gui = new dat.GUI();
    gui.add(controlObject, 'camX', -2000, 2000);
    gui.add(controlObject, 'camY', -2000, 2000);
    gui.add(controlObject, 'camZ', -2000, 2000);
};

draw.prototype.addStatsObject = function() {
    this.stats = new Stats();
    this.stats.setMode(0);

    this.stats.domElement.style.position = 'absolute';
    this.stats.domElement.style.left = '0px';
    this.stats.domElement.style.top = '0px';

    document.body.appendChild(this.stats.domElement);
};

draw.prototype.handleResize = function() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
};
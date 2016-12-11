/*
//modified from http://jsfiddle.net/3drjwj2n/
var TO_RADIANS = Math.PI / 180;

Particle3D = function(material) {
    THREE.Particle.call(this, material);

    //this.material = material instanceof Array ? material : [ material ];
    // define properties
    this.velocity = new THREE.Vector3(0, -8, 0);
    this.velocity.rotateX(randomRange(-45, 45));
    this.velocity.rotateY(randomRange(0, 360));
    this.gravity = new THREE.Vector3(0, 0, 0);
    this.drag = 1;
    // methods...
};

Particle3D.prototype = new THREE.Particle();
Particle3D.prototype.constructor = Particle3D;

Particle3D.prototype.updatePhysics = function() {
    this.velocity *= (this.drag);
    this.velocity += (this.gravity);
    this.position += (this.velocity);
}

THREE.Vector3.prototype.rotateY = function(angle) {
    cosRY = Math.cos(angle * TO_RADIANS);
    sinRY = Math.sin(angle * TO_RADIANS);

    var tempz = this.z;;
    var tempx = this.x;

    this.x = (tempx * cosRY) + (tempz * sinRY);
    this.z = (tempx * -sinRY) + (tempz * cosRY);
}

THREE.Vector3.prototype.rotateX = function(angle) {
    cosRY = Math.cos(angle * TO_RADIANS);
    sinRY = Math.sin(angle * TO_RADIANS);

    var tempz = this.z;;
    var tempy = this.y;

    this.y = (tempy * cosRY) + (tempz * sinRY);
    this.z = (tempy * -sinRY) + (tempz * cosRY);
}

THREE.Vector3.prototype.rotateZ = function(angle) {
    cosRY = Math.cos(angle * TO_RADIANS);
    sinRY = Math.sin(angle * TO_RADIANS);

    var tempx = this.x;;
    var tempy = this.y;

    this.y = (tempy * cosRY) + (tempx * sinRY);
    this.x = (tempy * -sinRY) + (tempx * cosRY);
}

// returns a random number between the two limits provided

function randomRange(min, max) {
    return ((Math.random() * (max - min)) + min);
}

*/







var width = window.innerWidth;
var height = window.innerHeight;


//Background canvas styling
var canvas=document.getElementById("bkgrdcanvas");
var context=canvas.getContext("2d");
var my_gradient=context.createLinearGradient(0,0,width/4,height/4);
my_gradient.addColorStop(0,"#264270");
my_gradient.addColorStop(1,"#2c2e33");
context.fillStyle=my_gradient;
context.fillRect(0,0,width,height);

/*
var particles = [];
var particleImage = new Image(); //THREE.ImageUtils.loadTexture( "http://i.imgur.com/cTALZ.png" );
particleImage.src = './snowflake.png';
*/

var scene = new THREE.Scene();
var meshes = [];

// PerspectiveCamera( fov, aspect, near, far )
var camera = new THREE.PerspectiveCamera( 50, width/height , 0.1, 1000 );
camera.position.x = 0;
camera.position.y = 10;
camera.position.z = 75;
camera.lookAt({x:0,y:0,z:0});

var renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById("threecanvas"),
    antialias: true,
    preserveDrawingBuffer: false,
    alpha: true
});
renderer.setSize(width, height);

var directionalLight = new THREE.DirectionalLight('white', 0.5);
var light = new THREE.AmbientLight('white', 0.5);
directionalLight.position.set(0, 10, 6);
scene.add(directionalLight);
scene.add(light);

/*
var material = new THREE.ParticleBasicMaterial( { map: new THREE.Texture(particleImage) } );

for (var i = 0; i < 500; i++) {

    particle = new Particle3D( material);
    particle.position.x = Math.random() * 2000 - 1000;
    particle.position.y = Math.random() * 2000 - 1000;
    particle.position.z = Math.random() * 2000 - 1000;
    particle.scale.x = particle.scale.y =  1;
    scene.add( particle );

    particles.push(particle);
}
*/

loadMesh('snowflake.3', function(obj){
    obj.position.y = 0;
    obj.scale.x = 1;
    obj.scale.y = 1;
    obj.scale.z = 1;
    addMesh(obj);
});


cameraControls = new THREE.OrbitControls( camera, renderer.domElement );
cameraControls.target.set( 0, 0, 0 );
cameraControls.addEventListener( 'change', render );

render();

function addMesh(mesh) {
    meshes.push(mesh);
    scene.add(mesh);
}



// create the particle variables
var particleCount = 1800,
    particles = new THREE.Geometry(),
    pMaterial = new THREE.PointsMaterial({
        color: 0xFFFFFF,
        size: 20
    });

// now create the individual particles
for (var p = 0; p < particleCount; p++) {

    // create a particle with random
    // position values, -250 -> 250
    var pX = Math.random() * 500 - 250,
        pY = Math.random() * 500 - 250,
        pZ = Math.random() * 500 - 250,
        particle = new THREE.Vector3(
            new THREE.Vector3(pX, pY, pZ)
        );

    // add it to the geometry
    particles.vertices.push(particle);
}


// create the particle system
var particleSystem = new THREE.Points(
    particles,
    pMaterial);

// add it to the scene
scene.add(particleSystem);

function render() {
    window.requestAnimationFrame(render);
    // uncomment to automatically rotate mesh
    meshes.forEach(function(mesh) {
        mesh.rotateY(0.01);
        mesh.rotateZ(0.005);
        mesh.rotateX(0.005);
    })


    /*
    for(var i = 0; i<particles.length; i++) {

        var particle = particles[i];
        particle.updatePhysics();

        with(particle.position) {
            if(y<-1000) y+=2000;
            if(x>1000) x-=2000;
            else if(x<-1000) x+=2000;
            if(z>1000) z-=2000;
            else if(z<-1000) z+=2000;
        }
    }
    */

    renderer.render(scene, camera);
};

function loadMesh(name, callback){
    var objLoader = new THREE.OBJLoader();
    var matLoader = new THREE.MTLLoader();
    matLoader.load(name + '.mtl', function(materials) {
        materials.preload();
        objLoader.setMaterials(materials);
        objLoader.load(name + '.obj',function (obj) {
            callback(obj);
        });
    });
};























































/*
//Three js
var scene = new THREE.Scene();

// OrthographicCamera( left, right, top, bottom, near, far )
var orthoCamera = new THREE.OrthographicCamera(-10, 10, 10, -10, -10,1000);

var aspect = width/height;
// PerspectiveCamera( Field of View, aspect, near, far ) near and far set the limits of focal depth/rendering
var camera = new THREE.PerspectiveCamera( 30, aspect , 0.1, 1000 );
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 90;  //90 degrees off of xy plane
camera.lookAt({x:0,y:0,z:0});  //I believe that the camera always looks at the center of the screen, no matter what you set the angle to

var meshes = [];



var directionalLight = new THREE.DirectionalLight('white', 0);
var light = new THREE.AmbientLight('white', 0.7);

directionalLight.position.set(1, 1, 1);
directionalLight.target.position.set( 0, 0, 0 );
scene.add(directionalLight);
scene.add(light);

var renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById("threecanvas"),
    antialias: true,
    preserveDrawingBuffer: false,
    alpha: true
});


renderer.setSize(width, height);

// Define Geometries, the shapes of objects:
var cubeGeom   = new THREE.BoxGeometry(10, 10, 10 );
var planeGeom  = new THREE.PlaneGeometry(50, 50); //percent of screen
var triangle = new THREE.Geometry();

//start by pushing in a center point (will become point 0 in the faces list)
triangle.vertices.push(new THREE.Vector3( 0, 0, 0 ));


//reference https://gist.github.com/robertcasanova/6593814
numSides=12;
steps = 24;
pointsPerSide = 4;
radius = {inner:Math.random()*4+8, middle:Math.random()*4+6, outer:Math.random()*4+4};

d3.selectAll('.printout').html(radius.inner.toFixed(2) +', <br>' + radius.middle.toFixed(2) +', <br>' + radius.outer.toFixed(2));

for (var i=0; i<steps; i++){
    //var modulus = i % numSides;
    console.log(i%pointsPerSide,Number.isInteger(i/numSides));
    if(i%pointsPerSide==0){
        triangle.vertices.push(
            //add a new position for each of the vertices of the hexagon
            new THREE.Vector3( -1*radius.outer*Math.sin(2*i*Math.PI/steps), radius.outer*Math.cos(2*i*Math.PI/steps), 0)
        );
    }
    else if((i%pointsPerSide == pointsPerSide/2) ){
        triangle.vertices.push(
            //add a new position for each of the vertices of the hexagon
            new THREE.Vector3( -1*radius.inner*Math.sin(2*i*Math.PI/steps), radius.inner*Math.cos(2*i*Math.PI/steps), 0)
        );
    }
    else{
        triangle.vertices.push(
            //add a new position for each of the vertices of the hexagon
            new THREE.Vector3( -1*radius.middle*Math.sin(2*i*Math.PI/steps), radius.middle*Math.cos(2*i*Math.PI/steps), 0)
        );
    }

}

console.log(triangle.vertices);


/*
 triangle.vertices.push(
    new THREE.Vector3( 10*Math.sin(Math.PI*0/180),  10*Math.cos(Math.PI*0/180), 0 ),
    new THREE.Vector3( 10*Math.sin(Math.PI*60/180),  10*Math.cos(Math.PI*60/180), 0 ),
    new THREE.Vector3( 10*Math.sin(Math.PI*120/180),  10*Math.cos(Math.PI*120/180), 0 ),
    new THREE.Vector3( 10*Math.sin(Math.PI*180/180),  10*Math.cos(Math.PI*180/180), 0 ),
    new THREE.Vector3( 10*Math.sin(Math.PI*240/180),  10*Math.cos(Math.PI*240/180), 0 ),
    new THREE.Vector3( 10*Math.sin(Math.PI*300/180),  10*Math.cos(Math.PI*300/180), 0 ));

//draw a triangular face for each segment of the hexagon
//(reworked to draw from center point)

triangle.faces.push( new THREE.Face3( 0, 1, 2 ) );
triangle.faces.push( new THREE.Face3( 0, 2, 3 ) );
triangle.faces.push( new THREE.Face3( 0, 3, 4 ) );
triangle.faces.push( new THREE.Face3( 0, 4, 5 ) );
triangle.faces.push( new THREE.Face3( 0, 5, 6 ) );
triangle.faces.push( new THREE.Face3( 0, 6, 1 ) );



makeFaces(triangle.vertices);

function makeFaces(vertices){
    for (var i=0; i<vertices.length-2; i++){
        triangle.faces.push( new THREE.Face3( 0, 1+i, i+2 ) );
    }
    triangle.faces.push( new THREE.Face3( 0, vertices.length-1, 1 ) );
}

triangle.computeBoundingSphere();

// Define Materials, the colors / surfaces of objects
/*var cubeMaterial = new THREE.MeshLambertMaterial({
    color: '#eaf2ff',
    side: THREE.DoubleSide,
    wireframe: false,
    wireframeLinewidth: 12
});

//from http://stackoverflow.com/questions/14477183/glossy-materials-in-three-js
//used for making shiny surfaces
/*
var cubeMaterial = new THREE.MeshPhongMaterial( {
    color: '#eaf2ff',               //set material color
    side: THREE.DoubleSide,         //make the object double-sided (only works with one rotational direction??
    specular: '#eaf2ff',             //set specular color
    shininess: 30                  //choose level of shininess
} )


// material texture
var texture = new THREE.Texture( generateTexture() );
texture.needsUpdate = true; // important!

//set background plane
var planeMaterial = new THREE.MeshBasicMaterial({
    color: '#274f91',
    //map: texture, transparent: true
});

var cube = new THREE.Mesh(cubeGeom, cubeMaterial );
cube.position.x = 15;
var plane = new THREE.Mesh(planeGeom, planeMaterial);
var triangleObj = new THREE.Mesh(triangle, cubeMaterial);
addMesh(triangleObj);
plane.position.z = -10;
scene.add(plane);

function addMesh(mesh) {
    meshes.push(mesh);
    scene.add(mesh);
}
cameraControls = new THREE.OrbitControls( camera, renderer.domElement );
cameraControls.target.set( 0, 0, 0 );
cameraControls.addEventListener( 'change', render );

function render() {
    window.requestAnimationFrame(this.render.bind(this));  //only requests animation when window is in focus
     meshes.forEach(function(mesh) {
     mesh.rotateY(0.05);
     });
    renderer.render(scene, camera);
};

render();


//from http://jsfiddle.net/FtML5/3/
function generateTexture() {

    var size = 512;

    // create canvas
    canvas = document.createElement( 'canvas' );
    canvas.width = size;
    canvas.height = size;

    // get context
    var context = canvas.getContext( '2d' );

    // draw gradient
    context.rect( 0, 0, size, size );
    var gradient = context.createLinearGradient( 0, 0, size, size );
    gradient.addColorStop(0, '#99ddff'); // light blue
    gradient.addColorStop(1, 'transparent'); // dark blue
    context.fillStyle = gradient;
    context.fill();

    return canvas;

}
*/

// Create an event listener that resizes the renderer with the browser window.
window.addEventListener('resize', function() {
    var WIDTH = window.innerWidth,
        HEIGHT = window.innerHeight;
    renderer.setSize(WIDTH, HEIGHT);
    camera.aspect = WIDTH / HEIGHT;
    camera.updateProjectionMatrix();
});

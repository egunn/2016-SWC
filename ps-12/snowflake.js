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


//Three js
var scene = new THREE.Scene();

// OrthographicCamera( left, right, top, bottom, near, far )
var orthoCamera = new THREE.OrthographicCamera(-10, 10, 10, -10, -10,1000);

var aspect = width/height;
// PerspectiveCamera( Field of View, aspect, near, far )
var camera = new THREE.PerspectiveCamera( 50, aspect , 0.1, 1000 );
camera.position.z = 30;
camera.position.x = 0;
camera.position.y = 10;
camera.lookAt({x:0,y:0,z:0});

var meshes = [];



var directionalLight = new THREE.DirectionalLight('white', .1);
var light = new THREE.AmbientLight('white', 0.7);

directionalLight.position.set(1, 1, 0);
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
/*
triangle.vertices.push(
    new THREE.Vector3( -10,  10, 0 ),
    new THREE.Vector3( -10, -10, 0 ),
    new THREE.Vector3(  10, -10, 0 ));



var test = [];
 */

//start by pushing in a center point (will become point 0 in the faces list)
triangle.vertices.push(new THREE.Vector3( 0, 0, 0 ))


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

//draw a triangular face for each segment of the hexagon
//(reworked to draw from center point)
/*
triangle.faces.push( new THREE.Face3( 0, 1, 2 ) );
triangle.faces.push( new THREE.Face3( 0, 2, 3 ) );
triangle.faces.push( new THREE.Face3( 0, 3, 4 ) );
triangle.faces.push( new THREE.Face3( 0, 4, 5 ) );
triangle.faces.push( new THREE.Face3( 0, 5, 6 ) );
triangle.faces.push( new THREE.Face3( 0, 6, 1 ) );
*/


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
});*/

//from http://stackoverflow.com/questions/14477183/glossy-materials-in-three-js
//used for making shiny surfaces
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
cube.position.x = 15
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
    // window.requestAnimationFrame(this.render.bind(this));
    // meshes.forEach(function(mesh) {
    //   mesh.rotateY(0.01);
    // })
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

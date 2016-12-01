var scene = new THREE.Scene();

// OrthographicCamera( left, right, top, bottom, near, far )
var orthoCamera = new THREE.OrthographicCamera(-10, 10, 10, -10, -10,1000);


// PerspectiveCamera( Field of View, aspect, near, far )
var camera = new THREE.PerspectiveCamera( 50, 1 , 0.1, 1000 );
camera.position.z = 30;
camera.position.x = 0;
camera.position.y = 10;
camera.lookAt({x:0,y:0,z:0});

var meshes = [];



var directionalLight = new THREE.DirectionalLight('white', 0.5);
var light = new THREE.AmbientLight('white', 0.5);

directionalLight.position.set(0, 10, 6);
scene.add(directionalLight);
scene.add(light);

var renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("canvas"),
  antialias: true,
  preserveDrawingBuffer: false,
  alpha: true
});

renderer.setSize(500, 500);

// Define Geometries, the shapes of objects:
var cubeGeom   = new THREE.BoxGeometry(10, 10, 10 );
var planeGeom  = new THREE.PlaneGeometry(100, 100)
var triangle = new THREE.Geometry();

triangle.vertices.push(
  new THREE.Vector3( -10,  10, 0 ),
  new THREE.Vector3( -10, -10, 0 ),
  new THREE.Vector3(  10, -10, 0 )
);
triangle.faces.push( new THREE.Face3( 0, 1, 2 ) );
triangle.computeBoundingSphere();

// Define Materials, the colors / surfaces of objects
var cubeMaterial = new THREE.MeshLambertMaterial({
    color: 'hsl(80,20%,50%)',
    side: THREE.DoubleSide,
    wireframe: false,
    wireframeLinewidth: 12
});
var planeMaterial = new THREE.MeshBasicMaterial({color: 'white'});

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
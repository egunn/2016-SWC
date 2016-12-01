var scene = new THREE.Scene();
var meshes = [];

// OrthographicCamera( left, right, top, bottom, near, far )
var orthoCamera = new THREE.OrthographicCamera(-10, 10, 10, -10, -10,1000);

// PerspectiveCamera( fov, aspect, near, far )
var camera = new THREE.PerspectiveCamera( 50, 1 , 0.1, 1000 );
camera.position.x = 0;
camera.position.y = 10;
camera.position.z = 20;
camera.lookAt({x:0,y:0,z:0});

var renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("canvas"),
  antialias: true,
  preserveDrawingBuffer: false,
  alpha: true
});
renderer.setSize(500, 500);

var directionalLight = new THREE.DirectionalLight('white', 0.5);
var light = new THREE.AmbientLight('white', 0.5);
directionalLight.position.set(0, 10, 6);
scene.add(directionalLight);
scene.add(light);

loadMesh('castle', function(obj){
  obj.position.y = -5;
  obj.scale.x = 0.5
  obj.scale.y = 0.5
  obj.scale.z = 0.5
  addMesh(obj);
});

render();

function addMesh(mesh) {
  meshes.push(mesh);
  scene.add(mesh);
}

function render() {
  window.requestAnimationFrame(this.render.bind(this));
  meshes.forEach(function(mesh) {
    mesh.rotateY(0.01);
  })
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
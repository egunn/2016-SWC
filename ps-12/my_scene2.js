var scene = new THREE.Scene();
var meshes = [];

// PerspectiveCamera( fov, aspect, near, far )
var camera = new THREE.PerspectiveCamera( 50, 1 , 0.1, 1000 );
camera.position.x = 0;
camera.position.y = 10;
camera.position.z = 75;
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

function render() {
    window.requestAnimationFrame(render);
    // uncomment to automatically rotate mesh
    meshes.forEach(function(mesh) {
       mesh.rotateY(0.01);
       mesh.rotateZ(0.005);
       mesh.rotateX(0.005);
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
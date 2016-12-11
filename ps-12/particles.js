// create a scene, that will hold all our elements such as objects, cameras and lights.
var scene = new THREE.Scene();

// create a camera, which defines where we're looking at.
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

var width = window.innerWidth;
var height = window.innerHeight;


// create a render and set the size
var webGLRenderer = new THREE.WebGLRenderer({
    canvas: document.getElementById("threecanvas"),
    antialias: true,
    preserveDrawingBuffer: false,
    alpha: true
});
webGLRenderer.setClearColor(new THREE.Color(0x000000, 0.1));
webGLRenderer.setSize(window.innerWidth, window.innerHeight);


var light = new THREE.AmbientLight('white', 0.5);
scene.add(light);

// position and point the camera to the center of the scene
camera.position.x = 20;
camera.position.y = 0;
camera.position.z = 150;

createParticles();
render();


function createParticles() {

    var geom = new THREE.Geometry();
    var material = new THREE.PointsMaterial({
        size: 10,
        map: THREE.ImageUtils.loadTexture(
            "snowflake.png"
        ),
        blending: THREE.AdditiveBlending,
        transparent:true,
        vertexColors: true,
        //color: 0xffffff
    });

    for (var x = -3; x < 3; x++) {
        for (var y = -3; y < 3; y++) {
            for (var z = -3; z < 3; z++){
                var particle = new THREE.Vector3(x * 10*Math.random(), y * 10*Math.random(), z * 75*Math.random());

                // create a velocity vector
                particle.velocity = new THREE.Vector3(
                    0,              // x
                    -Math.random(), // y: random vel
                    0);             //z

                geom.vertices.push(particle);
                geom.colors.push(new THREE.Color(Math.random()*.1 * 0xDADAE8));
            }
        }
    }

    var system = new THREE.Points(geom, material);

    // also update the particle system to
    // sort the particles which enables
    // the behaviour we want
    system.sortParticles = true;

    scene.add(system);
}



function render() {
    requestAnimationFrame(render);

    webGLRenderer.render(scene, camera);
}


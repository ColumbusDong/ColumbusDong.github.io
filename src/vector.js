var width = window.innerWidth * 0.7;
var height = window.innerHeight;
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, width/height, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
document.body.appendChild( renderer.domElement );

var lineMaterial = new THREE.LineBasicMaterial({
    color: 0x0000ff
});

var from = new THREE.Vector3( 0, 0, 0 );
var to = new THREE.Vector3( 2, 2, 2 );
var direction = to.clone().sub(from);
var length = direction.length();
var arrowHelper = new THREE.ArrowHelper(direction.normalize(), from, length, 0xff0000 );
scene.add( arrowHelper );

camera.position.z = 5;
camera.position.y = 1;



var size = 10;
var step = 10;
var gridHelper = new THREE.GridHelper(size, step);

controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0, 0);

scene.add(gridHelper);

var t = 0;

var render = function () {
    requestAnimationFrame( render );
    arrowHelper.setDirection(new THREE.Vector3(Math.sin(t), 1, Math.cos(t)).normalize());
    t += 0.05;

    if(t > 10) {
        scene.remove(arrowHelper);
    }

    renderer.render(scene, camera);
};

render();
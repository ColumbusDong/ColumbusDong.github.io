var width = window.innerWidth * 0.7;
var height = window.innerHeight;
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, width/height, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
document.body.appendChild( renderer.domElement );

var geometry = new THREE.BoxGeometry( 1, 1, 1 );
var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
var cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;
camera.position.y = 1;

var size = 10;
var step = 10;
var gridHelper = new THREE.GridHelper(size, step);

controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0, 0);

scene.add(gridHelper);

var render = function () {
    requestAnimationFrame( render );

    cube.rotation.x += 0.05;
    cube.rotation.y += 0.05;

    renderer.render(scene, camera);
};

render();
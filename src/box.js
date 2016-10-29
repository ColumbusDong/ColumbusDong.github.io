var width = window.innerWidth * 0.7;
var height = window.innerHeight;
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, width/height, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
renderer.setClearColor (0xFFFFFF, 1);
document.getElementById("gridId").appendChild( renderer.domElement );

//Rotating Cube
var geometry = new THREE.BoxGeometry( 1, 1, 1 );
var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
var cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;
camera.position.y = 1;

controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0, 0);

//Grid
var size = 100;
var step = size;
var gridXZ = new THREE.GridHelper(size, step);

var gridXY = new THREE.GridHelper(size, step);
gridXY.rotation.x = Math.PI/2;

var gridYZ = new THREE.GridHelper(size, step);
gridYZ.rotation.z = Math.PI/2;

scene.add(gridXZ);
scene.add(gridXY);
scene.add(gridYZ);

//Make Cube Rotate
var render = function () {
    requestAnimationFrame( render );

    cube.rotation.x += 0.05;
    cube.rotation.y += 0.05;

    renderer.render(scene, camera);
};

render();

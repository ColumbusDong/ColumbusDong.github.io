var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth * 0.7, window.innerHeight );
document.body.appendChild( renderer.domElement );

var geometry = new THREE.BoxGeometry( 1, 1, 1 );
var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
var cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;
camera.position.y = 1;

var size = 10;
var step = 10;
var gridXZ = new THREE.GridHelper(size, step);

var gridXY = new THREE.GridHelper(size, step);
gridXY.rotation.x = Math.PI/2;

var gridYZ = new THREE.GridHelper(size, step);
gridYZ.rotation.z = Math.PI/2;

scene.add(gridXZ);
scene.add(gridXY);
scene.add(gridYZ);

var render = function () {
    requestAnimationFrame( render );

    cube.rotation.x += 0.05;
    cube.rotation.y += 0.05;

    renderer.render(scene, camera);
};

render();

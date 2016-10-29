var sceneManager = new SceneManager();


sceneManager.camera.position.z = 5;
sceneManager.camera.position.y = 1;



var size = 10;
var step = 10;
var gridHelper = new THREE.GridHelper(size, step);

controls = new THREE.OrbitControls(sceneManager.camera, sceneManager.renderer.domElement);
controls.target.set(0, 0, 0);

sceneManager.scene.add(gridHelper);

var t = 0;

var render = function () {
    requestAnimationFrame( render );
    sceneManager.renderer.render(sceneManager.scene, sceneManager.camera);
};

render();
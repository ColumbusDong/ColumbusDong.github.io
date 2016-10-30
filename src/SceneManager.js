/**
 * Constructor for SceneManager. Sets up the window and initializes the renderer
 * @constructor
 */
var SceneManager = function(size, step) {
    this.list = [];
    this.count = 0;
    var width = window.innerWidth * 0.7;
    var height = window.innerHeight;
    var scene = this.scene = new THREE.Scene();
    var camera = this.camera = new THREE.PerspectiveCamera( 75, width/height, 0.1, 1000 );

    var renderer = this.renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    renderer.setClearColor (0xFFFFFF, 1);
    document.getElementById("gridId").appendChild( renderer.domElement );
    var size = size || 10;
    var step = step || size * 0.1;
    this.drawGrid(size, step)
    //Initial Camera Position
    camera.position.x = size;
    camera.position.y = size;
    camera.position.z = size;

    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 0, 0);



    var render = function () {
        requestAnimationFrame( render );
        renderer.render(scene, camera);
    };

    render();

};

/**
 * Draws the reference grid
 * @param size The distance between each step
 * @param step The number of steps
 */
SceneManager.prototype.drawGrid = function(size, step) {
//XY
    var gridXY = new THREE.GridHelper(size, step*2, 0x000000, 0xd9dde2);

    //XZ
    var gridXZ = new THREE.GridHelper(size, step*2, 0x000000, 0xd9dde2);
    gridXZ.rotation.x = Math.PI/2;

    //YZ
    var gridYZ = new THREE.GridHelper(size, step*2, 0x000000, 0xd9dde2);
    gridYZ.rotation.z = Math.PI/2;

    //Add Grid
    this.scene.add(gridXZ);
    this.scene.add(gridXY);
    this.scene.add(gridYZ);

    //Make Arrows
    var origin = new THREE.Vector3(0,0,0);
    var xhex = 0xf44336;
<<<<<<< HEAD
    var yhex = 0x4caf50;
    var zhex = 0x2196f3;
=======
    var yhex = 0x4CAF50;
    var zhex = 0x03A9F4;
>>>>>>> 159b4aa73e4d8d2697cf9a20574d8c6f13dc9b23

    var xPosArrow = new THREE.ArrowHelper(new THREE.Vector3(1,0,0), origin, size*1.09, xhex, size *.09, size *.09);
    //var xNegArrow = new THREE.ArrowHelper(new THREE.Vector3(-1,0,0), origin, size + 2.5*step, xhex );
    var yPosArrow = new THREE.ArrowHelper(new THREE.Vector3(0,1,0), origin, size*1.09, yhex, size *.09, size *.09);
    //var yNegArrow = new THREE.ArrowHelper(new THREE.Vector3(0,-1,0), origin, size + 2.5*step, yhex );
    var zPosArrow = new THREE.ArrowHelper(new THREE.Vector3(0,0,1), origin, size*1.09, zhex, size *.09, size *.09);
    //var zNegArrow = new THREE.ArrowHelper(new THREE.Vector3(0,0,-1), origin, size + 2.5*step, zhex );

    //Add Arrows
    this.scene.add(xPosArrow);
    //scene.add(xNegArrow);
    this.scene.add(yPosArrow);
    //scene.add(yNegArrow);
    this.scene.add(zPosArrow);
    //scene.add(zNegArrow);

    //Add Thicker X Axes

    var xAxes = makeCylinder(.1, 2*size, xhex);
    xAxes.rotation.x = Math.PI/2;
    xAxes.rotation.z = Math.PI/2;
    this.scene.add(xAxes);

    //Add Thicker Y Axes
    var yAxes = makeCylinder(.125, 2*size, zhex);
=======
    var yAxes = makeCylinder(.1, 2*size, zhex);
    yAxes.rotation.x = Math.PI/2;
    yAxes.rotation.y = Math.PI/2;
    this.scene.add(yAxes);

    //Add Thicker Z Axes

    var zAxes = makeCylinder(.1, 2*size, yhex);
    this.scene.add(zAxes);

};




/**
 * Adds a vector to the grid
 * @param direction The direction of the vector
 * @param color The color of the vector
 * @param start The starting point of the vector
 */
SceneManager.prototype.add = function(direction, color, start) {
    var vector;

    if(direction instanceof Vector3) {
        vector = direction;
        vector.id = this.count;
    } else {
        color = color || 0x0;
        start = start || {
                x: 0,
                y: 0,
                z: 0
            };


        vector = new Vector3(direction, color, start, this.count);
    }
    this.scene.add(vector.arrow);
    this.list.push(vector);
    this.count++;
};

/**
 * Removes a vector by its unique ID
 * @param id
 * @returns {boolean} Whether it successfully removed
 */
SceneManager.prototype.remove = function(id) {
    for(var i = 0; i < this.list.length; i++) {
        if(this.list[i].id === id) {
            var vector = this.list.splice(i, 1)[0];
            this.scene.remove(vector.arrow);
            for(var i = 0; i < vector.angles.length; i++) {
                this.scene.remove(vector.angles[i]);
            }
            return true;
        }
    }

    return false;
};

/**
 * Gets a vector by its unique ID
 * @param id
 * @returns {Vector3} The vector with the specific id
 */
SceneManager.prototype.get = function(id) {
    for(var i = 0; i < this.list.length; i++) {
        if(this.list[i].id === id) {
            return this.list[i];
        }
    }
};

/**
 * Sets the values of a vector by its ID
 * @param id
 * @param newVector
 * @param newColor
 * @param newStart
 */
SceneManager.prototype.set = function(id, newVector, newColor, newStart) {
    var vector = this.get(id);
    vector.set(newVector, newColor, newStart);
    for(var i = 0; i < vector.angles.length; i++) {
        this.scene.remove(vector.angles[i]);
    }

    vector.angles = [];
};

/**
 * Draws the angle between two vectors
 * @param id1 The ID of the first vector
 * @param id2 The ID of the second vector
 */
SceneManager.prototype.drawAngle = function(id1, id2) {
    //stemkoski.github.io/Three.js/Earth-LatLon.html


    var vector1 = this.get(id1);
    var vector2 = this.get(id2);



    var curve = Vector3.getAngleCurve(vector1, vector2);
    var lineGeometry = new THREE.Geometry();
    lineGeometry.vertices = curve.getPoints(100);
    lineGeometry.computeLineDistances();
    var lineMaterial = new THREE.LineBasicMaterial();
    lineMaterial.color = (typeof(color) === "undefined") ? new THREE.Color(0xFF0000) : new THREE.Color(color);
    var line = new THREE.Line( lineGeometry, lineMaterial );
    vector1.angles.push(line);
    vector2.angles.push(line);



    sceneManager.scene.add(line);
};

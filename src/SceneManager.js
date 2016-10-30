/**
 * Constructor for SceneManager. Sets up the window and initializes the renderer
 * @constructor
 */
var SceneManager = function() {
    this.width = window.innerWidth * 0.7;
    this.height = window.innerHeight;
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera( 75, this.width / this.height, 0.1, 1000 );

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(this.width, this.height);
    this.renderer.setClearColor (0xFFFFFF, 1);
    // document.body.appendChild( this.renderer.domElement );
    document.getElementById("gridId").appendChild( this.renderer.domElement );

    this.list = [];
    this.count = 0;

    this.camera.position.z = 5;
    this.camera.position.y = 5;

    this.drawGrid(10, 10);

    var controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
    controls.target.set(0, 0, 0);



};

/**
 * Draws the reference grid
 * @param size The distance between each step
 * @param step The number of steps
 */
SceneManager.prototype.drawGrid = function(size, step) {
    var gridHelper = new THREE.GridHelper(size, step);
    this.scene.add(gridHelper);

}

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


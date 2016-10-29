var SceneManager = function() {
    this.width = window.innerWidth * 0.7;
    this.height = window.innerHeight;
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera( 75, this.width / this.height, 0.1, 1000 );

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(this.width, this.height);
    this.renderer.setClearColor (0xFFFFFF, 1);
    document.body.appendChild( this.renderer.domElement );

    this.list = [];
    this.count = 0;


};

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

SceneManager.prototype.remove = function(id) {
    for(var i = 0; i < this.list.length; i++) {
        if(this.list[i].id === id) {
            var vector = this.list.splice(i, 1)[0];
            this.scene.remove(vector.arrow);
            for(var angle in vector.angles) {
                this.scene.remove(angle);
            }
            return true;
        }
    }

    return false;
};

SceneManager.prototype.get = function(id) {
    for(var i = 0; i < this.list.length; i++) {
        if(this.list[i].id === id) {
            return this.list[i];
        }
    }
};

SceneManager.prototype.drawAngle = function(id1, id2) {
    //stemkoski.github.io/Three.js/Earth-LatLon.html


    var vector1 = this.get(id1);
    var vector2 = this.get(id2);



    var curve = Vector3.angleBetween(vector1.direction.clone(), vector2.direction.clone());
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


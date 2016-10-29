var Vector3 = function(vector, color, start, id) {
    this.vector = vector;
    this.color = color || 0x0;
    this.start = start || {x: 0, y: 0, z: 0};

    this.id = id;

    var from = new THREE.Vector3(start.x, start.y, start.z);
    var direction = new THREE.Vector3(vector.x, vector.y, vector.z);
    var length = direction.length();
    var arrowHelper = new THREE.ArrowHelper(direction.normalize(), from, length, this.color);
    this.arrow = arrowHelper;
};

Vector3.add = function(vector1, vector2, color) {
    var vector = {
        x: vector1.vector.x + vector2.vector.x,
        y: vector1.vector.y + vector2.vector.y,
        z: vector1.vector.z + vector2.vector.z
    };


    return new Vector3(vector, color, {x: 0, y: 0, z: 0});
};

Vector3.sub = function(vector1, vector2, color) {
    var vector = {
        x: vector1.vector.x - vector2.vector.x,
        y: vector1.vector.y - vector2.vector.y,
        z: vector1.vector.z - vector2.vector.z
    };

    return new Vector3(vector, color, {x: 0, y: 0, z: 0});

};

Vector3.cross = function(vector1, vector2, color) {
    var a1 = vector1.vector.x, a2 = vector1.vector.y, a3 = vector1.vector.z;
    var b1 = vector2.vector.x, b2 = vector2.vector.y, b3 = vector2.vector.z;
    var vector = {
        x: a2 * b3 - a3 * b2,
        y: a3 * b1 - a1 * b3,
        z: a1 * b2 - a2 * b1
    };

    return new Vector3(vector, color, {x: 0, y: 0, z: 0});
};
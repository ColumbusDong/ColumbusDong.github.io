var Vector3 = function(vector, color, start, id) {
    this.vector = vector;
    this.color = color;
    this.start = start;

    this.id = id;

    var to = new THREE.Vector3(vector.x, vector.y, vector.z);
    var from = new THREE.Vector3(start.x, start.y, start.z);
    var direction = to.clone().sub(from);
    var length = direction.length();
    var arrowHelper = new THREE.ArrowHelper(direction.normalize(), from, length, color);
    this.arrow = arrowHelper;
}


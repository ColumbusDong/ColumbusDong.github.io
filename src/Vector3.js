var Vector3 = function(vector, color, start, id) {
    this.vector = vector;
    this.color = color || 0x0;
    this.start = start || {x: 0, y: 0, z: 0};

    this.id = id;


    var from = new THREE.Vector3(start.x, start.y, start.z);
    this.direction = new THREE.Vector3(vector.x, vector.y, vector.z);
    var length = this.direction.length();
    var arrowHelper = new THREE.ArrowHelper(this.direction.clone().normalize(), from, length, this.color);
    this.arrow = arrowHelper;
    this.angles = [];



};

Vector3.prototype.magnitude = function() {
    return Math.sqrt(this.vector.x * this.vector.x + this.vector.y * this.vector.y + this.vector.z * this.vector.z);
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

    return new Vector3(vector, color, vector2.vector);
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

Vector3.dot = function(vector1, vector2) {
    return vector1.vector.x * vector2.vector.x +
            vector1.vector.y * vector2.vector.y +
            vector1.vector.z * vector2.vector.z;
};

Vector3.angleBetween = function(vector1, vector2) {
    //A . B = |A||B|cos t, t = acosA.B/|A||B|
    return Math.acos(Vector3.dot(vector1, vector2) / (vector1.magnitude() * vector2.magnitude()));
};

Vector3.getAngleCurve = function(vector1, vector2) {
    var vector1 = vector1.direction.clone();
    var vector2 = vector2.direction.clone();
    var greatCircleFunction = function(P, Q) {
        var angle = P.angleTo(Q);
        return function(t)
        {
            var X = new THREE.Vector3().addVectors(
                P.clone().multiplyScalar(Math.sin( (1 - t) * angle )),
                Q.clone().multiplyScalar(Math.sin(      t  * angle )))
                .divideScalar( Math.sin(angle) );
            return X;
        };
    }

    var createSphereArc = function(P,Q) {
        var sphereArc = new THREE.Curve();
        sphereArc.getPoint = greatCircleFunction(P,Q);
        return sphereArc;
    }

    var radius = Math.min(vector1.length(), vector2.length()) * 0.75;


    return createSphereArc(vector1.normalize().multiplyScalar(radius),
        vector2.normalize().multiplyScalar(radius));
}
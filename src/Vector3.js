/**
 * Constructor for a 3d vector
 * @param vector Vector formatted as object {x: xValue, y: yValue, z; zValue}
 * @param color Color as hex number
 * @param start  Starting point formatted as object like vector
 * @param id the (hopefully) unique ID
 * @constructor
 */
var Vector3 = function(vector, color, start, id) {
    this.vector = vector;
    this.color = color || 0x0;
    this.start = (typeof start === "undefinde") ? {x: 0, y: 0, z: 0} : start;

    this.id = id;


    var from = new THREE.Vector3(start.x, start.y, start.z);
    this.direction = new THREE.Vector3(vector.x, vector.y, vector.z);
    var length = this.direction.length();
    var arrowHelper = new THREE.ArrowHelper(this.direction.clone().normalize(), from, length, this.color);
    this.arrow = arrowHelper;
    this.angles = [];


};

/**
 * Set values of vector
 * @param newVector the new direction vector
 * @param newColor the new color
 * @param newStart the new start
 */
Vector3.prototype.set = function(newVector, newColor, newStart) {
    this.vector = newVector;
    this.color = newColor || this.color;
    this.start = (typeof newStart === "undefined") ? this.start : newStart;

    this.direction = new THREE.Vector3(this.vector.x, this.vector.y, this.vector.z);
    var length = this.direction.length();
    this.arrow.setDirection(this.direction.clone().normalize());

    this.arrow.setLength(length);
    this.arrow.position.set(this.start.x, this.start.y, this.start.z);



};

/**
 * Sets the directional vector
 * @param newVector
 */
Vector3.prototype.setVector = function(newVector) {
    this.set(newVector, this.color, this.start);
};

/**
 * Sets color
 * @param newColor
 */
Vector3.prototype.setColor = function(newColor) {
    this.set(this.vector, newColor, this.start);
}

/**
 * Sets the starting position
 * @param newStart
 */
Vector3.prototype.setStart = function(newStart) {
    this.set(this.vector, this.color, newStart);
}

/**
 * Calculates the magnitude of the vector
 * @returns {number} magnitude
 */
Vector3.prototype.magnitude = function() {
    return Math.sqrt(this.vector.x * this.vector.x + this.vector.y * this.vector.y + this.vector.z * this.vector.z);
};

/**
 * Static method to add two vectors, starting at the origin
 * @param vector1
 * @param vector2
 * @param color The color of the new vector
 * @returns {Vector3} The resultant vector
 */
Vector3.add = function(vector1, vector2, color) {
    var vector = {
        x: vector1.vector.x + vector2.vector.x,
        y: vector1.vector.y + vector2.vector.y,
        z: vector1.vector.z + vector2.vector.z
    };


    return new Vector3(vector, color, {x: 0, y: 0, z: 0});
};

/**
 * Static method to subtract two vectors, starting at the end of the first vector
 * @param vector1
 * @param vector2
 * @param color The color of the new vector
 * @returns {Vector3} The resultant vector
 */
Vector3.sub = function(vector1, vector2, color) {
    var vector = {
        x: vector1.vector.x - vector2.vector.x,
        y: vector1.vector.y - vector2.vector.y,
        z: vector1.vector.z - vector2.vector.z
    };

    return new Vector3(vector, color, vector2.vector);
};


/**
 * Calculates the cross product
 * @param vector1
 * @param vector2
 * @param color
 * @returns {Vector3} The cross product
 */
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

/**
 * Calculates the dot(scalar) product
 * @param vector1
 * @param vector2
 * @returns {number}
 */
Vector3.dot = function(vector1, vector2) {
    return vector1.vector.x * vector2.vector.x +
            vector1.vector.y * vector2.vector.y +
            vector1.vector.z * vector2.vector.z;
};

/**
 * Finds the angle between two vectors
 * @param vector1
 * @param vector2
 * @returns {number} The angle in degrees
 */
Vector3.angleBetween = function(vector1, vector2) {
    //A . B = |A||B|cos t, t = acosA.B/|A||B|
    return Math.acos(Vector3.dot(vector1, vector2) / (vector1.magnitude() * vector2.magnitude())) * 180 / Math.PI;
};

/**
 * Calculates the scalar multiple of a vector
 * @param vector
 * @param scalar The amount to scale it by
 * @param color The new color
 * @returns {Vector3}
 */
Vector3.multiply = function(vector, scalar, color) {
    var color = (typeof color === "undefined") ? 0x0 : color;
    return new Vector3({
        x: vector.x * scalar,
        y: vector.y * scalar,
        z: vector.z * scalar
    }, color, this.start);
}


/**
 * Gets the curve of the angle between two vectors for use with THREE
 * @param vector1
 * @param vector2
 */
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
};

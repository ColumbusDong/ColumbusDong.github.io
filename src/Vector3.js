var Vector3 = function(x, y, z, color, id) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.color = color;
    this.id = id;

    this.THREEVector = new THREE.Vector3(x, y, z);
};


var VectorList = function() {
    this.list = [];
    this.count = 0;
};

VectorList.prototype.add = function(x, y, z, color) {
    color = color || 0x0;

    var vector = new Vector3(x, y, z, color, count);
    this.list.push(vector);
    this.count++;
};

VectorList.prototype.remove = function(id) {
  for(var i = 0; i < this.list.length; i++) {
      if(this.list[i].id === id) {
          this.list.splice(i, 1);
          return true;
      }
  }

  return false;
};



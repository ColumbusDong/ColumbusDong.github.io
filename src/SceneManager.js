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
    color = color || 0x0;
    start = start || {
            x: 0,
            y: 0,
            z: 0
        };



    var vector = new Vector3(direction, color, start, this.count);
    this.scene.add(vector.arrow);
    this.list.push(vector);
    this.count++;
};

SceneManager.prototype.remove = function(id) {
    for(var i = 0; i < this.list.length; i++) {
        if(this.list[i].id === id) {
            var vector = this.list.splice(i, 1)[0];
            this.scene.remove(vector.arrow);
            return true;
        }
    }

    return false;
};




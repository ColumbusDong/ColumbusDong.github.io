
var sceneManager = new SceneManager(10, 10);
var req = 0;
document.getElementById("addA").onclick = function() {
    cancelAnimationFrame(req);

    sceneManager.scene.children = [];
    sceneManager.list = [];

    sceneManager.drawGrid(10, 10);
    sceneManager.count = 0;


    var xFunction = new Equation(document.getElementById("xt").value).compile("t");
    var yFunction = new Equation(document.getElementById("yt").value).compile("t");
    var zFunction = new Equation(document.getElementById("zt").value).compile("t");

    function fn(t) {
        return {
            x: xFunction(t),
            y: zFunction(t),
            z: yFunction(t)
        };
    }



    var minT = new Equation(document.getElementById("minT").value).evaluate();
    var maxT = new Equation(document.getElementById("maxT").value).evaluate();
    var tStep = new Equation(document.getElementById("tStep").value).evaluate();
    var firstIteration = true;
    var t = minT;
    var lastValues = fn(t);
    sceneManager.add(lastValues);

    sceneManager.render = function () {

        req = requestAnimationFrame(this.render.bind(this));

        t += tStep;

        if(t > maxT + tStep) {
            t = minT;
            var values = fn(t);
            firstIteration = false;

        } else {
            var values = fn(t);

            if (firstIteration) {

                var lineGeometry = new THREE.Geometry();
                lineGeometry.vertices.push(new THREE.Vector3(lastValues.x, lastValues.y, lastValues.z));
                lineGeometry.vertices.push(new THREE.Vector3(values.x, values.y, values.z));
                var material = new THREE.LineBasicMaterial({
                    color: 0x0000ff
                });
                var line = new THREE.Line(lineGeometry, material);
                line.name = "function";
                sceneManager.scene.add(line);
            }
            sceneManager.set("a", values);

        }
        lastValues = values;


        this.renderer.render(this.scene, this.camera);
    }

    sceneManager.render();

}
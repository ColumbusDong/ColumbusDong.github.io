
var sceneManager = new SceneManager();
        sceneManager.add({
            x: 2,
            y: 2,
            z: 2
        }, 'red');



        /*
        var xFunction = new Equation("sin(t)*(exp(cos(t))-2*cos(4t)-sin(t/12)^5)").compile("t");
        var yFunction = new Equation("cos(t)*(exp(cos(t))-2*cos(4t)-sin(t/12)^5)").compile("t");
        var zFunction = new Equation("0").compile("t");
        */

        var xFunction = new Equation("1.5cos(t)-cos(30t)").compile("t");
        var yFunction = new Equation("1.5sin(t)-sin(30t)").compile("t");
        var zFunction = new Equation("sin(t)cos(t)").compile("t");
        function fn(t) {
            return {
                x: xFunction(t),
                y: zFunction(t),
                z: yFunction(t)
            };
        }
        var minT = 0;
        var maxT = 6 * Math.PI;
        var firstIteration = true;
        t = minT;
        var lastValues = fn(t);
        var step = 0.01;
        sceneManager.render = function () {

            requestAnimationFrame(this.render.bind(this));

            t += step;

            if(t > maxT + 0.05) {
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

                    sceneManager.scene.add(line);
                }
                sceneManager.set(0, values);

            }
            lastValues = values;


            this.renderer.render(this.scene, this.camera);
        }

        sceneManager.render();

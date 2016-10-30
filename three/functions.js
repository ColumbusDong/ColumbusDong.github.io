//Makes Cylinder given Radius, Height, and Color
function makeCylinder(rad, height, col)
{
    var geometry = new THREE.CylinderGeometry(rad, rad, height, 360);
    var material = new THREE.MeshBasicMaterial({color: col});
    var axes = new THREE.Mesh(geometry, material);

    return(axes);
}

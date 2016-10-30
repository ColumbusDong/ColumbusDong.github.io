//Makes Cylinder given Radius, Height, and Color
function makeCylinder(rad, height, col)
{
    var geometry = new THREE.CylinderGeometry(rad, rad, height, 360);
    var material = new THREE.MeshBasicMaterial({color: col});
    var axes = new THREE.Mesh(geometry, material);

    return(axes);
}

//Credit to Lee Stemkoshi
function makeTextSprite( message, parameters )
{
	if ( parameters === undefined ) parameters = {};

	var fontface = parameters["fontface"] || "Helvetica";
	var fontsize = parameters["fontsize"] || 20;
  var scaleSize = parameters["scale"] || 20;
	var canvas = document.createElement('canvas');
	var context = canvas.getContext('2d');
	context.font = fontsize + "px " + fontface;

	// get size data (height depends only on font size)
	var metrics = context.measureText( message );
	var textWidth = metrics.width;


	// text color
	context.fillStyle = "rgba(0, 0, 0, 1.0)";
	context.fillText( message, 0, fontsize);

	// canvas contents will be used for a texture
	var texture = new THREE.Texture(canvas)
			texture.minFilter = THREE.LinearFilter;
			texture.needsUpdate = true;

	var spriteMaterial = new THREE.SpriteMaterial({ map: texture, useScreenCoordinates: false});
	var sprite = new THREE.Sprite( spriteMaterial );
	sprite.scale.set(scaleSize, scaleSize, scaleSize);
	return sprite;
}

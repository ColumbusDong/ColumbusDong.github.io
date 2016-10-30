/** Semi-global variable for component/angle */
var isComponent = false;
/** Semi-global variable for degree/rad */
var isDegree = true;
// define scene manager
sceneManager = new SceneManager();

/**
 * Prints the given string to the calculator console
 * @param str to print
 */
function linePrint( str ) {
	// TODO implement
	console.log( str + "\n" );
}

/**
 * Creates a new vector from component form and adds it to the sceneManager.
 */
function newComponent() {
	var newX = parseFloat( document.getElementById("xC").value, 10 );
	var newY = parseFloat( document.getElementById("yC").value, 10 );
	var newZ = parseFloat( document.getElementById("zC").value, 10 );
	if ( newX != newX  || newY != newY || newZ != newZ ) {
		linePrint( "Please enter valid numbers for x, y, and z");
		//linePrint( "x: " + newX + ", y: " + newY + ", z:" + newZ);
		return;
	}
	var newVector = new Vector3( {x:newX, y:newY, z:newZ} );
	sceneManager.add( newVector );
	linePrint( "v" + (sceneManager.count - 1) + " = <" + newX + ", " + newY + ", " + newZ + ">");
	refresh();
}

/**
 * Creates a new vector from angle form and adds it to the sceneManager.
 */
function newAngle() {
	var newR = parseFloat( document.getElementById("rA").value, 10 );
	var newT = parseFloat( document.getElementById("tA").value, 10 );// * Math.PI / 180;
	var newP = parseFloat( document.getElementById("pA").value, 10 );// * Math.PI / 180;
	if ( isDegree ) {
		newT *= Math.PI / 180.0
		newP *= Math.PI / 180.0
	}
	var newX = parseFloat((newR * Math.cos(newT) * Math.cos(newP)).toFixed(6));
	var newY = parseFloat((newR * Math.sin(newT)).toFixed(6));
	var newZ = parseFloat((newR * Math.cos(newT) * Math.sin(newP)).toFixed(6));
	if ( newX < .000001 )
		newX = 0;
	if ( newY < .000001 )
		newY = 0;
	if ( newZ < .000001 )
		newZ = 0;
	if ( newX != newX  || newY != newY || newZ != newZ ) {
		linePrint( "Please enter valid numbers for r, θ, and ø.");
		return;
	}
	var newVector = new Vector3( {x:newX, y:newY, z:newZ} );
	sceneManager.add( newVector );
	linePrint( "v" + (sceneManager.count - 1) + " = <" + newX + ", " + newY + ", " + newZ + ">");
	refresh();
}

/**
 * Removes the given key from the sceneManager
 */
function remove() {
	var removeID = parseInt( document.getElementById("???????") );
	if ( removeID != removeID ) {
		linePrint( "Please enter a valid vector number to remove." );
		return;
	}
	sceneManager.remove( removeID );
	refresh();
}

/**
 * Checks the highlighted vectors. If there are not exactly two of them,
 * prints an error message to the console. Otherwise, adds them, produces
 * a new vector, and adds it to the scene, broadcasting that it has done so.
 */
function add() {
	// First: check current highlighted items
	var totalList = sceneManager.list;
	var hlList = getHighlighted( totalList );
	if ( hlList.length() != 2 ) {
		linePrint( "Select two vectors at once to add them." );
		return;
	}
	// if correct number of things are highlighted, do operation.
	var newVector = Vector3.add( hlList[0], hlList[1], 0x000000 );
	sceneManager.add( newVector );
	linePrint( "v" + hlList[0].id + " + v" + hlList[1].id + " = v" + newVector.id );
	refresh();
	return;
}

/**
 * Checks the highlighted vectors. If there are not exactly two of them,
 * prints an error message to the console. Otherwise, subtracts them, produces
 * a new vector, and adds it to the scene, broadcasting that it has done so.
 */
function subtract() {
	// First: check current highlighted items
	var totalList = sceneManager.list;
	var hlList = getHighlighted( totalList );
	if ( hlList.length() != 2 ) {
		linePrint( "Select two vectors at once to subtract them." );
		return;
	}
	// if correct number of things are highlighted, do operation.
	var newVector = Vector3.sub( hlList[0], hlList[1], 0x000000 );
	sceneManager.add( newVector );
	linePrint( "v" + hlList[0].id + " - v" + hlList[1].id + " = v" + newVector.id );
	refresh();
	return;
}

/**
 * Checks the highlighted vectors. If there are not exactly two of them,
 * prints an error message to the console. Otherwise, takes their cross product, produces
 * a new vector, and adds it to the scene, broadcasting that it has done so.
 */
function cross() {
	// First: check current highlighted items
	var totalList = sceneManager.list;
	var hlList = getHighlighted( totalList );
	if ( hlList.length() != 2 ) {
		linePrint( "Select two vectors at once to take their cross product." );
		return;
	}
	// if correct number of things are highlighted, do operation.
	var newVector = Vector3.cross( hlList[0], hlList[1], 0x000000 );
	sceneManager.add( newVector );
	linePrint( "The cross product of v" + hlList[0].id + " and v" + hlList[1].id + " = v" + newVector.id );
	refresh();
	return;
}

/**
 * Checks the highlighted vectors. If there are not exactly two of them,
 * prints an error message to the console. Otherwise, takes the angle between
 * them and broadcasts it.
 */
function angle() {
	// First: check current highlighted items
	var totalList = sceneManager.list;
	var hlList = getHighlighted( totalList );
	if ( hlList.length() != 2 ) {
		linePrint( "Select two vectors at once to find the angle between them." );
		return;
	}
	// if correct number of things are highlighted, do operation.
	var newAngle = Vector3.angleBetween( hlList[0], hlList[1] );
	sceneManager.drawAngle( hlList[0], hlList[1] );
	linePrint( "The angle between v" + hlList[0].id + " and v" + hlList[1].id + " is " + newAngle + "°" );
	refresh();
	return;
}

/**
 * Checks the highlighted vectors. If there are not exactly two of them,
 * prints an error message to the console. Otherwise, takes the dot product
 * and broadcasts it.
 */
function dot() {
	// First: check current highlighted items
	var totalList = sceneManager.list;
	var hlList = getHighlighted( totalList );
	if ( hlList.length() != 2 ) {
		linePrint( "Select two vectors at once to find their dot product." );
		return;
	}
	// if correct number of things are highlighted, do operation.
	var newProduct = Vector3.dot( hlList[0], hlList[1] );
	linePrint( "v" + hlList[0].id + " . v" + hlList[1].id + " = " + newProduct );
	refresh();
	return;
}

/**
 * Checks the highlighted vectors. If there is not exactly one of them,
 * prints an error message to the console. Otherwise, takes the magnitude
 * and broadcasts it.
 */
function magnitude() {
	// First: check current highlighted items
	var totalList = sceneManager.list;
	var hlList = getHighlighted( totalList );
	if ( hlList.length() != 1 ) {
		linePrint( "Select one vector at once to find its magnitude." );
		return;
	}
	// if correct number of things are highlighted, do operation.
	var newMag = hlList[0].magnitude();
	linePrint( "|v" + newMag + "| = " + newProduct );
	refresh();
	return;
}

/**
 * Checks the highlighted vectors. If there is not exactly one of them,
 * prints an error message to the console. Otherwise, takes the multiple
 * of this vector with the given scalar and broadcasts it.
 */
function multiply() {
	// First: check current highlighted items
	var totalList = sceneManager.list;
	var hlList = getHighlighted( totalList );
	if ( hlList.length() != 1 ) {
		linePrint( "Select one vector at once to find its multiple with a scalar." );
		return;
	}
	// Second: check scalar
	var multNum = parseFloat( document.getElementById("scalar1").value, 10 );
	if ( multNum != multNum ) {
		linePrint( "Please enter a valid number as a scalar to multiply by." );
		return;
	}
	// Finally: do operation
	var newVector = Vector3D.multiply( hlList[0], multNum );
	sceneManager.add( newVector );
	linePrint( "v" + hlList[0].id + " * " + multNum + " = v" + newVector.id );
	refresh();
	return;
}

/**
 * Checks the highlighted vectors. If there is not exactly one of them,
 * prints an error message to the console. Otherwise, takes the quotient
 * of this vector with the given scalar and broadcasts it.
 */
function divide() {
	// First: check current highlighted items
	var totalList = sceneManager.list;
	var hlList = getHighlighted( totalList );
	if ( hlList.length() != 1 ) {
		linePrint( "Select one vector at once to find its quotient with a scalar." );
		return;
	}
	// Second: check scalar
	var multNum = parseFloat( document.getElementById("scalar2").value, 10 );
	if ( multNum != multNum ) {
		linePrint( "Please enter a valid number as a scalar to divide by." );
		return;
	}
	else if ( multNum == 0 ) {
		linePrint ( "Cannot divide by 0. Try again. " );
		return;
	}
	// Finally: do operation
	var newVector = Vector3D.multiply( hlList[0], 1 / multNum );
	sceneManager.add( newVector );
	linePrint( "v" + hlList[0].id + " / " + multNum + " = v" + newVector.id );
	refresh();
	return;
}

/**
 * Sets the display to print vectors in component form.
 */
function setComponent() {
	isComponent = true;
	refresh();
}

/**
 * Sets the display to print vectors in angle form.
 */
function setAngle() {
	isComponent = false;
	refresh();
}

/**
 * Sets the program to manipulate angles in degrees
 */
function setDegrees() {
	isDegree = true;
	refresh();
}

/**
 * Sets the display to manipulate angles in radians
 */
function setRadian() {
	isDegree = false;
	refresh();
}
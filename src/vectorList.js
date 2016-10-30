/**
 * Prints a vector in the format:
 * vectorID: <x, y, z>
 * @param vec3 - a Vector3D object
 * @returns a String with the desired output
 */
function printComponentVector( vec3 ) {
	var outString = "v" + vec3.id + ": <" + vec3.x + ", " + vec3.y + ", " + vec3.z + ">";
	return outString;
}

/**
 * Prints a vector in the format:
 * vectorID: r=[magnitude], θ=[verticalAngle], ø=[rotationalAngle]
 * @param vec3 - a Vector3D object
 * @returns a String with the desired output
 */
function printAngleVector( vec3 ) {
	var outString = "v" + vec3.id + ": ";
	// first, compute magnitude
	var r = Math.sqrt( vec3.x * vec3.x + vec3.y * vec3.y + vec3.z * vec3.z );
	if ( r == 0 ) { // if magnitude is 0, return 0
		return outString + "r=0";
	}
	
	// next, compute vertical angle
	var vertAngle = Math.asin( vec3.y / r ) * 180 / Math.PI;
	if ( vec3.x < 0 ) {
		vertAngle = 180 - vertAngle;
	}
	// finally, compute rotational angle
	var horizAngle;
	if ( vec3.x == 0 ) { // if we can't do that...
		if ( vec3.z > 0 ) {
			horizAngle = 90;
		}
		else if ( vec3.z < 0 ) {
			horizAngle = -90;
		}
		else {
			return outString + "r=" + r + ", θ=" + vertAngle + "°";
		}
	}
	else {
		horizAngle = Math.atan2( vec3.z, vec3.x ) * 180 / Math.PI;
	}
	if ( vec3.x < 0 ) {
		horizAngle = 180 - horizAngle;
	}
	else if ( vec3.z < 0 ) {
		horizAngle = 360 + horizAngle;
	}
	return outString + "r=" + r + "θ=" + vertAngle + "°, ø=" + horizAngle + "°";
}

/**
 * Given the list of all vectors in the system, returns those that are highlighted currently.
 * @param vecList - list of all current vectors
 * @returns a list containing those vectors that have been highlighted
 */
function getHighlighted( vecList ) {
	// First, find all selected options
	var selectedOpts = [];
	var options = vecOpt && vecOpt.options;
	var opt;
	for (var i=0, iLen=options.length; i<iLen; i++) {
		opt = options[i];
	if (opt.selected) {
		selectedOpts.push(opt.value);
	    }
	}
	// Second, match them to vecList
	var selectedVecs = [];
	for ( var i = 0; i < selectedOpts.length(); i++ ) {
		selectedVecs.append( vecList.get( selectedOps[ i ].value ) );
	}
}

/**
 * Looks at the vector option menu to find which vectors are highlighted, cross-references them
 * with the vecList, and then for each vector that matches, highlights it, and for each vector
 * that doesn't match, don't highlight it.
 * Highlighting, here, is defined as bolding the arrow - increasing its width.
 * @param vecList - a list/array of all the Vector3D 
 * @returns nothing
 */
function refreshHighlights( vecList ) {
	var vecOpt = document.getElementById("vectorOption");
	// populate all selected options list
	var highlightedVecs = getHighlighted( vecList );
	for ( var i in vecList.list ) {
		var cur = i.arrow;
		if ( highlightedVecs.contains( cur ) ) {
			cur.setLength( cur.length, cur.length, cur.length * 0.2);
		}
		else {
			cur.setLength( cur.length, cur.length * 0.2, cur.length * 0.04);
		}
	}
}

/**
 * Refreshes the option list, given a list of vectors
 * @param vecList - a list/array of Vector3D objects
 * @param inComponent - boolean. True if vectors are to be listed in component form,
 * 						false if they should be listed in angle form
 */
function refreshOptionList( vecList, inComponent ) {
	var vecOpt = document.getElementById("vectorOption");
	// <select id="vectorOption" size="7" multiple> ... </select>
	while( vecOpt.length > 0 )
		vecOpt.remove(0);
	for( var i in vecList ) {
		var newString;
		if ( inComponent == true ) {
			newString = printComponentVector( i );
		}
		else {
			newString = printAngleVector( i );
		}
		var x = document.createElement( "OPTION" );
		x.setAttribute("value","newString");
		var t = document.createTextNode( newString );
		c.appendChild( t );
		vecOpt.add( x );
	}
}

/**
 * Calls both refresh methods. 
 */
function refresh() {
	// TODO
}
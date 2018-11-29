// coord = cordinates of starting marker
// newCoord = cordinates of ending marker
// len = length of side of quad
// values = array of values
// colors = colors of archs
// attributes = options that the stack covers

function Stack(coord, newCoord, values, len, colors, attributes, group)
{
    var ratio = 2; // archstack appears to be half the size of the column

    this.type = "Stack";
    var extrudeSettings = { depth: len/100, bevelEnabled: false, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 0.25 };
    var x = coord[0];
    var y = coord[1];
    var z = coord[2];
    var nX = newCoord[0];
    var nY = newCoord[1];
    var nZ = newCoord[2];

    var totalValue = 0;
    for( var v=0; v<values.length; v++)
    {
        values[v] = values[v] * ratio * CHART_RATIO;
        totalValue+=values[v];
    }

    if ( totalValue >= 0 )
    {
        var tempTopValue = ( STEAM ) ? totalValue/2 : totalValue;

        // drawing archs
        for( var v=0; v<values.length; v++)
            if( values[v] > 0 )
                addArch(values[v],colors[v]);
    }
    else
    {
        console.error("Total tally cannot be negative");
    }

    // addArch( value of arch, color of arch )
    function addArch(value, color)
    {
        // value = LEN / value;
        var top = tempTopValue;
        var down = top-value;
        tempTopValue-= value;
        var dist = Math.sqrt(Math.pow((nX-x),2)+Math.pow((nZ-z),2));
        var theta = (z > nZ) ? Math.acos(len/dist) : Math.acos(len/dist) * -1;

        // draw arch
        // quadraticCurveTo(cpX,cpY,X,Y):
        //      (cpX,cpY) = vertex position
        //		(X,Y)	  = end position
        var arch = new THREE.Shape();

        if( ARCH )
        {
            arch.moveTo( 0 , 0 );
            arch.quadraticCurveTo(dist/2,top,dist,0);
            arch.quadraticCurveTo(dist/2,down,0,0);
        }
        else
        {
            arch.moveTo(0,down/2)
            arch.lineTo(0,top/2);
            arch.lineTo(dist,top/2);
            arch.lineTo(dist,down/2);
            arch.lineTo(0,down/2);
        }
        addShape( arch, extrudeSettings, color, x, 0, z, 0, theta, 0, 1 );
    }

    // addShape( shape, color, x, y, z, rx, ry,rz, s );
    function addShape( shape, extrudeSettings, color, x, y, z, rx, ry, rz, s )
    {
        var geometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );
        var material = new THREE.MeshStandardMaterial( { color: color } );
        var arch = new THREE.Mesh( geometry, material );

        arch.position.set( x, y, z );
        arch.rotation.set( rx, ry, rz );
        arch.scale.set( s, s, s );
        arch.material.transparent = true;
        arch.attributes = attributes;
        arch.name = "arch";
        group.add( arch );
    }
}
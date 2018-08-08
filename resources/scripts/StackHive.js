// coord = cordinates of starting marker
// newCoord = cordinates of ending marker
// len = length of side of quad
// values = array of values
// colors = colors of archs
// attributes = options that the stack covers

function StackHive(coord, newCoord, values, len, colors, attributes, group, fromField, separation)
{
    var ratio = 2; // archstack appears to be half the size of the column

    this.type = "Stack";
    var extrudeSettings = { depth: len/100, bevelEnabled: false, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 0.25 };
    var x = coord[0] * 1.0;
    var y = coord[1] * 1.0;
    var z = coord[2] * 1.0;
    var nX = newCoord[0] * 1.0;
    var nY = newCoord[1] * 1.0;
    var nZ = newCoord[2] * 1.0;

    var totalValue = 0;
    for( var v=0; v<values.length; v++)
    {
        values[v] = values[v] * ratio;
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

    // addArch( value of arch, color of arch ) // no change
    function addArch(value, color)
    {
        var top = tempTopValue;
        var down = top-value;
        tempTopValue-= value;
        var dist = Math.sqrt(Math.pow((nX-x),2)+Math.pow((nY-y),2)+Math.pow((nZ-z),2));
        
        var rz = 0;
        var ry = ( Math.sin(separation) * Math.sqrt( Math.pow(nX,2) + Math.pow(nZ,2) ) ) / dist;
        
        //cylinder.setRotationFromAxisAngle(new Vector3( 0, y, 0), Math.PI/2);
        console.log(Math.PI/3.177);


        if( ry > Math.PI/-3.177 )
            ry = Math.asin( ry );
        else
            ry = Math.acos( ry ) + Math.PI/2;

        ry = Math.PI - separation * fromField + ry

        var point1 = new THREE.Vector3(x,y,z);
        var point2 = new THREE.Vector3(nX,nY,nZ);

        //console.log(point1.angleTo(point2));


        // draw arch
        var arch = new THREE.Shape();
        arch.moveTo( 0 , 0 );
        arch.quadraticCurveTo(dist/2,top,dist,0);
        arch.quadraticCurveTo(dist/2,down,0,0);
        addShape( arch, extrudeSettings, color, x, y, z, 0, ry, rz, 1 );
    }

    // addShape( shape, color, x, y, z, rx, ry,rz, s );
    function addShape( shape, extrudeSettings, color, x, y, z, rx, ry, rz, s )
    {
        var geometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );
        var arch = new THREE.Mesh( geometry, new THREE.MeshPhongMaterial( { color: color } ) );
        arch.position.set( x, y, z );
        arch.rotation.set( rx, ry, rz );
        arch.scale.set( s, s, s );
        arch.material.transparent = true;
        arch.attributes = attributes;
        group.add( arch );
    }
}

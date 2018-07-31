// coord = cordinates of starting marker
// newCoord = cordinates of ending marker
// len = length of side of quad
// values = array of values
// colors = colors of archs
// attributes = options that the stack covers

function StackHive(coord, newCoord, values, len, colors, isSteam, attributes, group, fromField, separation)
{
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
        totalValue+=values[v];

    if ( totalValue >= 0 )
    {
        var tempTopValue = ( isSteam ) ? totalValue/2 : totalValue;

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
        var top = tempTopValue;
        var down = top-value;
        tempTopValue-= value;
        var dist = Math.sqrt(Math.pow((nX-x),2)+Math.pow((nZ-z),2));
        
        var theta = ( Math.sin(separation) * Math.sqrt( Math.pow(nX,2) + Math.pow(nZ,2) ) ) / dist;
        

        if( theta * 57.296 > -56.66 )
        //if( (nX>0 & nX>x) | (x>0 & nX<0 & nZ>z) | (z>0 & nZ<0 & nX>x) | (z<0 & nZ<0 & z>nZ) )
            theta = Math.asin( theta ) ;
        else
            theta = Math.acos( theta ) + Math.PI/2;
            
        console.log(theta * 57.296);


        // draw arch
        var arch = new THREE.Shape();
        arch.moveTo( 0 , 0 );
        arch.quadraticCurveTo(dist/2,top,dist,0);
        arch.quadraticCurveTo(dist/2,down,0,0);
        addShape( arch, extrudeSettings, color, x, 0, z, 0, Math.PI - separation*fromField + theta, 0, 1 );
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

// coord = cordinates of starting marker
// newCoord = cordinates of ending marker
// len = length of side of quad
// values = array of values
// colors = colors of archs
// startOption = true if stach is in quad 0 (start field)

function Stack(coord, newCoord, values, len, colors, startOption)
{
    this.type = "Arch";
    var extrudeSettings = { depth: 1, bevelEnabled: false, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 0.25 };
    var x = coord[0] * 1.0;
    var z = coord[1] * 1.0;
    var nX = newCoord[0] * 1.0;
    var nZ = newCoord[1] * 1.0;

    colors = ( startOption != null ) ? [colors[startOption]] : colors;
    //console.log(coord+"---"+newCoord+"---"+values+"---"+len+"---"+colors+"---"+startOption);


    var totalValue = 0;
    for( var v=0; v<values.length; v++)
        totalValue+=values[v];

    if ( totalValue > 0 )
    {
        var tempTopValue = totalValue/2;

        // drawing archs
        for( var v=0; v<values.length; v++)
            addArch(values[v],colors[v]);
    }

    function addArch(value, color)
    {
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
        arch.moveTo( 0 , 0 );
        arch.quadraticCurveTo(dist/2,top,dist,0);
        arch.quadraticCurveTo(dist/2,down,0,0);
        addShape( arch, extrudeSettings, color, x, 0, z, 0, theta, 0, 1 );
    }

    this.getLength = function ()
    {
        return values.length;
    }

}
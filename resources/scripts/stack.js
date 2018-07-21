// (x,z) = position
// values = array of values

function Stack(coord, newCoord, values, len)
{
    this.type = "Arch";
    var extrudeSettings = { depth: 2, bevelEnabled: true, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };
    var colors = [0xff0000,0x00ff00,0x0000ff,0xff00ff,0xffff00,0x00ffff]
    var x = coord[0] * 1.0;
    var z = coord[1] * 1.0;
    var nX = newCoord[0] * 1.0;
    var nZ = newCoord[1] * 1.0;

    var totalValue = 0;
    for( var i=0; i<values.length; i++)
        totalValue+=values[i];

    var tempTopValue = totalValue/2;
    values.sort(function(a, b){return b - a});

    // drawing archs
    for( var i=0; i<values.length; i++)
        addArch(values[i],colors[i]);

    function addArch(value, color)
    {
        var top = tempTopValue;
        var down = top-value;
        tempTopValue-= value;
        var dist = Math.sqrt(Math.pow((nX-x),2)+Math.pow((nZ-z),2));
        var theta = (z > nZ) ? Math.acos(len/dist) : Math.acos(len/dist) * -1;
        //var opp = dist * Math.sin(theta);

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
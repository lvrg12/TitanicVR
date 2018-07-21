// (x,z) = position
// values = array of values

function Stack(coord, newCoord, values, len)
{
    this.type = "Arch";
    var extrudeSettings = { depth: 2, bevelEnabled: true, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };
    var colors = [0xff0000,0x00ff00,0x0000ff,0xff00ff,0xffff00,0x00ffff]
    var x = coord[0];
    var z = coord[1];
    var nX = newCoord[0];
    var nZ = newCoord[1];

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

        // draw arch
        // quadraticCurveTo(cpX,cpY,X,Y):
        //      (cpX,cpY) = vertex position
        //		(X,Y)	  = end position
        var arch = new THREE.Shape();
        arch.moveTo( x , z );
        arch.quadraticCurveTo(len/2+x,top+z,len+x,z);
        arch.quadraticCurveTo(len/2+x,down+z,x,z);
        addShape( arch, extrudeSettings, color, 0, -z, z, 0, 0, 0, 1 );
    }

    this.getLength = function ()
    {
        return values.length;
    }

}
// (x,z) = position of the stack quadrant
// values = array of values

function Stack(x, z, values)
{
    this.type = "Arch";
    var extrudeSettings = { depth: 2, bevelEnabled: true, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };
    var colors = [0xff0000,0x00ff00,0x0000ff,0xff00ff,0xffff00,0x00ffff]

    var totalValue = 0;
    for( var i=0; i<values.length; i++)
        totalValue+=values[i];

    var tempTopValue = totalValue/2;
    values.sort(function(a, b){return b - a});

    for( var i=0; i<values.length; i++)
        addArch(values[i],100,colors[i]);

    function addArch(value, length, color)
    {
        var top = tempTopValue;
        var down = top-value;
        tempTopValue-= value;

        // draw arch
        // quadraticCurveTo(cpX,cpY,X,Y):
        //      (cpX,cpY) = vertex position
        //		(X,Y)	  = end position
        var arch = new THREE.Shape();
        arch.moveTo( x, z );
        arch.quadraticCurveTo(length/2+x,top+z,length+x,x);
        arch.quadraticCurveTo(length/2+x,down+z,x,z);
        addShape( arch, extrudeSettings, color, x, -50, z, 0, 0, 0, 1 );
    }

    this.getLength = function ()
    {
        return this.archs.length;
    }

}
// coord = cordinates of stack column
// len = length of side of quad
// values = array of values
// colors = colors of start field options

function Column( coord, values, len, colors)
{
    console.log("here");
    this.type = "Column";
    var x = coord[0];
    var z = coord[1];

    var totalValue = 0;
    for( var v=0; v<values.length; v++)
        totalValue+=values[v];

    if ( totalValue >= 0 )
    {
        var tempTopValue = totalValue;

        // drawing archs
        for( var v=0; v<values.length; v++)
            addColumn(values[v],colors[v]);
    }
    else
    {
        console.error("Total tally cannot be negative");
    }

    // addColumn( value of column, color of column )
    function addColumn(value, color)
    {
        tempTopValue-= value;

        var geometry = new THREE.CylinderGeometry( 5, 5, value, 32 );
        var cylinder = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial( { color: color } ) );
        cylinder.position.set( x, tempTopValue+value/2, z );
        cylinder.material.transparent = true;
        group.add( cylinder );
    }
}
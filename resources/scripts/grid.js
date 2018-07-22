// columns = array of number of options of all columns
// len = length of quadrandt side

function Grid( columns, len )
{
    this.type = "Grid";
    this.columns = columns.length;

    var material = new THREE.LineBasicMaterial( { color: 0x000000 } );
    var geometry;

    // drawing quadrants
    for( var i=1; i<columns.length; i++)
        addQuad(i);

    // drawing markers
    for( var i=0; i<columns.length; i++)
        for( var j=0; j<columns[i]; j++)
            addMarkers(markerLocation(i,j));

    function addMarkers( coord )
    {
        var x = coord[0];
        var z = coord[1];

        geometry = new THREE.Geometry();
        geometry.vertices.push(new THREE.Vector3( x, 0, z ));
        geometry.vertices.push(new THREE.Vector3( x, 10, z ));
        var marker = new THREE.Line( geometry, material );
        group.add( marker );
    }

    function addQuad( q )
    {
        geometry = new THREE.Geometry();
        geometry.vertices.push(new THREE.Vector3( (q-1) * len, 0, 0 ));
        geometry.vertices.push(new THREE.Vector3( q * len, 0, 0 ));
        geometry.vertices.push(new THREE.Vector3( q * len, 0, len ));
        geometry.vertices.push(new THREE.Vector3( (q-1) * len, 0, len ));
        geometry.vertices.push(new THREE.Vector3( (q-1) * len, 0, 0 ));
        var quad = new THREE.Line( geometry, material );
        group.add( quad );
    }

    function markerLocation(column, option)
    {
        var num_of_options = columns[column];

        if( option > num_of_options-1 || option < 0 )
            console.error("Column " + column + " does not contain option " + option);

        var separation = len / ( num_of_options - 1 );
        var x = column * len;
        var z = option * separation;
        
        return [x,z];
    }

    function getFieldCount()
    {
        return columns.length;
    }

    this.markerLocation = markerLocation;
    this.getFieldCount = getFieldCount;

    

}
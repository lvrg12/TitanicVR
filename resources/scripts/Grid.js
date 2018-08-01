// columns = array of number of options of all columns
// len = length of quadrandt side

function Grid( columns, len, fieldNames, optionNames, group)
{
    this.type = "Grid";
    this.columns = columns.length;

    var material = new THREE.LineBasicMaterial( { color: 0x000000 } );
    var material_text = new THREE.MeshPhongMaterial( { color: 0x000000 } );
    var geometry;

    // drawing quadrants
    for( var i=1; i<columns.length; i++)
        addQuad(i);

    // drawing text
    for( var f=0; f<columns.length; f++)
    {
        addText(fieldNames[f],markerLocation(f,0),true,false);
        for( var j=0; j<columns[f]; j++)
            addText(optionNames[f][j],markerLocation(f,j),false,true);
    }

    function addText( text, coord, isField, isMarkerVisible )
    {
        var xR = 0;
        var x = coord[0];
        if( isField )
        {
            var z = len + len/3.3;
            text = text.toUpperCase();
            xR = -1.5708;
        }
        else
        {
            var z = coord[2];
        }

        var loader = new THREE.FontLoader();

        loader.load( 'resources/fonts/helvetiker_regular.typeface.json', function ( font ) {

            var geometry = new THREE.TextGeometry( text, {
                font: font,
                size: len/20,
                height: 0.5,
                curveSegments: 12,
                bevelEnabled: false,
                bevelThickness: 10,
                bevelSize: 8,
                bevelSegments: 5
            } );

            var textMesh = new THREE.Mesh( geometry, material_text.clone() );
            textMesh.position.set( x, len/-4, z );
            textMesh.rotation.x = xR;
            group.add( textMesh );
        } );


        if( isMarkerVisible )
            addMarker( coord );
    }

    function addMarker( coord )
    {
        var x = coord[0];
        var z = coord[2];

        geometry = new THREE.Geometry();
        geometry.vertices.push(new THREE.Vector3( x, 0, z ));
        geometry.vertices.push(new THREE.Vector3( x, (len/-4) + len/20, z ));
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
        var quad = new THREE.Line( geometry, material.clone() );
        group.add( quad );
    }



    function markerLocation(column, option)
    {
        var num_of_options = columns[column];

        if( option > num_of_options-1 || option < 0 )
            console.error("Column " + column + " does not contain option " + option);

        var separation_line = len / ( num_of_options - 1 );
        var x = column * len;
        var z = option * separation_line;
        
        return [x,0,z];
    }

    function getFieldCount()
    {
        return columns.length;
    }

    this.markerLocation = markerLocation;
    this.getFieldCount = getFieldCount;

    
}

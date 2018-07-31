// columns = array of number of options of all columns
// len = length of quadrandt side

function GridHive( columns, len, fieldNames, optionNames, group)
{
    this.type = "GridHive";
    this.columns = columns.length;
    this.separation = -2*Math.PI/columns.length;

    var material = new THREE.LineBasicMaterial( { color: 0x000000 } );
    var material_text = new THREE.MeshPhongMaterial( { color: 0x000000 } );
    var geometry;

    // drawing quadrants
    for( var i=0; i<columns.length; i++)        
        addQuad( 2*Math.PI/(columns.length), i );

    // drawing text
    for( var f=0; f<columns.length; f++)
    {
        addFieldText(fieldNames[f],f);
        for( var j=0; j<columns[f]; j++)
            addText(optionNames[f][j],markerLocation(f,j),false);
    }

    function addFieldText(text,field)
    {
        text = text.toUpperCase();
        var t = -2 * Math.PI/columns.length * field;
        var x = len/5 + len + len/5;

        addText(text, [ x * Math.cos(t) , 0, x * Math.sin(t) ], true);
    }

    function addText( text, coord, isFieldName )
    {
        var xR = ( isFieldName )? -2*Math.PI/4 : 0;
        var x = coord[0];
        var y = coord[1];
        var z = coord[2];

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


        if( !isFieldName )
            addMarker( coord );
    }

    function addMarker( coord )
    {
        var x = coord[0];
        var y = coord[1];
        var z = coord[2];

        geometry = new THREE.Geometry();
        geometry.vertices.push(new THREE.Vector3( x, 0, z ));
        geometry.vertices.push(new THREE.Vector3( x, (len/-4) + len/20, z ));
        var marker = new THREE.Line( geometry, material );
        group.add( marker );
    }

    function addQuad( angle, q )
    {
        geometry = new THREE.Geometry();
        
        if( q != 1 )
        {
            geometry.vertices.push(new THREE.Vector3( len/5, 0, 0 ));
            geometry.vertices.push(new THREE.Vector3( len+len/5, 0, 0 ));
        }
        else // draw important field line
        {
            geometry.vertices.push(new THREE.Vector3( 0, len/5, 0 ));
            geometry.vertices.push(new THREE.Vector3( 0, len+len/5, 0 ));
        }
        
        var quad = new THREE.Line( geometry, material.clone() );
        quad.rotation.set( 0, q * angle, 0);
        group.add( quad );
    }



    function markerLocation(field, option)
    {
        var num_of_options = columns[field];

        if( option > num_of_options-1 || option < 0 )
            console.error("Field " + field + " does not contain option " + option);
        
        var separation = len / ( num_of_options - 1 );
        var t = -2 * Math.PI/columns.length * field;
        var x = len/5 + option * separation;
        
        if( field != 1 )
            return [ x * Math.cos(t), 0, x * Math.sin(t) ];
        else // return important marker location
            return [ 0, len/5 + option * separation, 0 ];
    }

    function getFieldCount()
    {
        return columns.length;
    }

    this.markerLocation = markerLocation;
    this.getFieldCount = getFieldCount;

}

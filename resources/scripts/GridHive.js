// columns = array of number of options of all columns
// len = length of quadrandt side

function GridHive( columns, len, fieldNames, optionNames, group)
{
    this.type = "GridHive";
    this.columns = columns.length;

    var separation = -2 * Math.PI / (columns.length);
    this.separation = separation;

    var material = new THREE.LineBasicMaterial( { color: 0x000000 } );
    var material_text = new THREE.MeshPhongMaterial( { color: 0x000000 } );
    var geometry;

    // drawing quadrants
    addQuad( 0, true );
    for( var i=0; i<columns.length-1; i++)
        addQuad( i );

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
        var y = 0;
        var t = separation * field ;
        var x = len + 2*len/5;

        addText(text, [ x * Math.cos(t), y, x * Math.sin(t) ], true);
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
            textMesh.position.set( x, len/-4 + y, z );
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

        if(y!=0) return 0;

        geometry = new THREE.Geometry();
        geometry.vertices.push(new THREE.Vector3( x, 0, z ));
        geometry.vertices.push(new THREE.Vector3( x, (len/-4) + len/20, z ));
        var marker = new THREE.Line( geometry, material );
        group.add( marker );
    }

    function addQuad( q )
    {
        var geometry = new THREE.Geometry();

        geometry.vertices.push(new THREE.Vector3( len/5, 0, 0 ));
        geometry.vertices.push(new THREE.Vector3( len+len/5, 0, 0 ));
        
        var quad = new THREE.Line( geometry, material.clone() );
        quad.rotation.set( 0, q * separation, 0);
        group.add( quad );
    }

    function markerLocation(field, option)
    {
        var num_of_options = columns[field];

        if( option > num_of_options-1 || option < 0 )
            console.error("Field " + field + " does not contain option " + option);

        var separation_line = len / ( num_of_options - 1 );
        
        var t = separation *  field ;
        var x = len/5 + option * separation_line;
        
        return [ x * Math.cos(t), 0, x * Math.sin(t) ];
    }

    function getFieldCount()
    {
        return columns.length;
    }

    this.markerLocation = markerLocation;
    this.getFieldCount = getFieldCount;

}

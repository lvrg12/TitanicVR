// columns = array of number of options of all columns
// len = length of quadrandt side

function Grid( columns, len, fieldNames, optionNames, group, firstField, colors)
{
    this.type = "Grid";
    this.columns = columns.length;

    var material = new THREE.LineBasicMaterial( { color: 0x000000 } );
    var material_text = new THREE.MeshPhongMaterial( { color: 0x000000 } );

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

    addLegend( firstField, colors );

    function addText( text, coord, isField, isMarkerVisible )
    {
        var xR = 0;
        var x = coord[0];
        if( isField )
        {
            var z = len + len/5;
            var y = 0;
            text = text.toUpperCase();
            xR = -1.5708;
        }
        else
        {
            var z = coord[2];
            var y = len;
        }

        var loader = new THREE.FontLoader();

        loader.load( 'resources/fonts/helvetiker_regular.typeface.json', function ( font ) {

            var geometry = new THREE.TextGeometry( text, {
                font: font,
                size: len/20,
                height: LEN / 300,
                curveSegments: 12,
                bevelEnabled: false,
                bevelThickness: 10,
                bevelSize: 8,
                bevelSegments: 5
            } );

            var textMesh = new THREE.Mesh( geometry, material_text.clone() );
            textMesh.position.set( x, y, z );
            textMesh.rotation.x = xR;
            textMesh.name = "text";
            group.add( textMesh );
        } );

        if( isMarkerVisible )
            addMarker( coord );
    }

    function addMarker( coord )
    {
        var x = coord[0];
        var z = coord[2];

        var geometry = new THREE.Geometry();
        geometry.vertices.push(new THREE.Vector3( x, 0, z ));
        geometry.vertices.push(new THREE.Vector3( x, len, z ));
        var marker = new THREE.Line( geometry, material );
        marker.name = "marker";
        group.add( marker );
    }

    function addQuad( q )
    {
        var geometry = new THREE.Geometry();
        geometry.vertices.push(new THREE.Vector3( (q-1) * len, 0, 0 ));
        geometry.vertices.push(new THREE.Vector3( q * len, 0, 0 ));
        geometry.vertices.push(new THREE.Vector3( q * len, 0, len ));
        geometry.vertices.push(new THREE.Vector3( (q-1) * len, 0, len ));
        geometry.vertices.push(new THREE.Vector3( (q-1) * len, 0, 0 ));
        var quad = new THREE.Line( geometry, material.clone() );
        quad.name = "quad";
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

    function addLegend( firstField, colors )
    {
        var separation = 0.65;
        var legend = new THREE.Group();

        // word_lengths = []
        // for( var l=0; l<firstField.length; l++ )
        //     word_lengths.append(firstField[l].length*0.05);

        for( var l=0; l<firstField.length; l++ )
            addTextLegend(firstField[l],colors[l],l*separation);

        function addTextLegend( text, color, x )
        {
            var loader = new THREE.FontLoader();
            loader.load( 'resources/fonts/helvetiker_regular.typeface.json', function ( font ) {

                var geometry = new THREE.TextGeometry( text, {
                    font: font,
                    size: len/15,
                    height: LEN / 300,
                    curveSegments: 12,
                    bevelEnabled: false
                } );
    
                var textMesh = new THREE.Mesh( geometry, new THREE.MeshPhongMaterial( { color: color }) );
                textMesh.position.set( x, 0, 0 );
                // textMesh.rotateX( -Math.PI/2);
                legend.add( textMesh );
            } );
        }
        legend.position.set((LEN/2) * (table[0].length-1) - firstField.length * separation / 2, len+len/4 ,0);

        group.add(legend);

    }

    this.markerLocation = markerLocation;
    this.getFieldCount = getFieldCount;

    
}

function Chart(data, filterVar)
{
    this.group = new THREE.Group();

    // Grid

    var grid = new Grid(data.getNumberOfAllOptions(), LEN, data.getAllFields(), data.getAllOptions(), this.group);
    controls.target.set( (LEN/2) * (grid.getFieldCount()-1), 0, LEN/2 );


    // Columns


    for( var op1=0; op1<data.getOptionsOfField(0).length; op1++)
    {
        for( var f=0; f<grid.getFieldCount(); f++)
        {
            for( var op2=0; op2<data.getOptionsOfField(f).length; op2++ )
            {
                var coord = grid.markerLocation(f,op2);
                var values = data.tallyColumn(f,op2);
                var attributes = { "field1": 0, "option1": op1, "field2": f, "option2": op2 }
                new Column(coord,values, LEN, data.getColors(), attributes, this.group);
            }
        }
    }



    // Stacks

    for( var f=0; f<grid.getFieldCount()-1; f++)
    {
        for( var op1=0; op1<data.getOptionsOfField(f).length; op1++ )
        {
            var startCoord = grid.markerLocation(f,op1);
            for( var op2=0; op2<data.getOptionsOfField(f+1).length; op2++ )
            {
                var endCoord = grid.markerLocation(f+1,op2);
                var values = data.tallyStack(f,op1,f+1,op2);
                var attributes = { "field1": f, "option1": op1, "field2": f+1, "option2": op2 };
                // var match = (filterVar != null) && (f == filterVar[0]) && (op1 == filterVar[1]) && (f+1 == filterVar[2]) && (op2 == filterVar[2]);
                // if ( match ) for( var v=0; v<values.length ; v++ ) values[v] = 0;
                new Stack(startCoord,endCoord,values, LEN, data.getColors(), STEAM, attributes, this.group);
            }
        }
    }


    this.addToScene = addToScene;
    this.removeFromScene = removeFromScene;

    function addToScene()
    {
        scene.add( this.group );
    }

    function removeFromScene()
    {
        scene.remove( this.group );
    }

}
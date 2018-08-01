function ChartHive(table, filterVar)
{
    this.data = new ProcessedData(table, filterVar);
    this.group = new THREE.Group();

    var grid;

    // Grid

    var grid;

    if( HIVE )
        grid = new GridHive(this.data.getNumberOfAllOptions(), LEN, this.data.getAllFields(), this.data.getAllOptions(), this.group);
    else
        grid = new Grid(this.data.getNumberOfAllOptions(), LEN, this.data.getAllFields(), this.data.getAllOptions(), this.group);


    // Columns


    // for( var op1=0; op1<this.data.getOptionsOfField(0).length; op1++)
    // {
    //     for( var f=0; f<grid.getFieldCount(); f++)
    //     {
    //         for( var op2=0; op2<this.data.getOptionsOfField(f).length; op2++ )
    //         {
    //             var coord = grid.markerLocation(f,op2);
    //             var values = this.data.tallyColumn(f,op2);
    //             var attributes = { "field1": f, "option1": op2, "field2": null, "option2": null }

    //             if(f!=1)
    //                 new Column(coord,values, LEN, this.data.getColors(), attributes, this.group);
    //         }
    //     }
    // }



    // Stacks

    for( var f=0; f<grid.getFieldCount(); f++ )
    {   
        for( var op1=0; op1<this.data.getOptionsOfField(f).length; op1++ )
        {

            //connect last to first and field 0 to 2
            if( f+1 == grid.getFieldCount() )
                var f2 = 0;
            else
                var f2 = f+1;

            var startCoord = grid.markerLocation(f,op1);
            for( var op2=0; op2<this.data.getOptionsOfField(f2).length; op2++ )
            {
                var endCoord = grid.markerLocation(f2,op2);
                var values = this.data.tallyStack(f,op1,f2,op2);
                var attributes = { "field1": f, "option1": op1, "field2": f2, "option2": op2 };
                new StackHive(startCoord,endCoord,values, LEN, this.data.getColors(), attributes, this.group, f, grid.separation);
            }
        }
    }

    //Function

    function addToScene()
    {
        scene.add( this.group );
    }

    function removeFromScene()
    {
        for (var i = this.group.children.length - 1; i >= 0; i--)
        {
            scene.remove(this.group.children[i]);
            // console.log("children " + i + " removed");
        }
        scene.remove ( this.group );

        this.group = null;
        this.data = null;
    }

    this.addToScene = addToScene;
    this.removeFromScene = removeFromScene;

}

function filterByFirstColumn( intersected )
{
    var intersected_color = intersected.material.color.getHex();
    for( var i=0; i<chart.group.children.length; i++ )
    {
        var children_type = chart.group.children[i].geometry.type;
        if( children_type == "ExtrudeGeometry" || children_type == "CylinderGeometry" )
            if( chart.group.children[i].material.color.getHex() != intersected_color )
                chart.group.children[i].visible = false;
    }

}


function filterByColumn( intersected )
{
    console.log(intersected);
    for( var i=0; i<chart.group.children.length; i++ )
        chart.group.children[i].visible = false;

    var ifield1 = intersected.attributes.field1;
    var ifield2 = intersected.attributes.field2;
    var ioption1 = intersected.attributes.option1;
    var ioption2 = intersected.attributes.option2;

    //console.log([ifield1,ioption1,ifield2,ioption2]);

    chartTmp = new Chart( table, [ifield1,ioption1,ifield2,ioption2] );
    chartTmp.addToScene();
}


function filterByStack( intersected )
{

    for( var i=0; i<chart.group.children.length; i++ )
        chart.group.children[i].visible = false;

    var ifield1 = intersected.attributes.field1;
    var ifield2 = intersected.attributes.field2;
    var ioption1 = intersected.attributes.option1;
    var ioption2 = intersected.attributes.option2;

    console.log([ifield1,ioption1,ifield2,ioption2]);

    chartTmp = new Chart( table, [ifield1,ioption1,ifield2,ioption2] );
    chartTmp.addToScene();

}


function filterReset()
{
    if( chartTmp != null )
    {
        chartTmp.removeFromScene();
        chartTmp = null;
    }
    for( var i=0; i<chart.group.children.length; i++ )
        chart.group.children[i].visible = true;
}
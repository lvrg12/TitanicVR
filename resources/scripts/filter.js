function filter( intersected )
{
    //for( var i=0; i<chart.group.children.length; i++ )
    //    chart.group.children[i].visible = false;

    // var ifield1 = intersected.attributes.field1;
    // var ifield2 = intersected.attributes.field2;
    // var ioption1 = intersected.attributes.option1;
    // var ioption2 = intersected.attributes.option2;

    //intersected.material.color.set("black");

    //chartTmp = new Chart( table, [ifield1,ioption1,ifield2,ioption2] );
    //chartTmp.addToScene();
}


function filterReset()
{
    if( chartTmp != null )
    {
        //chartTmp.removeFromScene();
        chartTmp = null;
    }
    //for( var i=0; i<chart.group.children.length; i++ )
    //    chart.group.children[i].visible = true;

}
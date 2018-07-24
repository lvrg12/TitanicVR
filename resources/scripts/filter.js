function filterByFirstColumn( intersected )
{
    var intersected_color = intersected.material.color.getHex();
    for( var i=0; i<group.children.length; i++ )
    {
        var children_type = group.children[i].geometry.type;
        if( children_type == "ExtrudeGeometry" || children_type == "CylinderGeometry" )
            if( group.children[i].material.color.getHex() != intersected_color )
                group.children[i].material.opacity = 0.05;
    }

}


function filterByColumn( intersected )
{
    var ifield1 = intersected.attributes.field1;
    var ioption1 = intersected.attributes.option1;

    for( var i=0; i<group.children.length; i++ )
    {
        var ctype = group.children[i].geometry.type;
        if( ctype == "ExtrudeGeometry" || ctype == "CylinderGeometry" )
        {
            var cfield1 = group.children[i].attributes.field1;
            var cfield2 = group.children[i].attributes.field2;
            var coption1 = group.children[i].attributes.option1;
            var coption2 = group.children[i].attributes.option2;

            var match = cfield1 == ifield1 && coption1 == ioption1 || cfield2 == ifield1 && coption2 == ioption1;
            
            if( !match )
                group.children[i].material.opacity = 0.05;

        }
    }
}


function filterByStack( intersected )
{
    var ifield1 = intersected.attributes.field1;
    var ifield2 = intersected.attributes.field2;
    var ioption1 = intersected.attributes.option1;
    var ioption2 = intersected.attributes.option2;


    for( var i=0; i<group.children.length; i++ )
    {
        var ctype = group.children[i].geometry.type;
        if( ctype == "ExtrudeGeometry" || ctype == "CylinderGeometry" )
        {
            var cfield1 = group.children[i].attributes.field1;
            var cfield2 = group.children[i].attributes.field2;
            var coption1 = group.children[i].attributes.option1;
            var coption2 = group.children[i].attributes.option2;

            var match = cfield1 == ifield1 && coption1 == ioption1 || cfield2 == ifield2 && coption2 == ioption2;
            
            if( !match )
                group.children[i].material.opacity = 0.05;

        }
    }


}


function filterReset()
{
    for( var i=0; i<group.children.length; i++ )
    {
        var children_type = group.children[i].geometry.type;
        if( children_type == "ExtrudeGeometry" || children_type == "CylinderGeometry" )
                group.children[i].material.opacity = 1.0;
    }
}
// columns = array of number of options of all columns
// len = length of quadrandt side

function ProcessedTable( startFieldName, ignoreFields, table, filterVar )
{
    this.type = "ProcessedTable";

    // removing ignoreFields from table
    for( var i=0; i<ignoreFields.length; i++)
    {
        var index = table[0].indexOf(ignoreFields[i]);
        for( var j=0; j<table.length; j++)
            table[j].splice(index, 1);
    }


    // moving startField to index 0
    if( startField != table[0][0] )
    {
        var index = table[0].indexOf(startFieldName);
        var tmp;
        for( var r=0; r<table.length; r++ )
        {
            tmp = table[r][0];
            table[r][0] = table[r][index];
            table[r][index] = tmp;
        }
    }


    // add boolean filtered
    // if( filterVar != null )
    //     for( var r=0; r<table.length; r++ )
    //         table[r].push(table[r][f] == filterVar[0] && op1 == filterVar[1] && (f+1 == filterVar[2]) && (op2 == filterVar[2]))
    //     {
    //         if( (f == filterVar[0]) && (op1 == filterVar[1]) && (f+1 == filterVar[2]) && (op2 == filterVar[2]) )
    //         tmp = table[r][0];
    //         table[r][0] = table[r][index];
    //         table[r][index] = tmp;
    //     }
    // }


}
// columns = array of number of options of all columns
// len = length of quadrandt side

function ProcessedTable( startFieldName, ignoreFields, table)
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

    return table;

}
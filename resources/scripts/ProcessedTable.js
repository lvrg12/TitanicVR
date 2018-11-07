// columns = array of number of options of all columns
// len = length of quadrandt side

function ProcessedTable( startFieldName, ignoreFields, binFields, table)
{
    this.type = "ProcessedTable";

    // lowering case of feature names
    for(var i=0; i<table[0].length; i++)
        table[0][i] = table[0][i].toLowerCase();


    // removing ignoreFields from table
    for( var i=0; i<ignoreFields.length; i++)
    {
        var index = table[0].indexOf(ignoreFields[i]);
        for( var j=0; j<table.length; j++)
            table[j].splice(index, 1);
    }

    // binning fields
    for( var i=0; i<binFields.length; i++ )
    {
        var index = table[0].indexOf(binFields[i][0]);

        for(var j=0; j<table.length; j++)
        {
            var interval = parseInt( parseInt(table[j][index]) / binFields[i][1] );
            table[j][index] = interval*binFields[i][1]+"-"+(interval+1)*binFields[i][1]-1;
        }
    }

    // moving startField to index 0
    if( startFieldName != table[0][0] )
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

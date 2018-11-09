// columns = array of number of options of all columns
// len = length of quadrandt side

function ProcessedTable( startFieldName, ignoreFields, binFields, table)
{
    this.type = "ProcessedTable";

    // lowering case of feature names
    for(var i=0; i<table[0].length; i++)
        table[0][i] = table[0][i].toLowerCase();


    // // removing ignoreFields from table
    // for( var i=0; i<ignoreFields.length; i++)
    // {
    //     var index = table[0].indexOf(ignoreFields[i]);
    //     for( var j=0; j<table.length; j++)
    //         table[j].splice(index, 1);
    // }

    // binning fields
    if( binFields.length > 0 )
    {
        var min_max = [];
        for( var i=0; i<binFields.length; i++ )
        {
            var index = table[0].indexOf(binFields[i][0]);
            min_max.push( [ parseInt(table[1][index]), parseInt(table[1][index]) ] );

            for(var j=1; j<table.length; j++)
            {
                var num = parseInt(table[j][index]);

                if( num < min_max[i][0] )
                    min_max[i][0] = num;

                if( num > min_max[i][1] )
                    min_max[i][1] = num;
            }
        }


        for( var i=0; i<binFields.length; i++ )
        {
            var index = table[0].indexOf(binFields[i][0]);

            var range = min_max[i][1] - min_max[i][0];

            var interval = [];

            var interval1 = range / 4 + min_max[i][0];
            var interval2 = 2 * (range / 4) + min_max[i][0];
            var interval3 = 3 * (range / 4) + min_max[i][0];

            for( var k=1; k<binFields[i][1]; k++ )
            {
                interval.push( k * (range / binFields[i][1]) + min_max[i][0])
            }

            for(var j=1; j<table.length; j++)
            {
                var num = parseInt(table[j][index]);
                var bin = getInterval(num);
                // var bin = ( num < interval1 ) ? "low" : ( num < interval2 ) ? "medium-low" : ( num < interval3 ) ? "medium-high" : "high";
                table[j][index] = bin;
            }

            function getInterval( num )
            {
                var x = 0;

                while( x < interval.length )
                {
                    if( num < interval[x] )
                        return "interval " + (x+1);
                    
                    x++;
                }
                return "interval " + x;
            }
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

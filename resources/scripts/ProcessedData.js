// columns = array of number of options of all columns
// len = length of quadrandt side

function ProcessedData( table, filterVar )
{
    this.type = "ProcessedData";
    var fieldNames = [];

    // naming fields
    for( var i=0; i<table[0].length; i++)
        fieldNames.push(table[0][i]);

    // intitializing arrays
    var fieldOptions = new Array(table[0].length);
    var fieldOptionCount = new Array(table[0].length);

    // counting options per field
    for( var i=1; i<table.length; i++)
    {
        for( var j=0; j<table[0].length; j++)
        {
            if( !fieldOptions[j] )
            {
                fieldOptions[j] = [ table[i][j] ];
                fieldOptionCount[j] = [ 0 ];
            }
            else
            {
                if( fieldOptions[j].includes( table[i][j] ) )
                {
                    fieldOptionCount[j][fieldOptions[j].indexOf(table[i][j])]++;
                }
                else
                {
                    fieldOptions[j].push( table[i][j] );
                    fieldOptionCount[j].push(0);
                }
            }
        }
    }

    // add boolean filtered
    if( filterVar != null )
    {
        var f1 = filterVar[0];
        var op1 = fieldOptions[f1][filterVar[1]];

        if( filterVar[2] != null )
        {
            var f2 = filterVar[2];
            var op2 = fieldOptions[f2][filterVar[3]];
        }

        for( var r=1; r<table.length; r++ )
            if( filterVar[2] != null )
                table[r].push( table[r][f1] != op1 && table[r][f2] != op2 );
            else
                table[r].push( table[r][f1] != op1 );
    }

    //initializing start options values
    var colors = [0x1f77b4,0xff7f0e,0x2ca02c,0xd62728,0x9467bd,0x8c564b,0xe377c2,0x7f7f7f, 0xbcbd22, 0x17becf];
    var startField = 0;
    colors = colors.slice(0, fieldOptions[startField].length);


    // Methods

    // returns record count
    function getNumberOfRecords()
    {
        return table.length;
    }

    // returns array of count of options per field
    function getNumberOfAllOptions()
    {
        var arr = new Array(fieldOptions.length);

        for( var i=0; i<arr.length; i++ )
            arr[i] = fieldOptions[i].length;

        return arr;
    }

    // returns array of field names
    function getAllFields()
    {
        return fieldNames;
    }

    // returns array of options names
    function getAllOptions()
    {
        return fieldOptions;
    }

    // returns array of options names of given field
    function getOptionsOfField( field )
    {
        return fieldOptions[field];
    }

    // returns array of start options names
    function getOptionsOfStartField()
    {
        return fieldOptions[startField];
    }

    // returns color of given option
    function getColors()
    {
        return colors;
    }

    // returns a tally of records with option1 and option2 of each start option
    function tallyStack(field1,option1,field2,option2)
    {
        var option1Name = fieldOptions[field1][option1];
        var option2Name = fieldOptions[field2][option2];
        var totalValues;

        totalValues = new Array(getOptionsOfStartField().length);
        var current_start_option;
        for( var st=0; st<totalValues.length; st++ )
        {
            totalValues[st] = 0;
            current_start_option = fieldOptions[startField][st];
            for( var i=1; i<table.length; i++ )
                if ( table[i][startField] == current_start_option && table[i][field1] == option1Name && table[i][field2] == option2Name )
                    totalValues[st]++;
        }

        return totalValues;
    }

    // returns a tally of records with start options and given option
    function tallyColumn(field2,option2)
    {
        var option2Name = fieldOptions[field2][option2];
        var totalValues;

        totalValues = new Array(getOptionsOfStartField().length);
        for( var st=0; st<totalValues.length; st++ )
        {
            totalValues[st] = 0;
            current_start_option = fieldOptions[startField][st];
            for( var i=1; i<table.length; i++ )
                if ( table[i][startField] == current_start_option && table[i][field2] == option2Name )
                    if ( !table[i][table[0].length] )
                        totalValues[st]++;
        }

        return totalValues;
    }
    
    this.getNumberOfRecords = getNumberOfRecords;
    this.getNumberOfAllOptions = getNumberOfAllOptions;
    this.getAllFields = getAllFields;
    this.getAllOptions = getAllOptions;
    this.getOptionsOfField = getOptionsOfField;
    this.getOptionsOfStartField = getOptionsOfStartField;
    this.getColors = getColors;
    this.tallyStack = tallyStack;
    this.tallyColumn = tallyColumn;


}
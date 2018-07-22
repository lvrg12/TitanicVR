var container, camera, scene, renderer, controls, group
const LEN = 100;
init();

// Read Input

// var json = loadFile("resources/datasets/titanic_test.csv");
// console.log(json);


var table = [["class","sex","continent","age"]];
var choices = [["A","B","C"]
               ,["male","female"]
               ,["Europe","America"]
               ,["adult","teen","child"]];

var amount = 300;
var record;

for( var n=0; n<amount; n++ )
{ 
    record = [];
    for( var m=0; m<choices.length; m++ )
    {
        record.push(choices[m][Math.floor(Math.random() * choices[m].length)]);
    }
    table.push(record);
}


var startField = "class";
var ignoreFields = [];
var data = new ProcessedData(startField, ignoreFields, table);

// Grid

var grid = new Grid(data.getNumberOfAllOptions(), LEN, data.getAllFields(), data.getAllOptions());


// Stacks

for( var f=0; f<grid.getFieldCount()-1; f++)
{
    for( var op1=0; op1<data.getOptionsOfField(f).length; op1++ )
    {
        var startCoord = grid.markerLocation(f,op1);
        var isStartField = ( f == 0 ) ? op1 : null;

        for( var op2=0; op2<data.getOptionsOfField(f+1).length; op2++ )
        {
            var endCoord = grid.markerLocation(f+1,op2);
            var values = data.tally(op1,f,op2,f+1,isStartField);
            //console.log("f"+ f + "->f" + (f+1) + " ---- " + op1 + " and " + op2 + ": " + values);
            var stack = new Stack(startCoord,endCoord,values, LEN, data.getColors(), isStartField);
        }
    }
}


// Animate

animate();
var container, camera, scene, renderer, controls, group
const STEAM = true;

// Read Input

var table = loadFile("resources/datasets/titanic2.csv");


// var amount = 1500;
// var table = [["class","sex","continent","age"]];
// var choices = [["A","B","C"]
//                ,["male","female"]
//                ,["Europe","America"]
//                ,["adult","child"]];


// var record;

// for( var n=0; n<amount; n++ )
// { 
//     record = [];
//     for( var m=0; m<choices.length; m++ )
//     {
//         record.push(choices[m][Math.floor(Math.random() * choices[m].length)]);
//     }
//     table.push(record);
// }


var startField = "pclass";
var ignoreFields = ["embarked","parch","sibsp"];
//var ignoreFields = ["Name","Age","Siblings/Spouses Aboard", "Parent/Children Aboard", "Fare"];
var data = new ProcessedData(startField, ignoreFields, table);
const LEN = data.getNumberOfRecords()/2;
init();

// Grid

var grid = new Grid(data.getNumberOfAllOptions(), LEN, data.getAllFields(), data.getAllOptions());

controls.target.set( (LEN/2) * (grid.getFieldCount()-1), 0, LEN/2 );


// StackColumns

for( var f=0; f<grid.getFieldCount(); f++ )
{
    for( var op=0; op<data.getOptionsOfField(f).length; op++)
    {
        var coord = grid.markerLocation(f,op);
        var isStartField = ( f == 0 ) ? op : null;
        var values = data.tally(op,0,op,f,isStartField);
        //console.log("f"+f+": " + values);
        //new StackC(coord,values, LEN, data.getColors(), isStartField);
    }

}

// Stacks

for( var op1=0; op1<data.getOptionsOfField(0).length; op1++)
{
    for( var f=0; f<grid.getFieldCount(); f++)
    {
        for( var op2=0; op2<data.getOptionsOfField(f).length; op2++ )
        {
            var coord = grid.markerLocation(f,op2);
            var isStartField = ( f == 0 ) ? op1 : null;
            var values = data.tally(op1,0,op2,f,isStartField);
            //console.log("f=0 op1="+op1+" AND f="+f+" op2="+op2+" -> "+ values);
            //new StackC(startCoord,values, LEN, data.getColors(), isStartField);
        }
    }
}



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
            new Stack(startCoord,endCoord,values, LEN, data.getColors(), isStartField, STEAM);
        }
    }
}


// Animate

animate();
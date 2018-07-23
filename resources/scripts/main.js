var container, camera, scene, renderer, controls, group, raycaster, mouse;
const STEAM = false;
var startField;
var ignoreFields;

// Read Input

var table = loadFile("resources/datasets/titanic2.csv");


// var amount = 1500;
// var table = [["class","sex","continent","age"]];
// var choices = [["A","B","C"]
//                ,["male","female"]
//                ,["Europe","America"]
//                ,["adult","child"]];
// ignoreFields = []


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


startField = "pclass";
ignoreFields = ["embarked","parch","sibsp"];
//ignoreFields = ["Name","Age","Siblings/Spouses Aboard", "Parent/Children Aboard", "Fare"];
var data = new ProcessedData(startField, ignoreFields, table);
const LEN = data.getNumberOfRecords()/2;
init();

// Grid

var grid = new Grid(data.getNumberOfAllOptions(), LEN, data.getAllFields(), data.getAllOptions());

controls.target.set( (LEN/2) * (grid.getFieldCount()-1), 0, LEN/2 );


// Columns

var columns = []

for( var op1=0; op1<data.getOptionsOfField(0).length; op1++)
{
    for( var f=0; f<grid.getFieldCount(); f++)
    {
        for( var op2=0; op2<data.getOptionsOfField(f).length; op2++ )
        {
            var coord = grid.markerLocation(f,op2);
            var values = data.tallyColumn(f,op2);
            columns.push(new Column(coord,values, LEN, data.getColors()));
        }
    }
}



// Stacks

var stacks = []

for( var f=0; f<grid.getFieldCount()-1; f++)
{
    for( var op1=0; op1<data.getOptionsOfField(f).length; op1++ )
    {
        var startCoord = grid.markerLocation(f,op1);

        for( var op2=0; op2<data.getOptionsOfField(f+1).length; op2++ )
        {
            var endCoord = grid.markerLocation(f+1,op2);
            var values = data.tallyStack(f,op1,f+1,op2);
            columns.push(new Stack(startCoord,endCoord,values, LEN, data.getColors(), STEAM));
        }
    }
}


// Animate

animate();
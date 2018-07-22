var container, camera, scene, renderer, controls, group
const LEN = 100;
init();

// Read Input

// var json = loadFile("resources/datasets/titanic_test.csv");
// console.log(json);

var table = [["id","class","sex","continent","age"],
            ["0","A","male","Europe","adult"],
            ["1","B","male","Europe","adult"],
            ["2","C","male","Asia","adult"],
            ["3","C","male","Europe","adult"],
            ["4","B","male","America","adult"],
            ["5","C","male","Europe","teen"],
            ["6","C","male","Asia","adult"],
            ["7","B","male","Europe","adult"],
            ["8","C","male","Europe","adult"],
            ["9","C","male","Europe","adult"],
            ["10","B","male","Europe","adult"],
            ["11","C","male","America","adult"],
            ["12","B","male","Europe","adult"],
            ["13","A","male","Asia","adult"],
            ["14","C","male","Europe","teen"],
            ["15","A","female","Europe","adult"],
            ["16","B","female","America","adult"],
            ["17","C","female","Europe","adult"],
            ["18","B","female","Europe","adult"],
            ["19","B","female","Europe","adult"],
            ["20","C","female","Europe","adult"],
            ["21","A","female","America","teen"],
            ["22","B","female","Europe","adult"],
            ["23","C","female","Europe","adult"],
            ["24","C","female","Europe","adult"],
            ["25","B","female","Europe","adult"],
            ["26","C","female","Europe","adult"],
            ["27","C","female","Europe","child"],
            ["28","B","female","Europe","child"],
            ["29","C","female","America","child"]]

var startField = "class";
var ignoreFields = ["id"];
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
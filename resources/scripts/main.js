var container, camera, scene, renderer, controls, group
const LEN = 100;
init();

// Read Input

// var json = loadFile("resources/datasets/titanic_test.csv");
// console.log(json);

var table = [["id","class","sex","continent","age"],
            ["0","a","m","euro","adult"],
            ["1","b","m","euro","adult"],
            ["2","c","m","asia","adult"],
            ["3","c","m","euro","adult"],
            ["4","b","m","amer","adult"],
            ["5","c","m","euro","teen"],
            ["6","c","m","asia","adult"],
            ["7","b","m","euro","adult"],
            ["8","c","m","euro","adult"],
            ["9","c","m","euro","adult"],
            ["10","b","m","euro","adult"],
            ["11","c","m","amer","adult"],
            ["12","b","m","euro","adult"],
            ["13","a","m","asia","adult"],
            ["14","c","m","euro","teen"],
            ["15","a","f","euro","adult"],
            ["16","b","f","amer","adult"],
            ["17","c","f","euro","adult"],
            ["18","b","f","euro","adult"],
            ["19","b","f","euro","adult"],
            ["20","c","f","euro","adult"],
            ["21","a","f","amer","teen"],
            ["22","b","f","euro","adult"],
            ["23","c","f","euro","adult"],
            ["24","c","f","euro","adult"],
            ["25","b","f","euro","adult"],
            ["26","c","f","euro","adult"],
            ["27","c","f","euro","child"],
            ["28","b","f","euro","child"],
            ["29","c","f","amer","child"]]

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
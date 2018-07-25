var container, camera, scene, renderer, controls, group, raycaster, mouse, INTERSECTED, FILTERED = 0;
const STEAM = true;
var startField;
var ignoreFields;

// Read Input

if( true )
{
    var table = loadFile("resources/datasets/titanic2.csv");
    startField = "pclass";
    ignoreFields = ["embarked"];
}
else
{
    var amount = 1500;
    var table = [["pclass","sex","continent","age"]];
    var choices = [["A","B","B","C","C","C","C"]
                ,["male","female"]
                ,["Europe","America","Europe","America","Asia"]
                ,["adult","adult","adult","adult","child"]];
    ignoreFields = []


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
    startField = "pclass";
    ignoreFields = [];
}

//ignoreFields = ["Name","Age","Siblings/Spouses Aboard", "Parent/Children Aboard", "Fare"];
var data = new ProcessedData(startField, ignoreFields, table);
const LEN = data.getNumberOfRecords()/2;

init();

var chart = new Chart(data, true);
chart.addToScene();

var chartTmp = null;


// Animate

animate();
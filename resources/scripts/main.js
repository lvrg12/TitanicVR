var container, camera, scene, renderer, controls, group, raycaster, mouse, INTERSECTED, FILTERED = 0;
const STEAM = false;
const HIVE = true;
var startField;
var ignoreFields;

// Read Input

if( true )
{
    startField = "pclass";
    importantField = "survived";
    ignoreFields = ["parch","sibsp"];
    var table = new ProcessedTable(startField, importantField, ignoreFields, loadFile("resources/datasets/titanic2.csv"));;
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
const LEN = table.length/2;
init();

if( HIVE )
    controls.target.set( 0, 0, 0 );
else
    controls.target.set( (LEN/2) * (table[0].length-1), 0, LEN/2 );

var chart = ( HIVE ) ? new ChartHive(table, null) : new Chart(table, null);
chart.addToScene();

var chartTmp = null;


// Animate

animate();

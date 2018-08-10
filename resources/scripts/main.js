var container, camera, scene, renderer, manager, effect, clock, controls, group, raycaster, mouse, INTERSECTED, FILTERED = 0;
var STEAM;
var HIVE;
var CHART_RATIO;
var startField;
var ignoreFields;
var table;
var chart;
var chartTmp;
var LEN;
var ARCH;


function generateGraph()
{
    startField = document.getElementById("start_field").value.toLowerCase();
    ignoreFields = document.getElementById("ignore_fields").value.split(",");

    for(var i=0; i<ignoreFields.length; i++)
        ignoreFields[i] = ignoreFields[i].trim().toLowerCase();

    file = document.getElementById("csvfile").files[0];
    //console.log(document.getElementById("csvdata").value)

    if(file)
        table = new ProcessedTable(startField, ignoreFields, loadFile(file));
    else
        table = new ProcessedTable(startField, ignoreFields, loadFile(null));

    CHART_RATIO = 2;
    LEN = table.length / CHART_RATIO;

    document.getElementById("setting0").align = "center";
    document.getElementById("setting1").style.display = "block";
    document.getElementById("setting2").style.display = "none";

    init();

    resetChart(null);

    animate();
}

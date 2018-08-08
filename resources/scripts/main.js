var container, camera, scene, renderer, controls, group, raycaster, mouse, INTERSECTED, FILTERED = 0;
var STEAM;
var HIVE;
var CHART_RATIO;
var startField;
var ignoreFields;
var table;
var chart;
var chartTmp;
var LEN;


function generateGraph()
{
    startField = document.getElementById("start_field").value;
    ignoreFields = document.getElementById("ignore_fields").value.split(",");

    path = document.getElementById("csvfile").value;
    if(path)
        table = new ProcessedTable(startField, ignoreFields, loadFile(document.getElementById("csvfile")));
    else
        table = new ProcessedTable(startField, ignoreFields, loadFile("resources/datasets/titanic2.csv"));

    CHART_RATIO = 2;
    LEN = table.length / CHART_RATIO;

    document.getElementById("setting0").align = "center";
    document.getElementById("setting0").style.fontSize = "";
    document.getElementById("setting1").style.display = "block";
    document.getElementById("setting2").style.display = "none";

    init();

    resetChart(null);

    animate();
}

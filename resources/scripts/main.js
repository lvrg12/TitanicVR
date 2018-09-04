var container, camera, scene, renderer, manager, effect, clock, controls, group
var raycaster, mouse, havePointerLock, INTERSECTED
var FILTERED = 0;
var VR = false;
var STEAM;
var HIVE;
var CHART_RATIO;
var startField;
var ignoreFields;
var table;
var grid;
var chart;
var cameraPositions;
var chartTmp;
var LEN;
var ARCH;
var pointer;
var TIMER;
var CURRENT_DVD = 0;
var DV_ORDER = ["3D","2D","VR"];
var CURRENT_Q = 0;
var QUESTION = ["q1?","q2?","q3?","q4?","q5?","q6?","q7?","q8?"];

function generateVisualization()
{
    toggleFullScreen();
    generate2DGraph();
    generate3DGraph();
}

function generate2DGraph()
{
    var chart = d3.parsets().dimensions( [ "Class", "Age", "Sex", "Survived" ]);
	var vis = d3.select( "#vis" ).append( "svg" ).attr( "width" , chart.width() ).attr( "height", chart.height() );
	d3.csv( "resources/datasets/titanic.csv", function(error, csv) { vis.datum( csv ).call( chart ); } );
}

function generate3DGraph()
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

    document.getElementById("title").style.display = "none";
    document.getElementById("inputs").style.display = "none";
    //document.getElementById("settings").style.display = "block";
    document.getElementById("prompt").style.display = "block";
    document.getElementById("dvd").innerHTML = DV_ORDER[0]+":";

    init();

    runDV(DV_ORDER[CURRENT_DVD]);

    resetChart(null);

    animate();
}
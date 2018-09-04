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

    document.getElementById("setting0").style.display = "none";
    document.getElementById("setting1").style.display = "block";
    document.getElementById("buttons").style.display = "block";
    document.getElementById("setting2").style.display = "none";
    document.getElementById("question").style.display = "block";

    init();

    resetChart(null);

    animate();
}
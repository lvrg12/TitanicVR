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
var DV_ORDER = ["2D","VR","2D"];
var CURRENT_DVD = DV_ORDER.length-1;
var Q_TIMER;
var QUESTION = ["Which class was the least populated?",
                "Which class had the most survivors?",
                "Which sex suffered the most deaths?",
                "Which class suffered the most deaths?",
                "Which class had the most children?",
                "Which class had the most adult male survivors?",
                "Did the second class children perished or survived?",
                "Did most adult female perished or survived?",
                "Which class had the most male survivors?",
                "Which class had more female perished than female survivors?",
                "How confident were you in answering the questions for this visualization?"];
var CURRENT_Q = QUESTION.length-1;

function generateVisualization()
{
    // toggleFullScreen();
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
    // document.getElementById("settings").style.display = "block";
    document.getElementById("prompt").style.display = "block";





    init();

    nextQ();

    resetChart(null);

    animate();
}
var container, camera, scene, renderer, controls, group, raycaster, mouse, INTERSECTED, FILTERED = 0;
var STEAM;
var HIVE;
var CHART_RATIO = 2;
var startField = "pclass";
var ignoreFields = ["parch"];
var table = new ProcessedTable(startField, ignoreFields, loadFile("resources/datasets/titanic2.csv"));
var chart;
var chartTmp;
var LEN = table.length / CHART_RATIO;

init();

resetChart();

animate();

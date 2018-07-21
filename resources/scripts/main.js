var container, camera, scene, renderer, controls, group;
init();

// Read Input

// Grid

var LEN = 100;
var grid = new Grid([4,2,5,3], LEN);

// Stacks

var stack0 = new Stack(grid.markerLocation(0,2),grid.markerLocation(1,0),[60], LEN);
var stack1 = new Stack(grid.markerLocation(1,0),grid.markerLocation(2,4),[30,30], LEN);
var stack2 = new Stack(grid.markerLocation(2,3),grid.markerLocation(3,1),[20,20,20], LEN);

// Animate

animate();
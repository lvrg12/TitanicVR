var container, camera, scene, renderer, controls, group;
init();

// Grid

var material_line = new THREE.LineBasicMaterial( { color: 0x000000 } );

var geometry_line = new THREE.Geometry();
geometry_line.vertices.push(new THREE.Vector3( 0, 0, 0) );
geometry_line.vertices.push(new THREE.Vector3( 0, 0, 100) );
geometry_line.vertices.push(new THREE.Vector3( 300, 0, 100) );
geometry_line.vertices.push(new THREE.Vector3( 300, 0, 0) );
geometry_line.vertices.push(new THREE.Vector3( 0, 0, 0) );
geometry_line.vertices.push(new THREE.Vector3( 100, 0, 0) );
geometry_line.vertices.push(new THREE.Vector3( 100, 0, 100) );
geometry_line.vertices.push(new THREE.Vector3( 200, 0, 100) );
geometry_line.vertices.push(new THREE.Vector3( 200, 0, 0) );

var grid = new THREE.Line( geometry_line, material_line );

group.add( grid );


// Archs


var stack = new Stack([20,20,30,20,150,50]);
//stack.addArch(40,100,0xff0000);
//stack.addArch(40,100,0x00ff00);
//stack.addArch(100,50,100,0x0000ff);
//console.log( stack.totalValue );



// addShape( shape, color, x, y, z, rx, ry,rz, s );



animate();
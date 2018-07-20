function init() {

    container = document.createElement( 'div' );
    document.body.appendChild( container );

    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xf0f0f0 );

    camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 1000 );
    camera.position.set( 150, 100, 400 );
    scene.add( camera );

    controls = new THREE.OrbitControls( camera );
    controls.target = new THREE.Vector3( 150, 0, 50);
    controls.update();
    
    var light = new THREE.PointLight( 0xffffff, 0.8 );
    camera.add( light );

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    container.appendChild( renderer.domElement );

    group = new THREE.Group();
    scene.add( group );
}

// addShape( shape, color, x, y, z, rx, ry,rz, s );
function addShape( shape, extrudeSettings, color, x, y, z, rx, ry, rz, s )
{
    var geometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );
    var mesh = new THREE.Mesh( geometry, new THREE.MeshPhongMaterial( { color: color } ) );
    mesh.position.set( x, y, z );
    mesh.rotation.set( rx, ry, rz );
    mesh.scale.set( s, s, s );
    group.add( mesh );
}


function animate()
{
    requestAnimationFrame( animate );
    controls.update();
    renderer.render( scene, camera );
}
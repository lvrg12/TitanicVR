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

function Stack(values)
{
    this.type = "Arch";
    this.archs = [];

    var totalValue = 0;
    for( var i=0; i<values.length; i++)
        totalValue+=values[i];

    var tempTopValue = totalValue/2;
    values.sort(function(a, b){return b - a});
    //console.log(values);

    var colors = [0xff0000,0x00ff00,0x0000ff,0xff00ff,0xffff00,0x00ffff]

    for( var i=0; i<values.length; i++)
        addArch(values[i],100,colors[i]);


    function addArch(value, length, color)
    {
        // console.log( "tempTopValue: " + tempTopValue );
        var top = tempTopValue;
        var down = top-value;
        tempTopValue-= value;
        // console.log( "value: " + value + " top: " + top + " down: " + down );

        var arch = new THREE.Shape();
        arch.moveTo( 0, 0 );
        arch.quadraticCurveTo(length/2,top,length,0);
        arch.quadraticCurveTo(length/2,down,0,0);
        // this.archs.push(arch);

        var extrudeSettings = { depth: 2, bevelEnabled: true, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };
        addShape( arch, extrudeSettings, color, 0, 0, 0, 0, 0, 0, 1 );
    }

    this.getLength = function ()
    {
        return this.archs.length;
    }

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
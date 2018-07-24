function init()
{

    container = document.createElement( 'div' );
    document.body.appendChild( container );

    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xf0f0f0 );

    camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, LEN * 10 );
    camera.position.set( LEN, LEN, LEN * 4 );
    scene.add( camera );

    controls = new THREE.OrbitControls( camera );
    controls.update();
    
    var light = new THREE.PointLight( 0xffffff, 0.8 );
    camera.add( light );

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    container.appendChild( renderer.domElement );

    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();

    document.addEventListener( 'mousedown', onDocumentMouseDown, false );

    window.requestAnimationFrame( render );
    window.addEventListener( 'resize', onWindowResize, false );




    group = new THREE.Group();
    scene.add( group );
}

function loadFile( filepath )
{
    return $.csv.toArrays($.ajax({
                url: filepath,
                async: false,
                success: function (csvd) {
                    data = $.csv.toArrays(csvd);
                }
            }).responseText)

}


function animate()
{
    requestAnimationFrame( animate );
    controls.update();
    //raycaster.setFromCamera( mouse, camera );
    render();
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
  }


function onDocumentMouseDown( event )
{
    event.preventDefault();
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

    // find intersections
    raycaster.setFromCamera( mouse, camera );
    var intersects = raycaster.intersectObjects( group.children );
    if ( intersects.length > 0 )
    {
        if ( INTERSECTED != intersects[ 0 ].object )
        {
            INTERSECTED = intersects[ 0 ].object;

            var intersected_color = INTERSECTED.material.color.getHex();

            //console.log(group.children[5]);

            for( var i=0; i<group.children.length; i++ )
            {
                var children_type = group.children[i].geometry.type;
                if( children_type == "ExtrudeGeometry" || children_type == "CylinderGeometry" )
                    if( group.children[i].material.color.getHex() != intersected_color )
                        group.children[i].material.opacity = 0.05;
            }

        }
    }
    else
    {
        INTERSECTED = null;
    }
}

function render()
{
	renderer.render( scene, camera );
}
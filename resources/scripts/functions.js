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
    var rect = renderer.domElement.getBoundingClientRect();
    mouse.x = ( ( event.clientX - rect.left ) / rect.width ) * 2 - 1;
    mouse.y = - ( ( event.clientY - rect.top ) / rect.height ) * 2 + 1;

    // find intersections
    raycaster.setFromCamera( mouse, camera );

    var intersects = raycaster.intersectObjects( chart.group.children );

    if ( intersects.length > 0 )
    {
        if ( INTERSECTED != intersects[ 0 ].object )
        {
            INTERSECTED = intersects[ 0 ].object;
            var itype = INTERSECTED.geometry.type;
            
            if( FILTERED == 0 )
            {
                if( itype == "CylinderGeometry" | itype == "ExtrudeGeometry" )
                {

                    FILTERED = 1;

                    var ifield1 = INTERSECTED.attributes.field1;
                    var ifield2 = INTERSECTED.attributes.field2;
                    var ioption1 = INTERSECTED.attributes.option1;
                    var ioption2 = INTERSECTED.attributes.option2;

                    resetChart([ifield1,ioption1,ifield2,ioption2]);

                }
            }

        }
    }
    else
    {
        if( FILTERED != 0 )
        {
            resetChart(null);
        }

        FILTERED = 0;
    }
}

function render()
{
	renderer.render( scene, camera );
}

function changePlot( id )
{
    linear = document.getElementById("linear");
    hive = document.getElementById("hive");

    if( id == "linear" )
    {
        linear.checked = true;
        hive.checked = false;
    }

    if( id == "hive" )
    {
        hive.checked = true;
        linear.checked = false;
    }

    resetChart(null);

}

function changeSteam( id )
{
    steamTrue = document.getElementById("steamTrue");
    steamFalse = document.getElementById("steamFalse");

    if( id == "steamTrue" )
    {
        steamTrue.checked = true;
        steamFalse.checked = false;
    }

    if( id == "steamFalse" )
    {
        steamFalse.checked = true;
        steamTrue.checked = false;
    }

    resetChart(null);

}

function resetChart(filtration)
{
    if( chart != null )
        chart.removeFromScene();
    if( chartTmp != null )
        chartTmp.removeFromScene();

    HIVE = document.getElementById("hive").checked;
    STEAM = document.getElementById("steamTrue").checked;

    if( HIVE )
        controls.target.set( 0, 0, 0 );
    else
        controls.target.set( (LEN/2) * (table[0].length-1), 0, LEN/2 );

    chart = new Chart(table, filtration);
    chart.addToScene();
}
function init()
{
    clock = new THREE.Clock();

    container = document.createElement( 'div' );
    document.body.appendChild( container );

    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xf0f0f0 );

    camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, LEN * 10 );
    camera.position.set( (LEN/2) * (table[0].length-1), LEN, LEN * 4 );

    pointer = new Pointer( "resources/media/circled-dot.png" );
    camera.add( pointer );
    pointer.position.set(0,0,-1000);
    pointer.visible = false;

    scene.add( camera );

    var light = new THREE.PointLight( 0xffffff, 0.8 );
    camera.add( light );

    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    container.appendChild( renderer.domElement );

    controls = new THREE.OrbitControls( camera );
    controls.update();

    window.requestAnimationFrame( render );
    window.addEventListener( 'mousedown', onDocumentMouseDown, false );
    window.addEventListener( 'touchstart', onDocumentTouchStart, false );
    window.addEventListener( 'touched', onDocumentTouchEnd, false )
    window.addEventListener( 'resize', onWindowResize, false );


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

function changeArch( id )
{
    archTrue = document.getElementById("archTrue");
    archFalse = document.getElementById("archFalse");

    if( id == "archTrue" )
    {
        archTrue.checked = true;
        archFalse.checked = false;
    }

    if( id == "archFalse" )
    {
        archFalse.checked = true;
        archTrue.checked = false;
    }

    resetChart(null);
}

function onVR()
{
    pointer.visible = true;
    controls = new THREE.DeviceOrientationControls( camera, true );
    controls.connect();

    effect = new THREE.StereoEffect( renderer );
    effect.setSize( window.innerWidth, window.innerHeight );

    window.addEventListener( 'deviceorientation', setOrientationControls, true );
    window.removeEventListener('deviceorientation', setOrientationControls, true);

    //document.getElementById("onVR").style.display = "none";
    document.getElementById("setting1").style.display = "none";

    // rotate chart 180
    // camera.lookAt(0,0,0);

    toggleFullScreen();

    VR = true;
}

function offVR()
{
    effect = null;

    controls = new THREE.OrbitControls( camera );

    if( HIVE )
        controls.target.set( 0, LEN/2, 0 );
    else
        controls.target.set( (LEN/2) * (table[0].length-1), LEN/2, LEN/2 );

    document.getElementById("onVR").style.display = "inline";
    document.getElementById("offVR").style.display = "none";

    toggleFullScreen();

    VR = false;
}

function resetChart(filtration)
{
    if( chart != null )
        chart.removeFromScene();
    if( chartTmp != null )
        chartTmp.removeFromScene();

    HIVE = document.getElementById("hive").checked;
    STEAM = document.getElementById("steamTrue").checked;
    ARCH = document.getElementById("archTrue").checked;

    if( !VR )
    {
        if( HIVE )
            controls.target.set( 0, LEN/2, 0 );
        else
            controls.target.set( (LEN/2) * (table[0].length-1), LEN/2, LEN/2 );
    }

    chart = new Chart(table, filtration);
    chart.addToScene();
}

function loadFile( file )
{
    if( file )
    {
        var reader = new FileReader();
        reader.onload = function(e)
            {
                document.getElementById("csvdata").value = e.target.result;
                document.getElementById("csvdataready").value = "1";
            };

        reader.readAsText(file);

        //while( document.getElementById("csvdata").value == null )
        //    console.log(reader);

        return $.csv.toArrays( document.getElementById("csvdata").value );
    }
    else
    {
        return $.csv.toArrays($.ajax({
                url: "resources/datasets/titanic.csv",
                async: false,
                success: function (csvd) {
                    data = $.csv.toArrays(csvd);
                }
            }).responseText)
    }
}

function toggleFullScreen()
{
    if ((document.fullScreenElement && document.fullScreenElement !== null) ||    
     (!document.mozFullScreen && !document.webkitIsFullScreen)) {
      if (document.documentElement.requestFullScreen) {  
        document.documentElement.requestFullScreen();  
      } else if (document.documentElement.mozRequestFullScreen) {  
        document.documentElement.mozRequestFullScreen();  
      } else if (document.documentElement.webkitRequestFullScreen) {  
        document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);  
      }  
    } else {  
      if (document.cancelFullScreen) {  
        document.cancelFullScreen();  
      } else if (document.mozCancelFullScreen) {  
        document.mozCancelFullScreen();  
      } else if (document.webkitCancelFullScreen) {  
        document.webkitCancelFullScreen();  
      }  
    }  
}

// Events

function setOrientationControls(e)
{
    if (!e.alpha)
      return;
}

function onWindowResize()
{
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    if( !VR )
        renderer.setSize( window.innerWidth, window.innerHeight );
    else
        effect.setSize( window.innerWidth, window.innerHeight );
}

function onDocumentMouseDown( event )
{
    event.preventDefault();
    var rect = renderer.domElement.getBoundingClientRect();

    mouse.x = ( ( event.clientX - rect.left ) / rect.width ) * 2 - 1;
    mouse.y = - ( ( event.clientY - rect.top ) / rect.height ) * 2 + 1;

    if( !VR )
        raycaster.setFromCamera( mouse, camera );
    else
        raycaster.setFromCamera( new THREE.Vector2( 0, 0 ) , camera );

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

function onDocumentTouchStart( event )
{
    if( VR )
    {
        event.preventDefault();
        var rect = renderer.domElement.getBoundingClientRect();

        mouse.x = ( ( event.clientX - rect.left ) / rect.width ) * 2 - 1;
        mouse.y = - ( ( event.clientY - rect.top ) / rect.height ) * 2 + 1;

        raycaster.setFromCamera( new THREE.Vector2( 0, 0 ) , camera );

        var intersects = raycaster.intersectObjects( chart.group.children );

        if ( ! intersects.length > 0 )
            TIMER = setInterval(function(){camera.translateZ( -10 );}, 10);

    }
}

function onDocumentTouchEnd( event )
{
    if( VR & TIMER ) clearInterval(TIMER)
}

// Animate & Render

function animate()
{
    requestAnimationFrame( animate );
    renderer.setAnimationLoop( render );
    controls.update();
    // pointer.updatePosition();
    render();
}

function render()
{
    if( effect == null )
        renderer.render( scene, camera );
    else
        effect.render( scene, camera );
}
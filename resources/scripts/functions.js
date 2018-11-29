AFRAME.registerComponent('boxes', {
    init: function () {
      var box;
      var columns = 20;
      var el = this.el;
      var i;
      var j;
      var rows = 15;
      if (el.sceneEl.isMobile) {
        columns = 10;
        rows = 5;
      };
      for (x = columns / -2; x < columns / 2; x++) {
        for (y = 0.5; y < rows; y++) {
          box = document.createElement('a-entity');
          box.setAttribute('mixin', 'box');
          box.setAttribute('position', {x: x * .6, y: y * .6, z: 1.5});
          el.appendChild(box);
        }
      }
    }
  });

function init()
{

    clock = new THREE.Clock();

    initScene();
    initCamera();
    initLight();
    initSurface();
    initInteractions();
    initRenderer();

    window.addEventListener( 'mousedown', onDocumentMouseDown, false );
    // window.addEventListener( 'touchstart', onDocumentTouchStart, false );
    // window.addEventListener( 'touchend', onDocumentTouchEnd, false );
}

function initCamera()
{
    cameraHolder = document.querySelector('a-entity').object3D;
    cameraHolder.name = "cameraHolder";

    document.querySelector('a-camera').object3D.name = "hppc_camera_group";
    camera = document.querySelector('a-camera').object3D.children[1];
    camera.name = "camera";

    pointer = camera.el.lastElementChild.object3D.children[0];

    pointer.material.depthTest = true;
    pointer.name = "pointer";

}

// inits

function initScene()
{
    scene = document.querySelector('a-scene').object3D;
    scene.background = new THREE.Color( 0xffffff );
}

function initLight()
{
    var light1 = document.getElementById("light1").object3D;
    var light2 = document.getElementById("light2").object3D;
    var light3 = document.getElementById("light3").object3D;
    var light4 = document.getElementById("light4").object3D;

    var height = LEN * 2;
    var dist = LEN/0.25;

    // back lights
    light1.position.set( -dist, height, -dist);
    light2.position.set( LEN * (table[0].length) + dist, height, -dist);

    // front lights
    light3.position.set( -dist, height, LEN + dist);
    light4.position.set( LEN * (table[0].length) + dist, height, LEN + dist);
}

function initInteractions()
{
    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();
}

function initSurface()
{
    var surface_geometry = new THREE.BoxGeometry( LEN * table[0].length, LEN/20, LEN*1.5 );
    var surface = new THREE.Mesh( surface_geometry, new THREE.MeshPhongMaterial( { color: 0xbababa, shininess: 50 } ) );
    surface.position.set( (LEN/2) * (table[0].length-1), -LEN/10, LEN/2);
    surface.name = "table";
    scene.add( surface );

    var floor_geometry = new THREE.PlaneGeometry( 20, 20 );
    var floor = new THREE.Mesh( floor_geometry, new THREE.MeshPhongMaterial( { color: 0x333333, shininess: 50 } ) );
    floor.position.set( (LEN/2) * (table[0].length-1), -2.5, LEN/2);
    floor.rotateX(-Math.PI/2);
    floor.name = "floor";
    scene.add( floor );

    // move camera to center
    cameraHolder.position.x = (LEN/2) * (table[0].length-1);
    cameraHolder.position.z = LEN;
}

function initRenderer()
{
    // renderer = document.querySelector('a-scene').renderer;
    // renderer.setClearColor( 0xCCCCCC );
    // renderer.setPixelRatio( window.devicePixelRatio );
    // renderer.setSize( window.innerWidth, window.innerHeight );
    // renderer.vr.enabled  = true;
    // renderer.vr.standing = true;
    // renderer.shadowMap.enabled = true;
    // renderer.shadowMap.type = THREE.PCFSoftShadowMap;
}


// chart functions

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

function nextQ( x )
{   
    if( !x )
    {
        var answer = DV_ORDER[CURRENT_DVD] + " Q" + CURRENT_Q + " "
        answer = answer + "Time: " + document.getElementById("qtime").innerHTML;
        answer = answer + " Answer: " + document.getElementById("answer").value;
        console.log(answer);
    }
    else
    {
        console.log("---------> USER " + document.getElementById("user_number").value + " <---------");
    }

    document.getElementById("answer").value = "";
    document.getElementById("qtime").innerHTML = "0:0";
    clearInterval(Q_TIMER);

    if( CURRENT_Q == QUESTION.length )
    {
        CURRENT_Q = 1;
        document.getElementById("qn").innerHTML = "Q"+CURRENT_Q+":";
        document.getElementById("question").innerHTML = QUESTION[CURRENT_Q-1];
        if( CURRENT_DVD == DV_ORDER.length-1 )
        {   
            CURRENT_DVD = 0;
            runDV(DV_ORDER[CURRENT_DVD]);
        }
        else
            runDV(DV_ORDER[++CURRENT_DVD]);
    }
    else
    {
        document.getElementById("qn").innerHTML = "Q"+ ++CURRENT_Q +":";
        document.getElementById("question").innerHTML = QUESTION[CURRENT_Q-1];
    }

    var m = 0;
    var s = 0;

    Q_TIMER = setInterval( function()
                            {
                                if( s == 60 )
                                {
                                    m++;
                                    s = 0;
                                }
                                document.getElementById("qtime").innerHTML = m + ":" + s++;
                            } , 1000);
}

function runDV( dvd )
{
    if( dvd == "2D" )
        on2D();
    else if( dvd == "3D" )
        on3D();
    else
        onVR();
}

function onVR()
{
    scene.visible = true;
    pointer.visible = true;
    camera.position.set( (LEN/2) * (table[0].length-1), LEN, LEN * 6 );
    controls = new THREE.DeviceOrientationControls( camera, true );
    controls.connect();         

    effect = new THREE.StereoEffect( renderer );
    effect.setSize( window.innerWidth, window.innerHeight );

    window.addEventListener( 'deviceorientation', setOrientationControls, true );
    window.removeEventListener('deviceorientation', setOrientationControls, true);

    if( !isTraining )
        document.getElementById("prompt").style.display = "none";

    document.getElementById("checkboxes").style.display = "none";
    document.getElementById("onVR").style.display = "none";
    document.getElementById("on3D").style.display = "inline";
    document.getElementById("on2D").style.display = "inline";
    document.getElementById("vis").style.display = "none";

    scene.rotateY(Math.PI);

    VR = true;
}

function on3D()
{
    scene.visible = true;
    pointer.visible = false;
    effect = null;

    renderer.setSize( window.innerWidth, window.innerHeight );

    camera.position.set( (LEN/2) * (table[0].length-1), LEN, LEN * 4 );
    controls = new THREE.OrbitControls( camera );

    if( HIVE )
        controls.target.set( 0, LEN/2, 0 );
    else
        controls.target.set( (LEN/2) * (table[0].length-1), LEN/2, LEN/2 );

    if( !isTraining )
        document.getElementById("prompt").style.display = "block";

    document.getElementById("checkboxes").style.display = "block";
    document.getElementById("onVR").style.display = "inline";
    document.getElementById("on3D").style.display = "none";
    document.getElementById("on2D").style.display = "inline";
    document.getElementById("vis").style.display = "none";

    VR = false;

}

function on2D()
{
    scene.visible = false;
    pointer.visible = false;
    effect = null;

    controls = new THREE.OrbitControls( camera );

    if( HIVE )
        controls.target.set( 0, LEN/2, 0 );
    else
        controls.target.set( (LEN/2) * (table[0].length-1), LEN/2, LEN/2 );

    if( !isTraining )
        document.getElementById("prompt").style.display = "block";

    document.getElementById("checkboxes").style.display = "none";
    document.getElementById("onVR").style.display = "inline";
    document.getElementById("on3D").style.display = "inline";
    document.getElementById("on2D").style.display = "none";
    document.getElementById("vis").style.display = "block";

    VR = false;

}

function resetChart(filtration)
{
    if( chart != null )
        chart.removeFromScene();
    if( chartTmp != null )
        chartTmp.removeFromScene();

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
        var tmp = $.csv.toArrays($.ajax({
            url: CSV_FILE,
            async: false,
            success: function (csvd) { data = $.csv.toArrays(csvd); },
            dataType: "text",
        }).responseText);

        return tmp;
    }
}

// Events

function filterChart( obj )
{
    var name = obj.name;
            
    if( FILTERED == 0 )
    {
        if( name == "cylinder" | name == "arch" )
        {

            FILTERED = 1;

            var ifield1 = obj.attributes.field1;
            var ifield2 = obj.attributes.field2;
            var ioption1 = obj.attributes.option1;
            var ioption2 = obj.attributes.option2;

            resetChart([ifield1,ioption1,ifield2,ioption2]);

        }
    }
}

function onDocumentMouseDown( event )
{
    event.preventDefault();

    if( event.isTrusted ) return;
    raycaster.setFromCamera( new THREE.Vector2( 0, 0 ) , camera );
    var intersects = raycaster.intersectObjects( chart.group.children );

    if ( intersects.length > 0 )
    {
        if ( INTERSECTED != intersects[ 0 ].object )
        {
            INTERSECTED = intersects[ 0 ].object;
            filterChart( INTERSECTED );
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
        TIMER = setInterval( function()
                            {
                                var direction = new THREE.Vector3().copy(camera.getWorldDirection());
                                cameraHolder.position.add(direction.multiplyScalar(0.01));
                                cameraHolder.position.y = -1.5;
                            } , 5);
    }
}

function onDocumentTouchEnd( event )
{
    if( TIMER ) clearInterval(TIMER);
}

function onControllerClicked( event )
{
    var controller = event.detail;
    scene.add( controller );

    controller.standingMatrix = renderer.vr.getStandingMatrix();
    controller.head = window.camera;

	var meshColorOff = 0xDB3236,//  Red.
	meshColorOn  = 0xF4C20D,//  Yellow.
	controllerMaterial = new THREE.MeshStandardMaterial({
		color: meshColorOff
	}),
	controllerMesh = new THREE.Mesh(
		new THREE.CylinderGeometry( 0.005, 0.05, 0.1, 6 ),
		controllerMaterial
	),
	handleMesh = new THREE.Mesh(
		new THREE.BoxGeometry( 0.03, 0.1, 0.03 ),
		controllerMaterial
    )
    
	controllerMaterial.flatShading = true;
	controllerMesh.rotation.x = -Math.PI / 2;
	handleMesh.position.y = -0.05;
	controllerMesh.add( handleMesh );
	controller.userData.mesh = controllerMesh; //  So we can change the color later.
	controller.add( controllerMesh );
	castShadows( controller );
    receiveShadows( controller );
    

    controller.addEventListener( 'primary press began', function( event )
    {
        INTERSECTED = event.target.userData.mesh;

        if( INTERSECTED == null )
        {
            if( FILTERED != 0 )
            {
                resetChart(null);
            }
            FILTERED = 0;
        }
        else
        {
            resetChart( INTERSECTED );
        }
    });
    
    controller.addEventListener( 'disconnected', function( event ){
		controller.parent.remove( controller );
	});

}

// Animate & Render

function animate()
{
    requestAnimationFrame( animate );
    // THREE.VRController.update();
    // render();
}

function render()
{
    // if( effect == null )
        // renderer.render( scene, camera );
    // else
        // effect.render( scene, camera );
}
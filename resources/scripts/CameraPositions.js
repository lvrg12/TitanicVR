function CameraPositions( group )
{
    var points = [];

    var geometry = new THREE.SphereGeometry( 5, 32, 32 );
    var material = new THREE.MeshBasicMaterial( {color: 0xff0000} );
    var sphere = new THREE.Mesh( geometry, material );
    sphere.position.set( 0, 0, 3000 );
    sphere.scale.set( 30, 30, 30 )
    points.push(sphere);
    group.add( points[points.length-1] );
}
function Pointer(sprite_png, group)
{
    this.type = "Pointer";
    var sprite;

    addSprite();
    updatePosition();
    sprite.position.x = camera.position.x;
    sprite.position.y = camera.position.y;

    function addSprite()
    {
        var spriteMap = new THREE.TextureLoader().load( sprite_png );
        var spriteMaterial = new THREE.SpriteMaterial( { map: spriteMap, color: 0xffffff } );
        sprite = new THREE.Sprite( spriteMaterial );
        // sprite.position.set( 0, 0, 0 );
        sprite.scale.set( 50, 50, 50 )
        group.add( sprite );
    }

    function updatePosition()
    {
        //sprite.rotation = controls.object.rotation;
        sprite.position.x = camera.position.x;
        sprite.position.y = camera.position.y;
        sprite.position.z = camera.position.z - 1000;

        //sprite.lookAt((LEN/2) * (table[0].length-1), LEN/2, LEN/2);
    }

    this.updatePosition = updatePosition;
}

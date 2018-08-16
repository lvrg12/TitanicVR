function Pointer(sprite_png)
{
    this.type = "Pointer";
    var sprite;

    addSprite();

    function addSprite()
    {
        var spriteMap = new THREE.TextureLoader().load( sprite_png );
        var spriteMaterial = new THREE.SpriteMaterial( { map: spriteMap, color: 0xffffff } );
        sprite = new THREE.Sprite( spriteMaterial );
        sprite.scale.set( 25, 25, 25 )
    }

    return sprite;
}

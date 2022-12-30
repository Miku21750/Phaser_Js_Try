class Explosion extends Phaser.GameObjects.Sprite{
    constructor(scene,x,y){
        super(scene, y, y, "explosion");
        scene.add.existing(this);
        this.play('explode_anim')
    }
}
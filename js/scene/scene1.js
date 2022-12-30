

class scene1 extends Phaser.Scene {
    constructor(){
        super('bootGame');
    }
    //preload
    preload(){
        // this.load.plugin('rexinputtextplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexinputtextplugin.min.js', true);
        this.load.image("background","assets/images/background.png")
        // this.load.image("ship","assets/images/ship.png")
        //change to spritesheet
        this.load.spritesheet("ship","assets/spritesheets/ship.png",{
            frameWidth: 16,
            frameHeight: 16
        })
        // this.load.image("ship2","assets/images/ship2.png")
        this.load.spritesheet("ship2","assets/spritesheets/ship2.png",{
            frameWidth: 32,
            frameHeight: 16
        })
        // this.load.image("ship3","assets/images/ship3.png")
        this.load.spritesheet("ship3","assets/spritesheets/ship3.png",{
            frameWidth: 32,
            frameHeight: 32
        })
        this.load.spritesheet("explosion","assets/spritesheets/explosion.png",{
            frameWidth: 16,
            frameHeight: 16
        })
        this.load.spritesheet("power-up","assets/spritesheets/power-up.png",{
            frameWidth: 16,
            frameHeight: 16
        })
        this.load.spritesheet("player","assets/spritesheets/player.png",{
            frameWidth: 16,
            frameHeight: 24
        })
        this.load.spritesheet("beam","assets/spritesheets/beam.png",{
            frameWidth: 16,
            frameHeight: 16
        })

        //load bitmap font
        this.load.bitmapFont("pixelFont","assets/font/font.png",'assets/font/font.xml')

        //load audio
        this.load.audio("audio_beam",['assets/sounds/beam.ogg','assets/sounds/beam.mp3'])
        this.load.audio("audio_explosion",['assets/sounds/explosion.ogg','assets/sounds/explosion.mp3'])
        this.load.audio("audio_pickup",['assets/sounds/pickup.ogg','assets/sounds/pickup.mp3'])
        this.load.audio("bgm",['assets/sounds/sci-fi_platformer12.ogg','assets/sounds/sci-fi_platformer12.mp3'])
        this.load.audio("death",['assets/sounds/mario_death.ogg','assets/sounds/mario_death.mp3'])
        
    }
    create(){
        //create text (x, y)
        this.add.text(20,20,"loading game...");
        //jump after finish load
        this.scene.start('playGame');
        //anim
        this.anims.create({
            key: "ship1_anim",
            frames: this.anims.generateFrameNumbers("ship"),
            frameRate:20,
            repeat: -1 //-1 for infinite loops
        })
        this.anims.create({
            key: "ship2_anim",
            frames: this.anims.generateFrameNumbers("ship2"),
            frameRate:20,
            repeat: -1 //-1 for infinite loops
        })
        this.anims.create({
            key: "ship3_anim",
            frames: this.anims.generateFrameNumbers("ship3"),
            frameRate:20,
            repeat: -1 //-1 for infinite loops
        })
        this.anims.create({
            key: "explode_anim",
            frames: this.anims.generateFrameNumbers("explosion"),
            frameRate:20,
            repeat: 0,
            hideOnComplete:true //dissapear
        })

        this.anims.create({
            key: "red",
            frames: this.anims.generateFrameNumbers('power-up',{
                start:0,
                end:1
            }),
            frameRate:20,
            repeat: -1
        })
        this.anims.create({
            key: "grey",
            frames: this.anims.generateFrameNumbers('power-up',{
                start:2,
                end:3
            }),
            frameRate:20,
            repeat: -1
        })
        this.anims.create({
            key: "thrust",
            frames: this.anims.generateFrameNumbers('player'),
            frameRate:20,
            repeat: -1
        })
        this.anims.create({
            key: "beam_anim",
            frames: this.anims.generateFrameNumbers('beam'),
            frameRate:20,
            repeat: -1
        })

        

    }
} 

    //scene
    //config
    var config = {
        width: 256,
        height: 272,
        backgroundColor: 0x000000,
        scene: [scene1,scene2],
        physics:{
            default:"arcade",
            arcade:{
                debug:false
            }
        },
    }
    var gameSettings = {
        playerSpeed:200,
    }

    var game = new Phaser.Game(config);


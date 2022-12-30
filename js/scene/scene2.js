

class scene2 extends Phaser.Scene {
    constructor(){
        super('playGame');
    }
    create(){
        //set properties so can be callback
        // this.background = this.add.image(0,0,"background")
        //change to tilesprite
        this.background = this.add.tileSprite(0,0,config.width,config.height,"background")

        //set pivot to topleft instead of center
        this.background.setOrigin(0,0)

        //add ship
        // this.ship1 = this.add.image(config.width/2 -50, config.height/2, "ship");
        //change to sprite
        this.ship1 = this.add.sprite(config.width/2 -50, config.height/2, "ship");
        this.ship2 = this.add.sprite( config.width/2, config.height/2, "ship2");
        this.ship3 = this.add.sprite(config.width/2 +50, config.height/2, "ship3");

        //add group to enable physics
        this.enemies = this.physics.add.group();
        this.enemies.add(this.ship1);
        this.enemies.add(this.ship2);
        this.enemies.add(this.ship3);

        //anim
        console.log(this)
        
        //add group
        this.powerUps = this.physics.add.group();

        var maxObjects = 4;
        for (var i = 0; i<= maxObjects; i++){
            var powerUp = this.physics.add.sprite(16,16,"power-up");
            this.powerUps.add(powerUp);
            //random position
            powerUp.setRandomPosition(0,0,game.config.width, game.config.height)

            //random animation
            if(Math.random() > 0.5){
                powerUp.play("red");
            }else{
                powerUp.play('grey');
            }

            powerUp.setVelocity(100,100);
            //set collision
            powerUp.setCollideWorldBounds(true);
            powerUp.setBounce(1); 
        }

        //add animation
        this.ship1.play("ship1_anim");
        this.ship2.play("ship2_anim");
        this.ship3.play("ship3_anim");

        //make ship interactive
        this.ship1.setInteractive();
        this.ship2.setInteractive();
        this.ship3.setInteractive();

        //add event listener
        this.input.on('gameobjectdown',this.destroyShip, this);

        //set scale
        this.ship1.setScale(2);
        //set flip
        this.ship1.flipY = true;

        //add text
        //this.add.text(20,20, "Playing game", {font: "25px Arial", fill:"yellow"})
        //add score
        this.score = 0
        //use bitmap font
        //before add the label, make the text out of a box

        //add shape
        // var graphics = this.add.graphics();
        // //fill shape in black solid
        // graphics.fillStyle(0x0000000, 1)

        // //draw poligon line
        // graphics.beginPath();
        // graphics.moveTo(0,0)
        // graphics.lineTo(config.width, 0);
        // graphics.lineTo(config.width, 20)
        // //close the path
        // graphics.closePath()
        // //fill the path
        // graphics.fillPath()
        //add scorelabel
        this.scoreLabel = this.add.bitmapText(10,5,"pixelFont","SCORE 0", 16)
        // (x,y,key,text,size)

        //add sound into scene
        this.beamSound = this.sound.add('audio_beam');
        this.explosionSound = this.sound.add('audio_explosion');
        this.pickupSound = this.sound.add('audio_pickup');
        this.deathSound = this.sound.add('death');

        //add bgm
        // this.bgm = this.sound.add('bgm');
        // var bgmConfig = {
        //     mute:false,
        //     volume: 1,
        //     rate:1,
        //     detune: 0,
        //     seek: 0,
        //     loop: false,
        //     delay: 0,
        // }
        // this.bgm.play(bgmConfig);
        

        //add player at very end create function
        this.player = this.physics.add.sprite(config.width/2-8, config.height - 64, 'player')
        this.player.play("thrust") 
        this.cursorKeys = this.input.keyboard.createCursorKeys()
        this.player.setCollideWorldBounds(true);
        
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        this.projectiles = this.add.group()

        //enable collider
        this.physics.add.collider(this.projectiles, this.powerUps, function(projectiles,powerUp){
            projectiles.destroy();
        })
        //after collider, use overlap, because it didn' t bounce
        this.physics.add.overlap(this.player,this.powerUps, this.pickPowerUp, null, this)

        //addoverlap between player and enemy group
        this.physics.add.overlap(this.player, this.enemies, this.hurtPlayer, null, this)

        //add overlap between porject and enemy
        this.physics.add.overlap(this.projectiles,this.enemies,this.hitEnemy, null, this)
        
    }
    //move ship down
    moveShip(ship,speed){
        ship.y += speed;
        //if above config height, reset position
        if (ship.y > config.height){
            this.resetShipPos(ship)
        }
    }
    //reset position to top and randomize x
    resetShipPos(ship){
        ship.y = 0;
        var randomX = Phaser.Math.Between(0, config.width);
        ship.x = randomX
    }
    destroyShip(pointer, gameObject){
        gameObject.setTexture("explosion");
        gameObject.play("explode_anim");
    }
    movePlayerManager(){
        //horizontal
        if(this.cursorKeys.left.isDown){
            this.player.setVelocityX(-gameSettings.playerSpeed);
        }else if(this.cursorKeys.right.isDown){
            this.player.setVelocityX(gameSettings.playerSpeed);
        }else{
            this.player.setVelocityX(0)
        }

        //vertical
        if(this.cursorKeys.up.isDown){
            this.player.setVelocityY(-gameSettings.playerSpeed);
        }else if(this.cursorKeys.down.isDown){
            this.player.setVelocityY(gameSettings.playerSpeed);
        }else{
            this.player.setVelocityY(0)
        }
    }
    update(){
        //set angle (on update)
        this.ship1.angle += 3;
        
        this.moveShip(this.ship1,1);
        this.moveShip(this.ship2,2);
        this.moveShip(this.ship3,3);
        
        //for background moving
        this.background.tilePositionY -= 0.5;

        
        this.movePlayerManager()
        // if(Phaser.Input.Keyboard.JustDown(this.spacebar)){
            console.log("Fire");
            //if the ship is not disableBody, run function
            if(this.player.active){
                this.shootBeam()
                //play sfx
                // this.beamSound.play()
            }
        // }
        for(var i = 0;i < this.projectiles.getChildren().length;i++){
            var beam = this.projectiles.getChildren()[i]
            beam.update();
        }
    }
    //create pick powerUp
    pickPowerUp(player,powerUp){
        powerUp.disableBody(true,true)
        this.pickupSound.play()
    }
    hurtPlayer(player,enemy){
        //reset position off the enemy
        this.resetShipPos(enemy);
        this.deathSound.play()
         // 4.3 don't hurt the player if it is invincible
        if(this.player.alpha < 1){
            return;
        }
        //add explosion
        var explosion = new Explosion(this, player.x, player.y)
        //ship disable
        player.disableBody(true,true)
        //delay the call of function resetPlayer
        this.time.addEvent({
            //1000 ms
            delay:1000,
            //create resetPlayer
            callback:this.resetPlayer,
            callbackScope:this,
            loop: false
        })
    }
    resetPlayer(){
        //reset position of player
        var x = config.width /2 - 8;
        var y = config.height - 64;
        //enable back the body 
        this.player.enableBody(true,x,y,true,true);

        //make player transparetnt
        this.player.alpha = 0.5
        //use tween to set alpha back, so it can set alpha back with running animation
        var tween = this.tweens.add({
            //target ship player
            //when ship destroy, hidden at the bottom
            targets: this.player,
            //tweens action
            //move target(ship) 64 pixel 
            y: config.height - 64,
            ease: 'Power1',
            //duration 1500ms
            duration: 1500, 
            repeat: 0,
            //if done, return alpha
            onComplete: function(){
                this.player.alpha = 1;
            },
            callbackScope: this
        })
    }
    hitEnemy(projectile,enemy){

        //add explosion each time hit enemy
        var explosion = new Explosion(this, enemy.x, enemy.y)
        //add sfx explosion
        this.explosionSound.play()
        projectile.destroy();
        this.resetShipPos(enemy)
        //increase score every hit
        this.score += 15;

        //add format score
        // var scoreFormated = this.zeroPad(this.score, 6)
        this.scoreLabel.text = "SCORE "+this.score
    }
    shootBeam(){
        // var beam = this.physics.add.sprite(this.player.x, this.player.y, "beam");
        var randomShoot = Phaser.Math.Between(1,10);
        if(randomShoot == 1){
            var beam = new Beam(this);   
        }
    }

    //add function zero padding
    // zeroPad(number,size){
    //     var stringNumber = String(number);
    //     while(stringNumber.length < (size || 2)){
    //         stringNumber = "0" + stringNumber
    //     }
    //     console.log(stringNumber)
    //     return stringNumber
    // }
}
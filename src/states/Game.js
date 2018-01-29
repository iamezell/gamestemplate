/* globals __DEV__ */
import Phaser from 'phaser'
import Mushroom from '../sprites/Mushroom'
import Ground from '../sprites/Ground.js'
import Platform from '../sprites/Platform.js'
import Player from '../sprites/Player.js'


export default class extends Phaser.State {
  init () {
    this.cursors = this.game.input.keyboard.createCursorKeys()
    this.RUNNING_SPEED = 180;
    this.JUMPING_SPEED = 550;
  }
  preload () {}

  create () {
    // const bannerText = 'Phaser + ES6 + Webpack'
    // let banner = this.add.text(this.world.centerX, this.game.height - 80, bannerText, {
    //   font: '40px Bangers',
    //   fill: '#77BFA3',
    //   smoothed: false
    // })

    // banner.padding.set(10, 16)
    // banner.anchor.setTo(0.5)

    // this.mushroom = new Mushroom({
    //   game: this.game,
    //   x: this.world.centerX,
    //   y: this.world.centerY,
    //   asset: 'mushroom'
    // })

    // this.game.add.existing(this.mushroom)
    let mobileBottom = 65
    let desktopGroundY = 520
    let mobileGroundY = 520 - mobileBottom
    let desktopPlatformY = desktopGroundY - 200
    let mobilePlatformY = mobileGroundY - 200
    let desktopPlayerY = desktopPlatformY - 100
    let mobilePlayerY = mobilePlatformY - 100
   

    this.desktop = this.game.device.desktop
    let groundY = this.desktop ? desktopGroundY : mobileGroundY
    let platformY = this.desktop ?  desktopPlatformY: mobilePlatformY
    let playerY = this.desktop ? desktopPlayerY : mobilePlayerY
    

  

    this.ground = new Ground({
      game: this.game,
      x: 0,
      y: groundY,
      asset: 'ground'
    })

    this.platform = new Platform({
      game: this.game,
      x: 0,
      y: platformY,
      asset: 'platform'
    })

    this.player = new Player({
      game: this.game,
      x: 100,
      y: playerY,
      asset: 'player',
      frame: 3
    })

    this.game.physics.arcade.enable(this.ground)
    this.ground.body.allowGravity = false
    this.ground.body.immovable = true
    this.game.physics.arcade.enable(this.platform)
    this.platform.body.allowGravity = false
    this.platform.body.immovable = true
    this.game.physics.arcade.enable(this.player)

    this.player.anchor.setTo(0.5)
    this.player.customParams = {};
    // this.player.animations.add('walking', [0, 1, 2, 1], 6, true)
    // this.player.play('walking')

    this.game.add.existing(this.ground)
    this.game.add.existing(this.platform)
    this.game.add.existing(this.player)
    this.createOnscreenControls();
  }

  update () {
    this.game.physics.arcade.collide(this.player, this.ground, this.landed)
    this.game.physics.arcade.collide(this.player, this.platform, this.landed)
    this.player.body.velocity.x = 0;
    
    if(this.cursors.left.isDown || this.player.customParams.isMovingLeft) {
      this.player.body.velocity.x = -this.RUNNING_SPEED;
    }
    else if(this.cursors.right.isDown || this.player.customParams.isMovingRight) {
      this.player.body.velocity.x = this.RUNNING_SPEED;
    }

    if((this.cursors.up.isDown || this.player.customParams.mustJump) && this.player.body.touching.down) {
      this.player.body.velocity.y = -this.JUMPING_SPEED;
      this.player.customParams.mustJump = false;
    }
        
  }

  landed (player, ground) {
   // console.log('landed')
  }

  createOnscreenControls(){
    if (this.desktop) {
    this.leftArrow = this.add.button(20, 535, 'arrowButton');
    this.rightArrow = this.add.button(110, 535, 'arrowButton');
    this.actionButton = this.add.button(280, 535, 'actionButton');
    } else {
      this.leftArrow = this.add.button(20, 470, 'arrowButton');
      this.rightArrow = this.add.button(110, 470, 'arrowButton');
      this.actionButton = this.add.button(280, 470, 'actionButton');
    }

    this.leftArrow.alpha = 0.5;
    this.rightArrow.alpha = 0.5;
    this.actionButton.alpha = 0.5;

    this.actionButton.events.onInputDown.add(function(){
      this.player.customParams.mustJump = true;
    }, this);

    this.actionButton.events.onInputUp.add(function(){
      this.player.customParams.mustJump = false;
    }, this);

    //left
    this.leftArrow.events.onInputDown.add(function(){
      this.player.customParams.isMovingLeft = true;
    }, this);

    this.leftArrow.events.onInputUp.add(function(){
      this.player.customParams.isMovingLeft = false;
    }, this);

    this.leftArrow.events.onInputOver.add(function(){
      this.player.customParams.isMovingLeft = true;
    }, this);

    this.leftArrow.events.onInputOut.add(function(){
      this.player.customParams.isMovingLeft = false;
    }, this);

    //right
    this.rightArrow.events.onInputDown.add(function(){
      this.player.customParams.isMovingRight = true;
    }, this);

    this.rightArrow.events.onInputUp.add(function(){
      this.player.customParams.isMovingRight = false;
    }, this);

    this.rightArrow.events.onInputOver.add(function(){
      this.player.customParams.isMovingRight = true;
    }, this);

    this.rightArrow.events.onInputOut.add(function(){
      this.player.customParams.isMovingRight = false;
    }, this);
  }

  render () {
    if (__DEV__) {
     // this.game.debug.spriteInfo(this.mushroom, 32, 32)
    }
  }
}

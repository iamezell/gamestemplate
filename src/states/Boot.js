import Phaser from 'phaser'
import WebFont from 'webfontloader'

export default class extends Phaser.State {
  init () {
    this.stage.backgroundColor = '0x89d7fb'
    this.fontsReady = false
    this.fontsLoaded = this.fontsLoaded.bind(this)
    if(!this.game.device.desktop) {
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL
      this.scale.pageAlignHorizontally = true
      this.scale.pageAlignVertically = true
    }
    this.game.physics.startSystem(Phaser.Physics.ARCADE)
    this.game.physics.arcade.gravity.y = 1000

    

    // we'll execute next lines only if the game is not running on a desktop
    if(!this.game.device.desktop){
      /*  we want the game to run only in portrait mode, so we need something
          to force the game to run in only one orientation.
          forceOrientation method enables generation of incorrect orientation signals
          which we can handle to warn players they are playing in the wrong orientation  */
      this.game.scale.forceOrientation(false, true);

      // this function is executed when the game enters in an incorrect orientation
      this.game.scale.enterIncorrectOrientation.add(function(){

          // pausing the game. a paused game doesn't update any of its subsystems
          game.paused = true;

          // hiding the canvas
          document.querySelector("canvas").style.display = "none";

          // showing the div with the "wrong orientation" message
          document.getElementById("wrongorientation").style.display = "block";
      })

      // this function is executed when the game enters in an correct orientation
      game.scale.leaveIncorrectOrientation.add(function(){

          // resuming the game
          game.paused = false;

          // showing the canvas
          document.querySelector("canvas").style.display = "block";

          // hiding the div with the "wrong orientation" message
          document.getElementById("wrongorientation").style.display = "none";
      })
  }
  /*  setting scale mode to cover the larger area of the window while
            keeping display ratio and show all the content.
            we know we are covering the entire area of a portrait device thanks to the
            way we set game width and height  */
            // this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            
            // centering the canvas horizontally and vertically
            //this.game.scale.pageAlignHorizontally = true;
            //this.game.scale.pageAlignVertically = true;
            
            // prevent the game to pause if it loses focus.
            this.game.stage.disableVisibilityChange = true;

  }

  preload () {
    WebFont.load({
      google: {
        families: ['Bangers']
      },
      active: this.fontsLoaded
    })

    let text = this.add.text(this.world.centerX, this.world.centerY, 'loading fonts', { font: '16px Arial', fill: '#dddddd', align: 'center' })
    text.anchor.setTo(0.5, 0.5)

    this.load.image('loaderBg', './assets/images/loader-bg.png')
    this.load.image('floor', './assets/sprites/floor.png')
    this.load.image('ladder', './assets/sprites/ladder.png')
    this.load.image('coinparticle', './assets/sprites/coinparticle.png')
    this.load.image('spike', './assets/sprites/spike.png')
    this.load.image('cloud', './assets/sprites/cloud.png')
    this.load.image('arrow', './assets/sprites/arrow.png')
    this.load.image('monster', './assets/sprites/monster.png')
    this.load.image('spikedmonster', './assets/sprites/spikedmonster.png')
    this.load.image('tap', './assets/sprites/tap.png')
    this.load.audio('coinsound', './assets/sounds/coin.mp3')
    this.load.image('jump', './assets/sounds/jump.mp3')
    this.load.image('hurt', './assets/sounds/hurt.mp3')
   

    this.load.spritesheet('hero', 'assets/sprites/hero.png', 24, 48);    
    this.load.spritesheet('coin', 'assets/sprites/coin.png', 48, 48);
    this.load.spritesheet('fire', 'assets/sprites/fire.png',  32, 58);

    /*  you can also use bitmap font to create your own font with effects applied to it
            or just use fonts which aren't the old boring arial, verdana, etc.
            as with all load operations the first parameter is the key
            next is the bitmap font file itself, usually a png image
            finally is the path to the fnt file that goes with the font.
            You can create your bitmap fonts with the free online tool Littera - http://kvazars.com/littera/  */
            game.load.bitmapFont("font",  'assets/fonts/font.png',  'assets/fonts/font.fnt')


  }

  render () {
    if (this.fontsReady) {
      this.state.start('Splash')
    }
  }

  fontsLoaded () {
    this.fontsReady = true
  }
}

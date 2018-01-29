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
    
  }

  update () {
    
        
  }

  landed (player, ground) {
   // console.log('landed')
  }

  createOnscreenControls(){
  }

  render () {
    if (__DEV__) {
     // this.game.debug.spriteInfo(this.mushroom, 32, 32)
    }
  }
}

export default class Boot extends Phaser.Scene {

  preload() {

  }

  create() {
    console.log("screen", this.game.config.width, this.game.config.height)
    
    this.game.scene.start("Main")
  }
}
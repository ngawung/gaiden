/**
 * Factory testing for DialogieBox and Character
 */

export default class FactoryScene extends Phaser.Scene {
  
  preload() {
    
  }
  
  create() {
    
    const textData = [
      "Hello there...",
      "this is [b]BB Tags[/b] with different [color=#c73e5c]color[/color]",
      `also i can change different time scale ${JSON.stringify({timeScale: 0.2})}like this text here`,
      `there is also... ${JSON.stringify({delay: 2000})}delay in this text`
    ]
    
  }
  
  runTextData(data) {
    
  }
  
}
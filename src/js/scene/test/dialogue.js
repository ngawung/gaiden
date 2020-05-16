/*
 * Test Scene for DialogueBox
 *
 */

export default class extends Phaser.Scene {
  
  preload() {
    
  }
  
  create() {
    const data = {
      timeScale: 0.1,
      delay: 3000,
      emit: "Heloo",
      delayEmit: "Done"
    }
    
    const box = this.add.gaiden("DialogueBox", {
      scene: this,
      content: `[b]Heloo[/b]ooooooo.....test this is a ${JSON.stringify(data)}long text. Hope you enjoy`
    })
    
    box.addListener(this.game.gaidenEvent.DIALOGUE_EMIT, data => {
      //console.log(data);
    })
    
    box.addListener(this.game.gaidenEvent.DIALOGUE_DELAY_EMIT, data => {
      //console.log(data)
    })
    
    box.once(this.game.gaidenEvent.DIALOGUE_DONE, data => {
      //console.log("finish")
    })
    
    
    // z order
    
    const box1 = this.add.rectangle(30, 30, 40, 40, 0x001fff)
    const box2 = this.add.rectangle(40, 40, 40, 40, 0x1aff00)
    
    this.time.addEvent({
      delay: 300,
      loop: true,
      callback: () => {
        box1.depth += 1
      }
    })
    
  }
  
}
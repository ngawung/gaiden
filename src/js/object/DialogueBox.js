/**
 * DialogueBox for conversation
 * 
 **/

export default class DialogueBox extends Phaser.GameObjects.Container {
  
  constructor({ scene, content, onDone }) {
    super(scene, 0, scene.game.config.height - 160);
    
    // prepare meta
    this.onDone = onDone;
    this.content = content;
    this.pointer = 0;
    
    // main function
    this.render();
    this.run();
    
  }
  
  render() {
    // add box background
    const box = new Phaser.GameObjects.Rectangle(this.scene, 0, 0, this.scene.game.config.width, 160, "#000", 0.5);
    box.setOrigin(0, 0);
    this.add(box);
    
    // prepare text format
    const tf = {
      fontFamily: "Munro",
      fontSize: "16px",
      color: "#fff",
      wrap: {
        mode: "word",
        width: 220
      }
    };
    
    // add blank text
    this.text = new RexPlugins.GameObjects.BBCodeText(this.scene, 10, 10, "", tf);
    this.text.setOrigin(0, 0);
    this.add(this.text);
    
  }
  
  /**
   * Run time event loop
   **/
  run() {
    this.runEvent = this.scene.time.addEvent({
      delay: 50,
      loop: true,
      timeScale: 1,
      callback: this.write,
      callbackScope: this
    });
    
  }
  
  /**
   * Write text per char
   **/
  write() {
    this.checkBBTag();
    
    this.text.text += this.content.charAt(this.pointer);
    this.pointer++;
    
    this.checkJSON();
    
    if (this.pointer > this.content.length) {
      this.runEvent.remove();
      if (this.onDone) this.onDone();
      this.emit(this.scene.game.gaidenEvent.DIALOGUE_DONE);
    }
    
  }
  
  /**
   * Check for BB tag then write all
   **/
  checkBBTag() {
    if (this.content.charAt(this.pointer) == "[") {
      const end = this.content.indexOf("]", this.pointer);
      if (end < 0) return;
      
      const substring = this.content.substring(this.pointer, end + 1);
      
      this.text.text += substring;
      this.pointer += substring.length;
      
      return;
    }
  }
  
  /**
   * Apply changes using json
   * { timeScale, delay, emit, delayEmit }
   **/
  checkJSON() {
    if (this.content.charAt(this.pointer) == "{") {
      const end = this.content.indexOf("}", this.pointer);
      if (end < 0) return;
      
      const substring = this.content.substring(this.pointer, end + 1);
      const data = JSON.parse(substring);
      
      // change timeScale
      if (data.hasOwnProperty("timeScale")) {
        this.runEvent.timeScale = data.timeScale;
      }
      
      // add delay
      if (data.hasOwnProperty("delay")) {
        const timeScaleCache = this.runEvent.timeScale;
        this.runEvent.timeScale = 0;
        this.scene.time.addEvent({
          delay: data.delay,
          callback: () => {
            if (data.hasOwnProperty("delayEmit")) this.emit(this.scene.game.gaidenEvent.DIALOGUE_DELAY_EMIT, data.delayEmit);
            this.runEvent.timeScale = timeScaleCache;
          }
        });
      }
      
      // emit event
      if (data.hasOwnProperty("emit")) {
        this.emit(this.scene.game.gaidenEvent.DIALOGUE_EMIT, data.emit);
      }
      
      
      this.pointer += substring.length;
      
      return;
    }
  }
  
  // return time loop event
  getRunEvent() {
    if (this.runEvent) return this.runEvent;
  }
  
}
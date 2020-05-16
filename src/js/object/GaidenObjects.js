/**
 *  Global plugin for Gaiden custom object
 *
 **/

// import custom object here
import DialogueBox from "./DialogueBox.js";



export default class GaidenObjects extends Phaser.Plugins.BasePlugin {
  
  constructor(pluginManager) {
    super(pluginManager);
    
    // registerGameObject so i can simply this.add.gaiden
    pluginManager.registerGameObject("gaiden", this.addGaiden);
  }
  
  addGaiden(name, args) {
    // store custom object using Map/Dictionary
    const list = new Map([
      ["DialogueBox", DialogueBox]
    ]);
    
    if (!list.has(name)) {
      throw new Error(`Cant find ${name} in list`);
    }
    
    // Declare custom object
    const result = new (list.get(name))(args);
    
    this.displayList.add(result);
    
    // does it have preUpdate?
    if (result.preUpdate) {
      this.updateList.add(result);
    }
    
    return result;
    
  }
  
}
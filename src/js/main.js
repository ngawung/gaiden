import Phaser from "phaser/dist/phaser.min.js";

import GaidenEvent from "./event/GaidenEvent.js";

// plugins
import BBCodeTextPlugin from 'phaser3-rex-plugins/dist/rexbbcodetextplugin.min.js';

// objects
import GaidenObjects from "./object/GaidenObjects.js";

// scenes
import boot_scene from "./scene/boot.js";
import dialogue_scene from "./scene/test/dialogue.js";

class Game extends Phaser.Game {
  
  constructor() {
    // Screen settings
    const GAME_WIDTH = 240;
    const GAME_HEIGHT = 400;
    
    // Game meta
    const GAME_TITLE = "Rune Factory Another Story";
    const GAME_URL = "127.0.0.1:3000";
    const GAME_VERSION = "1.0.0";
    
    // Fix fullscreen meta
    const DPR = window.devicePixelRatio;
    const HTML_WIDTH = window.innerWidth;
    const HTML_HEIGHT = window.innerHeight;
    
    // turn height to fullscreen
    const adjustedHeight = Math.floor((GAME_WIDTH * HTML_HEIGHT) / HTML_WIDTH);
    
    super({
      title: GAME_TITLE,
      url: GAME_URL,
      version: GAME_VERSION,
      type: Phaser.AUTO,
      backgroundColor: '#969fa3',
      pixelArt: true,
      scale: {
          mode: Phaser.Scale.FIT,
          width: GAME_WIDTH,
          height: adjustedHeight,
          zoom: 1
      },
      disableContextMenu: true,
      plugins: {
        global: [
          {key: 'rexBBCodeTextPlugin', plugin: BBCodeTextPlugin, start: true},
          {key: 'gaidenObjects', plugin: GaidenObjects, start: true},
        ]
      }
    });
    
    // asign GaidenEvent to phaser game object
    this.gaidenEvent = GaidenEvent;
    
    /* 
     * Add new scene here
     */
    this.scene.add("Boot", boot_scene);
    
    /* 
     * Add new testing scene here
     */
    this.scene.add("test-dialogue", dialogue_scene);
    
    
    // Start scene
    this.scene.start("test-dialogue");
    
    // Prepare fps metacand grab fps element
    this.totalTime = this.frameCount = 0;
    this.fps = document.getElementById("fps");
  }
  
  step(time, dt) {
    super.step(time, dt);
    this.totalTime += dt;
    this.frameCount++;
    
    // calculate fps using frameCount
    if (this.totalTime > 500) {
      this.fps.innerHTML = Math.floor((this.frameCount / this.totalTime) * 1000);
      this.totalTime = this.frameCount = 0;
    }
  }
  
}


const game = new Game();
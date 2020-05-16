var fs = require('fs');
var browserify = require('browserify');
var watchify = require('watchify');

var b = browserify({
  entries: ['src/js/main.js'],
  paths: ["node_modules"],
}).transform("babelify", {
    global: true,
    only: [/^(?:.*\/node_modules\/phaser3-rex-plugins\/|(?!.*\/node_modules\/)).*$/],
    presets: ["@babel/preset-env"]
  })
  .bundle()
  .pipe(fs.createWriteStream("www/bundle/main.js"));
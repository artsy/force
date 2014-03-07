coffee = require 'coffee-script'
fs = require 'fs'

build = ->
  fs.readFile 'jquery.fillwidth.coffee', (err, data) ->
    fs.writeFile 'jquery.fillwidth.js', coffee.compile data.toString()
    fs.writeFile 'example/src/jquery.fillwidth.js', coffee.compile data.toString()
  console.log 'compiled'

task 'build', 'generate the js for test and in root', build

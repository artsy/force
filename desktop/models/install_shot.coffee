AdditionalImage = require './additional_image.coffee'

module.exports = class InstallShot extends AdditionalImage

  sizes: [
    ['square', { width: 230, height: 230}]
    ['medium', { width: Infinity, height: 260}]
    ['general', { width: 320, height: 210}]
    ['large', { width: 640, height: 640}]
    ['featured', { width: 720, height: 480}]
    ['larger', { width: 1024, height: 1024}]
  ]

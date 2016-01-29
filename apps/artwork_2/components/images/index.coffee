ArtworkImagesView = require './view.coffee'

module.exports = ->
  view = new ArtworkImagesView el: $('.js-artwork-images')
  view.__activate__ view.images().last().data 'id'

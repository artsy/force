ArtworkImagesView = require './view.coffee'
ArtworkVideoView = require '../video/view.coffee'

module.exports = ->
  view = new ArtworkImagesView el: $('.js-artwork-images')
  view.__activate__ view.images().last().data 'id'

  view.$el
    .find '.js-artwork-images-play'
    .click (e) ->
      e.preventDefault()

      video = new ArtworkVideoView
      view.$el.html video.render().$el

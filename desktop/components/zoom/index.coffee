modalize = require '../modalize/index.coffee'

module.exports = (src) ->
  (img = new Image).src = src

  modal = modalize render: ->
    $el: $("<img src='#{src}'>")

  modal.load (done) ->
    img.onerror = done
    img.onload = ->
      modal.view.dimensions.width = img.width
      done()

  modal

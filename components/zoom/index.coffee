modalize = require '../modalize/index.coffee'

module.exports = (src) ->
  (img = new Image).src = src

  $img = $("<img src='#{src}'>")

  modal = modalize render: -> $el: $img

  modal.load (done) ->
    $img.on 'load', ->
      modal.view.dimensions.width = img.width
      done()

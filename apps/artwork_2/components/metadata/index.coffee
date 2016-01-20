module.exports = ->
  $('.js-artwork-metadata__partner__phone').click (e) ->
    e.preventDefault()
    $(this).hide()
    $('.js-artwork-metadata__partner__phone__locations').show()

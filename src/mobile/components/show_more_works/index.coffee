module.exports =
  seeMoreArtworks: (e) ->
    if $(e.currentTarget).prev().hasClass 'toggled'
      height = $(e.currentTarget).prev().data 'height'
      $(e.currentTarget).prev()
        .animate({'height': height, 'max-height': height}, 1000)
        .removeClass 'toggled'
      $(e.currentTarget).find('.circle-border-icon-button').css 'transform', 'none'
    else
      $(e.currentTarget).prev()
        .animate({'height': $(e.currentTarget).prev().prop('scrollHeight'), 'max-height': 9999}, 1000)
        .addClass 'toggled'
      $(e.currentTarget).find('.circle-border-icon-button').css 'transform', 'rotate(180deg)'

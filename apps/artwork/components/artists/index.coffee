tabs = require '../../../../components/side_tabs/index.coffee'
gradient = require '../../../../components/gradient_blurb/index.coffee'

module.exports = ->
  tabs $('.js-artwork-artist-tabs')

  gradient $('.artwork-artist__content__biography'), limit: 175

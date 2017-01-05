tabs = require '../../../../components/side_tabs/index.coffee'
gradient = require '../../../../components/gradient_blurb/index.coffee'

module.exports = ->
  tabs $('.js-artwork-additional-info')

  $el = $('.artwork-additional-info__content__about-the-work')
  gradient($el, limit: 175) if $el.length

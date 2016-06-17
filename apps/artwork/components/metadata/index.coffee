follow = require '../../lib/follow.coffee'

module.exports = ->
  $el = $('.js-artwork-metadata')

  follow $el.find '.js-artist-follow-button'

{ PARTNER } = require('sharify').data
inquire = require '../../lib/inquire.coffee'
follow = require '../../lib/follow.coffee'

module.exports = (data) ->
  $el = $('.js-artwork-partner')

  $el
    .find '.js-artwork-partner-contact'
    .click (e) ->
      e.preventDefault()

      $this = $(this)
      $this.attr 'data-state', 'loading'

      inquire PARTNER.artwork.id
        .then ->
          $this.attr 'data-state', null
        .catch ->
          $this.attr 'data-state', 'error'

  follow $el.find('.js-artwork-partner-follow')

follow = require '../../lib/follow.coffee'
Form = require '../../../../components/form/index.coffee'
PendingOrder = require '../../../../models/pending_order.coffee'
analyticsHooks = require '../../../../lib/analytics_hooks.coffee'

module.exports = ->
  $el = $('.js-artwork-metadata')

  follow $el.find('.js-artist-follow-button')

  $el
    .find '.js-artwork-metadata-phone-toggle'
    .click (e) ->
      e.preventDefault()

      $(this).hide()

      $el
        .find '.js-artwork-metadata-phone-toggleable'
        .show()

  $el
    .find '.js-artwork-acquire-button'
    .click (e) ->
      order = new PendingOrder

      form = new Form $form: $el, model: order
      form.submit e, success: ->
        location.assign "/order/#{order.id}/resume?token=#{order.get 'token'}"

      analyticsHooks
        .trigger 'order:item-added', "Artwork:#{order.get 'artwork_id'}"

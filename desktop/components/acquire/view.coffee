CurrentUser = require '../../models/current_user'
mediator = require '../../lib/mediator'
{ modelNameAndIdToLabel } = require '../../lib/analytics_helpers'
analyticsHooks = require '../../lib/analytics_hooks'

module.exports =
  acquireArtwork: (artwork, $target, editionSetId) ->
    return false if @acquiring
    @acquiring = true
    currentUser = new CurrentUser()

    analyticsHooks.trigger 'order:item-added', modelNameAndIdToLabel('artwork', artwork.get('id'))

    currentUser.addToPendingOrder
      artworkId: artwork.get('id')
      editionSetId: editionSetId
      success: (response) =>
        location.assign "/order/#{response.get('id')}/resume?token=#{response.get('token')}"
        @acquiring = false
      error: =>
        @acquiring = false
        $target?.removeClass('is-loading').attr('data-state', 'error')

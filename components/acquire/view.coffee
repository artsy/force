CurrentUser = require '../../models/current_user.coffee'
analytics = require '../../lib/analytics.coffee'
mediator = require '../../lib/mediator.coffee'

module.exports =

  acquireArtwork: (artwork, $target, editionSetId) ->
    return false if @acquiring
    @acquiring = true
    currentUser = new CurrentUser()

    analytics.track.funnel 'Order - item added', analytics.modelNameAndIdToLabel('artwork', artwork.get('id'))

    currentUser.addToPendingOrder
      artworkId: artwork.get('id')
      editionSetId: editionSetId
      success: (response) =>
        location.assign "/order/#{response.get('id')}/resume?token=#{response.get('token')}"
        @acquiring = false
      error: =>
        @acquiring = false
        $target?.removeClass('is-loading').attr('data-state', 'error')

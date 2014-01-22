CurrentUser = require '../../models/current_user.coffee'
analytics   = require '../../lib/analytics.coffee'
mediator    = require '../../lib/mediator.coffee'

module.exports =

  acquireArtwork: (artwork, $target, editionSetId) ->
    return false if @acquiring
    @acquiring = true
    currentUser = new CurrentUser()

    analytics.track.funnel 'Order - item added', analytics.modelToLabel(artwork)

    currentUser.addToPendingOrder
      artworkId: artwork.get('id')
      editionSetId: editionSetId
      success: (response) =>
        location.href = "/order/#{response.get('id')}/resume?token=#{response.get('token')}"
        $target?.removeClass('loading')
        @acquiring = false
      error: =>
        @acquiring = false
        $target?.removeClass('loading')

CurrentUser = require '../../models/current_user.coffee'
analyticsHooks = require '../../lib/analytics_hooks.coffee'
analytics = require '../../lib/analytics.coffee'

module.exports =

  acquireArtwork: (artwork, $target, editionSetId) ->
    return false if @acquiring
    @acquiring = true
    currentUser = new CurrentUser()

    analyticsHooks.trigger 'track', 'Order - item added', analytics.modelNameAndIdToLabel('artwork', artwork.get('id'))

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

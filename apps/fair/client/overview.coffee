_              = require 'underscore'
Backbone       = require 'backbone'
sd             = require('sharify').data
Clock          = require '../../../components/auction_clock/view.coffee'
FeedItems      = require '../../../components/feed/collections/feed_items.coffee'
FeedView       = require '../../../components/feed/client/feed.coffee'
Artists        = require '../../../collections/artists.coffee'

module.exports = class Overview extends Backbone.View

  initialize: (options) ->
    @fair = options.fair
    @renderClock()
    if sd.CURRENT_USER?
      @renderWorksForYou()
    _.defer =>
      @fetchBooths()

  fetchBooths: ->
    url = "#{@fair.url()}/shows"
    additionalParams = artworks: true, sortOrder: @sortOrder
    new FeedItems().fetch
      url: url
      data:
        _.extend(additionalParams, size: 3)
      success: (items) =>
        if items.models.length > 0
          items.urlRoot = url
          new FeedView
            el               : @$('.browse-section.booths .feed')
            feedItems        : items
            additionalParams : additionalParams
          @$('.browse-sections .browse-section.booths').show()

  renderClock: ->
    @clock = new Clock
      modelName: "Fair"
      model: @fair
      el: @$('.auction-clock')
    @clock.start()

  renderWorksForYou: ->
    url = "#{sd.ARTSY_URL}/api/v1/me/follow/artists"
    data = fair_id: @fair.get('id')
    followingArtists = new Artists()
    followingArtists.fetchUntilEnd
      url: url
      data: data
      success: =>
        artistNames = @formatArtists followingArtists, 2
        if artistNames
          @$('.container-left .large-section-subheading').text "Works by #{artistNames}"

  formatArtists: (followArtists, max=Infinity) ->
    return unless followArtists?.length
    artists = followArtists.map (followArtist) ->
      artist = followArtist.get('artist')
      return artist.name

    if artists?.length < 2
      "#{artists.join(', ')}"
    if artists?.length <= max
      "#{artists[0..(artists.length - 2)].join(', ')} and #{artists[artists?.length - 1]}"
    else
      "#{artists[0..(max-1)].join(', ')} and #{artists[(max-1)..].length - 1} more"

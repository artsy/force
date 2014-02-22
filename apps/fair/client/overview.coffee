_              = require 'underscore'
Backbone       = require 'backbone'
sd             = require('sharify').data
Clock          = require '../../../components/auction_clock/view.coffee'
FeedItems      = require '../../../components/feed/collections/feed_items.coffee'
FeedView       = require '../../../components/feed/client/feed.coffee'
Artists        = require '../../../collections/artists.coffee'
mediator       = require '../../../lib/mediator.coffee'

module.exports = class Overview extends Backbone.View

  initialize: (options) ->
    @fair = options.fair
    @renderClock()
    if sd.CURRENT_USER?
      @renderWorksForYou()
    else
      @$('.container-left .large-section').on 'click', ->
        mediator.trigger 'open:auth', { mode: 'register', copy: 'Sign up to follow artists and exhibitors' }
        false

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
    else if artists?.length <= max
      "#{artists[0..(artists.length - 2)].join(', ')} and #{artists[artists?.length - 1]}"
    else
      "#{artists[0..(max-1)].join(', ')} and #{artists[(max-1)..].length - 1} more"

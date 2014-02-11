_              = require 'underscore'
Backbone       = require 'backbone'
sd             = require('sharify').data
FeedItems      = require '../../../components/feed/collections/feed_items.coffee'
FeedView       = require '../../../components/feed/client/feed.coffee'
Artist         = require '../../../models/artist.coffee'

module.exports = class ArtistsView extends Backbone.View

  url: ->
    "#{@fair.url()}/shows"

  sortOrder: "-updated_at"

  headerText: (artist) ->
    "#{artist.get('name')} at #{@fair.get('name')}"

  initialize: (options) ->
    { @fair, @profile, @artistId } = options

    artist = new Artist id: @artistId
    artist.fetch
      success: =>
        @$('h1').text @headerText(artist)
        unless sd.NODE_ENV == 'test'
          @$el.show()

        additionalParams =
          artworks  : true        # only shows that have artworks
          sortOrder : @sortOrder
          artist    : @artistId

        new FeedItems().fetch
          url: @url()
          data:
            _.extend(additionalParams, size: 3)
          success: (items) =>
            if items.models.length > 0
              items.urlRoot = @url()
              @feed = new FeedView
                el               : @$('.feed')
                feedItems        : items
                additionalParams : additionalParams

  destroy: ->
    @feed?.destroy()

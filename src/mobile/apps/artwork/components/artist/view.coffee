_ = require 'underscore'
Backbone = require 'backbone'
FollowArtists = require '../../../../collections/follow_artists.coffee'
FollowButtonView = require '../../../../components/follow_button/view.coffee'
CurrentUser = require '../../../../models/current_user.coffee'
jqueryFillwidthLite = require 'jquery-fillwidth-lite'
imagesLoaded = require 'imagesloaded'

module.exports = class ArtworkArtistView extends Backbone.View

  events:
    'click .js-aama-accordion-link': 'toggleTabContent'

  initialize: ({ @artwork }) ->
    @followArtists = new FollowArtists []
    @setupFillwidthLite()
    @setupFollowButton()

  setupFollowButton: () ->
    artistIds = _.pluck(@artwork.artists, 'id')
    _.map(artistIds, (id) =>
      new FollowButtonView
        collection: @followArtists
        el: @$(".aama_follow[data-artist-id=#{id}]")
        type: 'Artist'
        followId: id
        isLoggedIn: not _.isNull CurrentUser.orNull()
        context_module: 'Artwork page'
    )
    @followArtists.syncFollows artistIds

  toggleTabContent: (e) ->
    e.preventDefault()
    id = $(e.currentTarget).attr 'data-id'

    $(e.currentTarget).toggleClass 'is-active'
    $('.js-aama-content').filter("[data-id=#{id}]").toggleClass 'is-active'

  setupFillwidthLite: () ->
    return unless @artwork.artists.length
    jqueryFillwidthLite($, _, imagesLoaded)
    _.each($('.artwork-artist-module__images'), (el) ->
      $(el).fillwidthLite({
        targetHeight: 100
        gutterSize: 5
      })
    )

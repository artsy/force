Backbone = require 'backbone'
_ = require 'underscore'
sd = require('sharify').data
Artists = require '../collections/artists.coffee'
Artist = require './artist.coffee'

# A convenience model for checking if a user follows an artists in
# bulk. Structurally similar to `artwork_collection` but DOES NOT
# coresspond to a server side model
module.exports = class FollowArtistCollection extends Backbone.Model

  url: -> "#{sd.GRAVITY_URL}/api/v1/me/follow"

  # This collection keeps around known artists that were *not*
  # followed to prevent duplicate requests.
  unfollowedCache: []

  # All artist ids
  repoArtistIds: []

  requestSlugMax: 20
  pendingRequests: []
  completedRequests: []

  initialize: ->
    @set 'artists', new Artists

  addRepoArtists: (artists) ->
    @repoArtistIds = _.union(@repoArtistIds, artists.pluck('id'))

  # Additional trigger for the specific artist to reduce tons of
  # bindings that will loop through the collection to see if a specific
  # work was added
  follow: (artistId, options) ->
    artist = new Artist(id: artistId)
    @_follow artist, options
    model = new Backbone.Model
    model.url = "#{@url()}/artist/#{artistId}"
    model.save
      success: options?.success
      error: (error) =>
        unless sd.NODE_ENV == 'test'
          @_unfollow artist, options
        options?.error? error
    false

  _follow: (artist, options) ->
    if options?.silent
      @get('artists').add artist, { silent: true, at: 0 }
    else
      @get('artists').add artist, { at: 0 }
      @trigger "add:#{artist.get('id')}"
    @removeFromUnfollowedCache artist

  unfollow: (artistId, options) ->
    artist = new Artist(id: artistId)
    @_unfollow artist, options
    model = new Backbone.Model
    model.url = "#{@url()}/artist/#{artistId}"
    model.isNew = -> false
    model.destroy
      success: options?.success
      error: (error) =>
        unless sd.NODE_ENV == 'test'
          @_follow artist, options
        options?.error?(error)

  _unfollow: (artist, options) ->
    if options?.silent? and options.silent
      @get('artists').remove artist, { silent: true }
    else
      @get('artists').remove artist
      @trigger "remove:#{artist.get('id')}"
    @unfollowedCache.push artist.get('id')
    @unfollowedCache.sort()

  isFollowed: (artist) ->
    @get('artists').get(artist.get('id'))?

  broadcastFollowed: ->
    @get('artists').each((artist) => @trigger("add:#{artist.get('id')}"))

  # Returns all ids of the Repository artists that are not in
  # this collection and are not in this.unfollowedCache.
  artistIdsToSync: ->
    # Filter out the current favorited artists, and requested unfollows
    artistIds = []
    if @repoArtistIds.length > 0
      # Filter out known follows
      artistIds = _.difference @repoArtistIds, @get('artists').pluck('id')
      # Filter out known unfollows,
      artistIds = _.difference artistIds, @unfollowedCache

    # These are ids we have not requested before
    artistIds

  removeFromUnfollowedCache: (artist) ->
    index = _.indexOf(@unfollowedCache, artist.get('id'), true)
    @unfollowedCache.splice(index, 1) if index isnt -1

  # Call this from views after one or more artists are fetched
  syncFollowedArtists: ->
    return false unless window.currentUser

    # Re-trigger any existing follows.
    @broadcastFollowed()

    if @allFetched
      # clean up the internal state
      @unfollowedCache = @pendingRequests = @completedRequests = []
      return

    artistIds = @artistIdsToSync()
    return false if artistIds.length < 1

    # Assume all of these new ids to check will fail (are not followed)
    if @unfollowedCache.length is 0
      # if this is the first run, assume all of these are not followed
      @unfollowedCache = artistIds
    else
      _.each artistIds, (id) => @unfollowedCache.push(id)
    @unfollowedCache.sort()
    @unfollowedCache = _.uniq @unfollowedCache, true

    # Add URLs to the queue, @requestSlugMax artistIds at a time
    artistIdsCopy = artistIds[..]
    paramIds = artistIdsCopy[0..@requestSlugMax]
    while paramIds.length > 0
      artistIdsCopy = artistIdsCopy[@requestSlugMax..]
      # Todo: find a jQuery.param substitute
      params = $.param({ artists: paramIds })
      if _.indexOf(@completedRequests, params, true) is -1
        @pendingRequests.push params
      paramIds = artistIdsCopy[0..@requestSlugMax]
    @processRequests()
    true

  processRequests: ->
    return unless @pendingRequests.length > 0
    params = @pendingRequests.pop()
    @fetchArtists
      params: params
      success: =>
        # Keep track of completed requests
        @completedRequests.push params
        @completedRequests.sort()
        @processRequests()

  fetchArtists: (options) ->
    artists = new Artists
    artists.url = "#{@url()}/artists?#{options.params}"
    artists.fetch
      error: (response) =>
        options?.error?(response)
      success: (response) =>
        followedArtists = []
        _.each response.models, (followedArtistJSON) =>
          followedArtist = new Artist followedArtistJSON
          followedArtists.push followedArtist
          @removeFromUnfollowedCache followedArtist
          # We're adding these wholesale, so we need to trigger 'add' for individual listeners
          _.defer => @trigger "add:#{followedArtistJSON.id}"
        @get('artists').add followedArtists, { silent: true }
        options?.success?(followedArtists)
        @trigger 'artistsFetched'

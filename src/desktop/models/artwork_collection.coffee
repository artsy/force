Backbone = require 'backbone'
_ = require 'underscore'
sd = require('sharify').data
{ Artworks } = require '../collections/artworks'
Artwork = require './artwork.coffee'

#
# Lifecycle for determining if artworks belong to this collection:
#
#  1. When artworks are initialized in groups
#     `CurrentUser.defaultArtworkCollection().syncSavedArtworks` is called.
#  2. Now `@artworkIdsToSync` looks at its models, the contents of
#     `repoArtworkIds`, and an array of artwork slugs that are currently
#     being requested or have already been requested, `@unsavedCache`. The result is
#     an array or artwork slugs to ask the server if they belong in this collection.
#  3. This array result is queued as an array of params, `@pendingRequests`, in groups
#     of `@requestSlugMax` (currently 20). This keeps server response time reasonable.
#  4. Results fire add events for individual artworks and are silently added to the
#     collection in groups until the `@pendingRequets` is empty.
#  5. If `UserFavorites` gets to its footer, it will set `@allFetched`
#     to true, some internal clean up is done, and no more requests are necessary.
#

# Corresponds to the rails model called 'Collection'
module.exports = class ArtworkCollection extends Backbone.Model

  allFetched: false
  defaultPageSize: 20
  defaultSortOrder: "-position"

  # This collection keepss around known artworks that were *not* saved
  # to prevent duplicate requests.
  unsavedCache: []

  # All artwork ids
  repoArtworkIds: []

  requestSlugMax: 20
  pendingRequests: []
  completedRequests: []

  urlRoot: -> "#{sd.API_URL}/api/v1/collection"

  defaults:
    id: 'saved-artwork'

  initialize: ->
    throw "userId is required" unless @get('userId')
    @set 'artworks', new Artworks

  addRepoArtworks: (artworks) ->
    ids = if artworks instanceof Backbone.Collection then artworks.pluck('id') else _.pluck(artworks, 'id')
    @repoArtworkIds = _.union(@repoArtworkIds, ids)

  # Additional trigger for the specific artwork to reduce tons of
  # bindings that will loop through the collection to see if a specific
  # work was added
  saveArtwork: (artworkId, options) ->
    artwork = new Artwork(id: artworkId)
    @_save artwork, options
    model = new Backbone.Model
    model.url = "#{@url()}/artwork/#{artworkId}?user_id=#{@get('userId')}"
    model.save null,
      data: options?.data
      success: options?.success
      error: (error) =>
        unless sd.NODE_ENV == 'test'
          @_unsave artwork, options
        options?.error?.apply this, arguments
    false

  _save: (artwork, options) ->
    if options?.silent
      @get('artworks').add artwork, { silent: true, at: 0 }
    else
      @get('artworks').add artwork, { at: 0 }
      @trigger "add:#{artwork.get('id')}"
    @removeFromUnsavedCache artwork

  unsaveArtwork: (artworkId, options) ->
    artwork = new Artwork(id: artworkId)
    @_unsave artwork, options
    model = new Backbone.Model
    model.url = "#{@url()}/artwork/#{artworkId}?user_id=#{@get('userId')}"
    model.isNew = -> false
    model.destroy
      success: options?.success
      error: (error) =>
        unless sd.NODE_ENV == 'test'
          @_save artwork, options
        options?.error?(error)

  _unsave: (artwork, options) ->
    if options?.silent? and options.silent
      @get('artworks').remove artwork, { silent: true }
    else
      @get('artworks').remove artwork
      @trigger "remove:#{artwork.get('id')}"
    @unsavedCache.push artwork.get('id')
    @unsavedCache.sort()

  isSaved: (artwork) ->
    @get('artworks').get(artwork.id)?

  broadcastSaved: ->
    @get('artworks').each((artwork) => @trigger("add:#{artwork.get('id')}"))

  # Returns all ids of the Repository artworks that are not in
  # this collection and are not in this.unsavedCache.
  artworkIdsToSync: ->
    # Filter out the current saved favs, and requested non-favs
    artworkIds = []
    if @repoArtworkIds.length > 0
      # Filter out known saves
      artworkIds = _.difference @repoArtworkIds, @get('artworks').pluck('id')
      # Filter out known unsaves,
      artworkIds = _.difference artworkIds, @unsavedCache

    # These are ids we have not requested before
    artworkIds

  removeFromUnsavedCache: (artwork) ->
    index = _.indexOf(@unsavedCache, artwork.get('id'), true)
    @unsavedCache.splice(index, 1) if index isnt -1

  # Call this from views after one or more artworks are fetched
  syncSavedArtworks: ->
    return false unless sd.CURRENT_USER?.id

    # After adding a work to the collection for the 1st time, we will have a 'real' collection
    @collectionExists = true

    # Re-trigger any existing saves.
    @broadcastSaved()

    if @allFetched
      # clean up the internal state
      @unsavedCache = @pendingRequests = @completedRequests = []
      return

    artworkIds = @artworkIdsToSync()
    return false if artworkIds.length < 1

    # Assume all of these new ids to check will fail (are not saved)
    if @unsavedCache.length is 0
      # if this is the first run, assume all of these are not saved
      @unsavedCache = artworkIds
    else
      _.each artworkIds, (id) => @unsavedCache.push(id)
    @unsavedCache.sort()
    @unsavedCache = _.uniq @unsavedCache, true

    # Add URLs to the queue, @requestSlugMax artworkIds at a time
    artworkIdsCopy = artworkIds[..]
    paramIds = artworkIdsCopy[0..@requestSlugMax]
    while paramIds.length > 0
      artworkIdsCopy = artworkIdsCopy[@requestSlugMax..]
      # Todo: find a jQuery.param substitute
      params = $.param({ artworks: paramIds })
      if _.indexOf(@completedRequests, params, true) is -1
        @pendingRequests.push params
      paramIds = artworkIdsCopy[0..@requestSlugMax]
    @processRequests()
    true

  processRequests: ->
    return unless @pendingRequests.length > 0
    params = @pendingRequests.pop()

    @fetchArtworks
      params: params
      success: =>
        # Keep track of completed requests
        @completedRequests.push params
        @completedRequests.sort()
        @processRequests()

  displayable: -> !@get('private') && @collectionExists

  ensureFetched: (success) ->
    return success() if @get('fetched')
    @on 'change:fetched', success

  # override fetch
  # - pass in user_id and private params
  # - cope with a non-existant collection (users who have never saved an artwork have no collection)
  fetch: (options) ->
    privateCollection = sd.CURRENT_USER?.id == @get('userId')
    model = new Backbone.Model
    model.url = @url()
    model.fetch
      data:
        user_id: @get('userId')
        private: privateCollection
      success: (response) =>
        @collectionExists = true
        @set response
        @set fetched: true
        options?.success?(response)
      error: (response) =>
        @collectionExists = false
        @set fetched: true
        options?.error?(response)

  fetchArtworks: (options) ->
    # ensure that this model is fetched before seeing if artworks are in the collection
    @ensureFetched =>
      artworks = new Artworks
      artworks.url = "#{@url()}/artworks?#{options.params}"
      artworks.fetch
        data:
          user_id: @get('userId')
          private: true
        error: (response) =>
          options?.error?(response)
        success: (response) =>
          savedArtworks = []
          _.each response.models, (savedArtworkJSON) =>
            savedArtwork = new Artwork savedArtworkJSON
            savedArtworks.push savedArtwork
            @removeFromUnsavedCache savedArtwork
            # We're adding these wholesale, so we need to trigger 'add' for individual listeners
            _.defer => @trigger "add:#{savedArtworkJSON.id}"
          @get('artworks').add savedArtworks, { silent: true }
          options?.success?(savedArtworks)
          @trigger 'artworksFetched'

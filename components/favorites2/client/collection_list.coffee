Backbone = require 'backbone'
{ ArtworkCollection } = ArtworkCollections = require '../../../collections/artwork_collections.coffee'

module.exports = class CollectionList extends Backbone.View

  initialize: (options) ->
    { @user, @collections, @collection, @artwork } = options

  events:
    'click .favorites2-collection-list-create button': 'newCollection'
    'keyup .favorites2-collection-list-create input': (e) -> @newCollection() if e.which is 13
    'click .favorites2-collection-list li': 'moveArtwork'

  moveArtwork: (e) ->
    @collection?.removeArtwork @artwork
    col = @collections.at $(e.currentTarget).index()
    if col.isNew() then col.once('sync', => col.saveArtwork @artwork) else col.saveArtwork @artwork
    @collection = col
    @$('.favorites2-collection-list li').removeClass('is-active')
    $(e.currentTarget).addClass('is-active')

  newCollection: ->
    collection = new ArtworkCollection
      name: @$('.favorites2-collection-list-create input').val()
      user_id: @user.get('id')
    @collections.add collection
    collection.save()
    @$('.favorites2-collection-list li:last-child').click()
    false
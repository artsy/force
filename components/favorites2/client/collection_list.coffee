Backbone = require 'backbone'
{ ArtworkCollection } = ArtworkCollections = require '../../../collections/artwork_collections.coffee'
template = -> require('../templates/collection_list.jade') arguments...

module.exports = class CollectionList extends Backbone.View

  initialize: (options) ->
    { @user, @collections, @artwork } = options
    @collections.on 'add:artwork remove:artwork', @render

  render: =>
    oldScrollTop = @$('.favorites2-collection-list').scrollTop()
    @$('.favorites2-collection-list-container').replaceWith template
      collections: @collections.models
      artwork: @artwork
    @$('.favorites2-collection-list').scrollTop(oldScrollTop)

  events:
    'click .favorites2-collection-list-create button': 'newCollection'
    'keyup .favorites2-collection-list-create input': 'onKeyup'
    'click .favorites2-collection-list li:not(.is-active)': 'addArtwork'
    'click .favorites2-collection-list li.is-active': 'removeArtwork'

  addArtwork: (e) ->
    col = @collections.at $(e.currentTarget).index()
    if col.isNew() then col.once('sync', => col.saveArtwork @artwork) else col.saveArtwork @artwork

  removeArtwork: (e) ->
    col = @collections.at $(e.currentTarget).index()
    col.removeArtwork @artwork

  onKeyup: (e) ->
    e.preventDefault()
    if @$('.favorites2-collection-list-create input').val().length > 0
      @$('.favorites2-collection-list-create button').attr('disabled', null)
    else
      @$('.favorites2-collection-list-create button').attr('disabled', 'disabled')
    @newCollection() if e.which is 13

  newCollection: (e) ->
    e?.preventDefault()
    return if @$('.favorites2-collection-list-create button').is(':disabled')
    collection = new ArtworkCollection
      name: @$('.favorites2-collection-list-create input').val()
      user_id: @user.get('id')
    @collections.add collection
    collection.save()
    @$('.favorites2-collection-list li:last-child').click()
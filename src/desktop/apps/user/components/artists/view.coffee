Backbone = require 'backbone'
{ Artists } = require '../../../../collections/artists'
{ Following } = require '../../../../components/follow_button/index'
QuasiInfiniteView = require '../quasi_infinite/view.coffee'
ArtistFillwidthListView = require '../../../../components/artist_fillwidth_list/view.coffee'

module.exports = class ArtistsView extends QuasiInfiniteView
  className: 'settings-artists'

  kind: 'artists'

  initialize: ({ @user }) ->
    @params = new Backbone.Model
      total_count: true
      size: 5
      page: 1

    @artists = new Artists
    @collection = new Following [], kind: 'artist'
    @allFollows = new Following [], kind: 'artist'

    @listenTo @collection, 'sync', @syncFollows

    super

  syncFollows: (follows) ->
    @allFollows.add follows.models

  postRender: ->
    if @artistFillwidthListView?
      @artistFillwidthListView.appendPage @artists, @collection.pluck 'artist'

    else if @collection.length
      @artists.add @collection.pluck 'artist'

      @artistFillwidthListView = new ArtistFillwidthListView
        el: @$('.js-settings-quasi-infinite__collection')
        syncFollows: false
        following: @allFollows
        collection: @artists
        user: @user

      @artistFillwidthListView.fetchAndRender()

      @subViews = [
        @artistFillwidthListView
      ]

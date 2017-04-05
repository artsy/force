{ invoke } = require 'underscore'
Backbone = require 'backbone'
SavedArtworksView = require '../../components/saved_artworks/view'
ArtistsView = require '../../components/artists/view'
CategoriesView = require '../../components/categories/view'
GalleriesInstitutions = require '../../components/galleries_institutions/view'
template = -> require('./index.jade') arguments...

module.exports = class SavesView extends Backbone.View
  subViews: []

  className: 'settings-page__saves'

  initialize: ({ @user }) -> #

  postRender: ->
    savedArtworksView = new SavedArtworksView user: @user
    @$('.js-settings-section__main--saved-artworks')
      .html savedArtworksView.render().$el
    savedArtworksView.fetch()

    artistsView = new ArtistsView user: @user
    @$('.js-settings-section__main--artists')
      .html artistsView.render().$el
    artistsView.fetch()

    categoriesView = new CategoriesView user: @user
    @$('.js-settings-section__main--categories')
      .html categoriesView.render().$el
    categoriesView.fetch()

    galleriesInstitutionsView = new GalleriesInstitutions user: @user
    @$('.js-settings-section__main--galleries-institutions')
      .html galleriesInstitutionsView.render().$el
    galleriesInstitutionsView.fetch()

    @subViews = [
      savedArtworksView
      artistsView
      categoriesView
      galleriesInstitutionsView
    ]

  render: ->
    @$el.html template
      user: @user
    @postRender()
    this

  remove: ->
    invoke @subViews, 'remove'

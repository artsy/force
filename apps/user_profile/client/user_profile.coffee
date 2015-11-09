_ = require 'underscore'
sd = require('sharify').data
Backbone = require 'backbone'
CurrentUser = require '../../../models/current_user.coffee'
FollowProfileButton = require '../../../components/partner_buttons/follow_profile.coffee'
FollowProfiles = require '../../../collections/follow_profiles.coffee'
ArtworkColumnsView = require '../../../components/artwork_columns/view.coffee'
Artworks = require '../../../collections/artworks.coffee'
{ CURRENT_PATH } = require('sharify').data
ArticlesFeedView = require '../../../components/articles_feed/view.coffee'
Articles = require '../../../collections/articles.coffee'

COLUMN_WIDTH = 300

module.exports = class UserProfileView extends Backbone.View
  events:
    'click a.website': 'openWebsite'

  initialize: (options) ->
    @user = CurrentUser.orNull()

    @following = if @user then new FollowProfiles [] else null
    @setupFollowButton()
    @following?.syncFollows [@model.get('id')]

    @articles = new Articles
    @articles.url = "#{@articles.url}?all_by_author=#{@model.related().owner.id}&published=true&sort=-published_at"

    @model.fetchFavorites(success: ((@favorites) =>), complete: => @render())
    @articles.fetch
      complete: => @render()

  openWebsite: ->
    popup = window.open @model.get('website'), '_blank'
    popup.opener = null

  setupFollowButton: ->
    new FollowProfileButton
      el: @$('.js-profile-header-follow')
      model: @model
      collection: @following

  render: _.after 2, ->
    @setState()
    @renderArticles()
    @renderFavorites()

  setState: ->
    @$el.attr('data-has',
      [
        if (@articles?.length or @articles?.length) then 'articles' else ''
        if @favorites?.length then 'favorites' else ''
      ].join('')
    )

    @$el.attr 'data-path', CURRENT_PATH

  renderArticles: ->
    articlesView = new ArticlesFeedView el: @$('#profile-feed'), collection: @articles
    articlesView.render()

  renderFavorites: ->
    return unless @favorites?.length
    @columnsView = new ArtworkColumnsView
      el: @$('#profile-favorites')
      collection: new Artworks
      artworkSize: 'tall'
      numberOfColumns: Math.round @$el.width() / COLUMN_WIDTH
      gutterWidth: 40
    @favorites.on 'sync', (c, res) =>
      @columnsView.appendArtworks new Artworks(res).models
    $.onInfiniteScroll =>
      @favorites.params.page++
      @favorites.fetch(data: @favorites.params).then (res) =>
        return unless res.length is 0
        @$('#profile-favorites-spinner').hide()
        @$el.off 'infiniteScroll'
    @columnsView.appendArtworks @favorites.models

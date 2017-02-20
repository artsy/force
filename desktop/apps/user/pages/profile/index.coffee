{ invoke } = require 'underscore'
Backbone = require 'backbone'
AboutYouView = require '../../components/about_you/view.coffee'
ArtistsYouCollectView = require '../../components/artists_you_collect/view.coffee'
GalleryIntroView = require '../../components/gallery_intro/view.coffee'
template = -> require('./index.jade') arguments...

module.exports = class ProfileView extends Backbone.View
  subviews: []

  initialize: ({ @user }) -> #

  postRender: ->
    aboutYouView = new AboutYouView model: @user, user: @user
    @$('.js-settings-section__main--about-you')
      .html aboutYouView.render().$el

    artistsYouCollectView = new ArtistsYouCollectView user: @user
    @$('.js-settings-section__main--artists-you-collect')
      .html artistsYouCollectView.render().$el

    galleryIntroView = new GalleryIntroView user: @user
    @$('.js-settings-section__main--gallery-intro')
      .html galleryIntroView.render().$el

    @subviews = [
      aboutYouView
      artistsYouCollectView
      galleryIntroView
    ]

  render: ->
    @$el.html template
      user: @user
    @postRender()
    this

  remove: ->
    invoke @subViews, 'remove'
    super

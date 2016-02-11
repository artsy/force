{ invoke } = require 'underscore'
Backbone = require 'backbone'
AboutYouView = require '../../components/about_you/view.coffee'
ProfilePictureView = require '../../components/profile_picture/view.coffee'
ArtistsYouCollectView = require '../../components/artists_you_collect/view.coffee'
GalleryIntroView = require '../../components/gallery_intro/view.coffee'
template = -> require('./index.jade') arguments...

module.exports = class ProfileView extends Backbone.View
  subviews: []

  initialize: ({ @user, @profile }) -> #

  postRender: ->
    aboutYouView = new AboutYouView model: @user, user: @user, profile: @profile
    @$('.js-settings-section__main--about-you')
      .html aboutYouView.render().$el

    profilePictureView = new ProfilePictureView
      el: @$('.js-settings-section__main--profile-picture')
      model: @profile.icon()
      profile: @profile
      accessToken: @user.get 'accessToken'

    artistsYouCollectView = new ArtistsYouCollectView user: @user
    @$('.js-settings-section__main--artists-you-collect')
      .html artistsYouCollectView.render().$el

    galleryIntroView = new GalleryIntroView user: @user
    @$('.js-settings-section__main--gallery-intro')
      .html galleryIntroView.render().$el

    @subviews = [
      aboutYouView
      profilePictureView
      artistsYouCollectView
      galleryIntroView
    ]

  render: ->
    @$el.html template
      user: @user
      profile: @profile
    @postRender()
    this

  remove: ->
    invoke @subViews, 'remove'
    super

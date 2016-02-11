{ invoke } = require 'underscore'
Backbone = require 'backbone'
AboutYouView = require '../../components/about_you/view.coffee'
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
      profile: @profile
    @postRender()
    this

  remove: ->
    invoke @subViews, 'remove'
    super

# _ = require 'underscore'
# Backbone = require 'backbone'
# SubForm = require './sub_form.coffee'
# LocationSearchView = require '../../../components/location_search/index.coffee'
# ProfileIconUplaod = require './profile_icon_upload.coffee'
# template = -> require('../templates/profile.jade') arguments...

# class InformationForm extends SubForm
#   sanitizers:
#     bio: (bio) ->
#       # Replace # and _ in bios as we don't support <h1> and <em> in bios, only auto-linking.
#       bio.replace(/#/g, '&#35;').replace(/_/g, '&#95;')

#   sanitize: (data) ->
#     _.extend data, _.map @sanitizers, (v, k) -> data[k] = v data[k]

#   submit: (e) ->
#     if @preSubmit e
#       $.when.apply(null, [
#         @user.save()
#         @model.save @sanitize(@serializeForm())
#       ]).then @submitSuccess, (xhr) => @submitError.call this, null, xhr

# module.exports = class ProfileForm extends Backbone.View
#   className: 'settings-profile-form'

#   events:
#     'click .settings-toggle-profile': 'toggleProfile'
#     'click .settings-checkbox-label': 'toggleCheckbox'

#   initialize: (options = {}) ->
#     { @profile, @user } = options

#     # Ensure checkbox is checked since the intialization of this requires a fetch
#     # and it may not be set by the time the form renders
#     @listenTo @user, 'change:public_favorites', =>
#       @$('#profile-favorites').prop 'checked', @user.get('public_favorites')

#   toggleCheckbox: (e) ->
#     $(e.currentTarget).siblings().find('label').click()

#   setupUploader: ->
#      @profileIconUpload = new ProfileIconUplaod
#       el: @$('.settings-profile-icon-upload')
#       model: @profile.icon()
#       profile: @profile
#       accessToken: @user.get 'accessToken'

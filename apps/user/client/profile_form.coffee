_ = require 'underscore'
Backbone = require 'backbone'
SubForm = require './sub_form.coffee'
LocationSearchView = require '../../../components/location_search/index.coffee'
ProfileIconUplaod = require './profile_icon_upload.coffee'
template = -> require('../templates/profile.jade') arguments...

class InformationForm extends SubForm
  sanitizers:
    bio: (bio) ->
      # Replace # and _ in bios as we don't support <h1> and <em> in bios, only auto-linking.
      bio.replace(/#/g, '&#35;').replace(/_/g, '&#95;')

  sanitize: (data) ->
    _.extend data, _.map @sanitizers, (v, k) -> data[k] = v data[k]

  submit: (e) ->
    if @preSubmit e
      $.when.apply(null, [
        @user.save()
        @model.save @sanitize(@serializeForm())
      ]).then @submitSuccess, (xhr) => @submitError.call this, null, xhr

class AdvancedForm extends SubForm
  submit: (e) ->
    if @preSubmit e
      @user.publishFavorites @$('input:checkbox').is(':checked'),
        success: @submitSuccess, error: @submitError

module.exports = class ProfileForm extends Backbone.View
  className: 'settings-profile-form'

  events:
    'click .settings-toggle-profile': 'toggleProfile'
    'click .settings-checkbox-label': 'toggleCheckbox'

  initialize: (options = {}) ->
    { @profile, @userEdit } = options

    # Ensure checkbox is checked since the intialization of this requires a fetch
    # and it may not be set by the time the form renders
    @listenTo @userEdit, 'change:public_favorites', =>
      @$('#profile-favorites').prop 'checked', @userEdit.get('public_favorites')

  toggleCheckbox: (e) ->
    $(e.currentTarget).siblings().find('label').click()

  toggleProfile: (e) ->
    $(e.currentTarget).attr 'data-state', 'loading'

    @userEdit.publishFavorites false# if !@profile.get('private')

    @profile.save private: !@profile.get('private'),
      success: => @render()

  setupLocationSearch: ->
    if @$('#settings-profile-location').length
      @locationSearchView = new LocationSearchView el: @$('#settings-profile-location'), autofocus: false
      @locationSearchView.render @userEdit.location()?.cityStateCountry()
      @listenTo @locationSearchView, 'location:update', (location) =>
        @userEdit.setLocation location
        @profile.set location: @userEdit.location().cityStateCountry()

  setupForms: ->
    @informationForm = new InformationForm el: @$('#settings-profile-information'), model: @profile, user: @userEdit
    @advancedForm = new AdvancedForm el: @$('#settings-profile-advanced'), model: @profile, user: @userEdit

  setupUploader: ->
     @profileIconUpload = new ProfileIconUplaod
      el: @$('.settings-profile-icon-upload')
      model: @profile.icon()
      profile: @profile
      accessToken: @userEdit.get 'accessToken'

  postRender: ->
    @setupLocationSearch()
    @setupForms()
    @setupUploader()

  render: ->
    @$el.html template(user: @userEdit, profile: @profile)
    @postRender()
    this

  remove: ->
    @locationSearchView?.remove()
    @informationForm.remove()
    super

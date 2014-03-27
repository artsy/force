_                  = require 'underscore'
sd                 = require('sharify').data
AccountForm        = require './account_form.coffee'
Backbone           = require 'backbone'
GeoFormatter       = require 'geoformatter'
LocationSearchView = require '../../../components/location_search/index.coffee'
Profile            = require '../../../models/profile.coffee'
ProfileEdit        = require '../../../models/profile_edit.coffee'
ProfileForm        = require './profile_form.coffee'
UserEdit           = require '../../../models/user_edit.coffee'

module.exports.UserSettingsView = class UserSettingsView extends Backbone.View

  initialize: (options) ->
    @profileEdit = new ProfileEdit sd.PROFILE
    @$toggleEls = @$ '.garamond-tab, .settings-form'

    window.currentUser = @model

    @accountForm = new AccountForm
      el         : @$ '.settings-account-form'
      model      : @model
      profileEdit: @profileEdit

    @profileForm = new ProfileForm
      el      : @$('.settings-profile-form')
      model   : @profileEdit
      userEdit: @model

    # Location Search
    @locationSearchView = new LocationSearchView el: @$('#profile-location')
    @locationSearchView.postRender()
    @listenTo @locationSearchView, 'location:update', @onLocationUpdate

  #
  # Location
  # This is located on the profile form since that is where it is
  # publicly displayed, but we have a location object on the user
  # The current user will set a location object and the profile
  # profile will set a display string for that object.
  #
  onLocationUpdate: (location) ->
    geo = new GeoFormatter location
    @model.save
      location:
        city:        geo.getCity()
        state:       geo.getState()
        state_code:  geo.getStateCode()
        postal_code: geo.getPostalCode()
        country:     geo.getCountry()
        coordinates: geo.getCoordinates()
    @profileEdit.save
      location: @model.location().cityStateCountry()

  events:
    'click .garamond-tab'   : 'onTabClick'
    'click .settings-submit': 'onSubmitButtonClick'

  onTabClick: (event) ->
    return false if $(event.target).is '.is-active'
    @$toggleEls.toggleClass 'is-active'
    @$('form.is-active input:first').focus().blur()
    false

  onSubmitButtonClick: (event) ->
    false


module.exports.init = ->

  new UserSettingsView
    el   : $('#settings')
    model: new UserEdit sd.USER_EDIT

_            = require 'underscore'
_.str        = require 'underscore.string'
sd           = require('sharify').data
Backbone     = require 'backbone'
CurrentUser  = require '../../../models/current_user.coffee'
ErrorHelpers = require './error_handling.coffee'

module.exports = class ProfileForm extends Backbone.View

  _.extend @prototype, ErrorHelpers

  initialize: (options) ->
    throw 'This view requires a Profile model' unless @model
    { @userEdit } = options

    # Reference to frequently accessed DOM elements
    @$id = @$ '#profile-id'
    @$idMessage = @$ ".settings-form-error[data-attr='id']"
    @$bio = @$ '#profile-bio'
    @$website = @$ '#profile-website'
    @$profileIsPublic = @$ '#profile-public'
    @$profileFavorites = @$ '#profile-favorites'
    @$submitButton = @$ '#profile-edit-submit'

    # Set toggles
    @userEdit.initializeDefaultArtworkCollection
      success: (collection) =>
        @$profileFavorites.attr 'data-state', @model.onOffFavorites(collection)
    @$profileIsPublic.attr 'data-state', @model.onOffPublic()

    @listenTo @model, 'invalid', @renderErrors
    @listenTo @model, 'request', @renderPending
    @listenTo @model, 'sync', @renderSuccess
    @listenTo @model, 'error', @parseErrors

    @

  renderPending: (model, xhr, options) ->
    @$submitButton.addClass 'is-loading'

  renderSuccess: (model, resp, options) ->
    @userEdit.refresh()
    @$submitButton.removeClass 'is-loading'

  events:
    'blur #profile-id'          : 'onIdBlur'
    'click .artsy-toggle'       : 'onToggle'
    'click .artsy-toggle-label' : 'onToggle'
    'click #profile-edit-submit': 'onSubmit'
    'form'                      : 'onSubmit'

  #
  # Id
  #
  onIdBlur: (event) ->
    # Restore if made blank
    if _.clean(@$id.val()).length is 0
      @$id.val @model.get 'id'
    else
      errors = @model.validate { id: @$id.val() }
      if errors
        @renderErrors @model, errors
      else
        @$idMessage.text ''

  # TODO: compontent
  onToggle: (event) ->
    $target = $(event.target)
    if $target.is '.artsy-toggle-label'
      $toggle = $target.prev()
    else
      $toggle = $target.closest 'a.artsy-toggle'

    if $toggle.is "[data-state='on']"
      $toggle.attr 'data-state', 'off'
    else
      $toggle.attr 'data-state', 'on'
    false

  onSubmit: ->
    @clearErrors()
    values = {}
    values.id = @$id.val()
    values.handle = @$id.val()
    values.private = not @$profileIsPublic.is "[data-state='on']"

    # Replace # and _ in bios. We don't support H1 and EM in bios, only auto-linking.
    bio = @$bio.val()?.trim()?.replace(/#/g,'&#35;').replace(/_/g,'&#95;')
    values.bio = bio

    # Add http:// if the user did not...
    website = @$website.val()?.trim()
    if website and !/^https?:\/\//i.test(website)
      website = "http://#{website}"
    values.website = website

    @model.save values,
      trigger: true
      wait   : true
    false

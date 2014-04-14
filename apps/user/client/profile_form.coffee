_            = require 'underscore'
_.str        = require 'underscore.string'
sd           = require('sharify').data
Backbone     = require 'backbone'
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
        # Only show the toggle group if the user has a collection to modify
        @$profileFavorites.attr 'data-state', @model.onOffFavorites(collection)
        @$('.settings-enable-public-favorites').show()
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
    'click #profile-favorites'  : 'onTogglePublicFavorites'
    'click #profile-public'     : 'onTogglePublicProfile'
    'form'                      : 'onSubmit'
    # Handle toggle label clicks too
    'click #profile-favorites + .artsy-toggle-label': 'onTogglePublicFavorites'
    'click #profile-public + .artsy-toggle-label'   : 'onTogglePublicProfile'

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
    event.preventDefault()
    $target = $(event.target)
    if $target.is '.artsy-toggle-label'
      $toggle = $target.prev()
    else
      $toggle = $target.closest 'a.artsy-toggle'

    if $toggle.is "[data-state='on']"
      $toggle.attr 'data-state', 'off'
    else
      $toggle.attr 'data-state', 'on'

  onTogglePublicProfile: (event) ->
    enabled = @$profileIsPublic.is "[data-state='on']"
    # When making a profile private, make public favorites collections private
    unless enabled and @$profileFavorites.is "[data-state='on']"
      @userEdit.updateFavorites true
      @$profileFavorites.attr 'data-state', 'off'
    @onSubmit()

  onTogglePublicFavorites: (event) ->
    enabled = @$profileFavorites.is "[data-state='on']"
    @userEdit.updateFavorites enabled
    if enabled and @$profileIsPublic.is "[data-state='off']"
      @$profileIsPublic.attr 'data-state', 'on'
    @onSubmit()

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

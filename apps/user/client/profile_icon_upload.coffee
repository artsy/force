_ = require 'underscore'
Backbone = require 'backbone'

module.exports = class ProfileIconUpload extends Backbone.View
  events:
    'click .spiu-delete': 'onRemoveImage'
    'mouseenter .spiu-file-input': 'onFileInputMouseover'
    'mouseleave .spiu-file-input': 'onFileInputMouseleave'

  initialize: (options) ->
    { @accessToken, @profile } = options

    @cacheSelectors()

    @$el.addClass 'has-image' if @profile.has 'icon'

    @listenTo @model, 'invalid', @onInvalid

    @$file = @$('.spiu-file-input')
    @$file.fileupload
      add: @onImageAdd
      dataType: 'json'
      done: @onUploadComplete
      fail: @onFail
      progress: @onProgressUpdate
      stop: @onStop
      url: @model.url()

  cacheSelectors: ->
    @$errorMessage = @$('.spiu-error-message')
    @$uploadButton = @$('.spiu-upload')
    @$deleteButton = @$('.spiu-delete')
    @$profileIcon = @$('.profile-badge-icon')
    @$progressIndicator = @$('.spiu-progress-indicator')

  renderError: (message) ->
    @$errorMessage
      .html(message)
      .addClass 'is-active'
    _.delay (=> @$errorMessage.removeClass('is-active')), 3000

  renderUploadedImage: ->
    @$el.addClass 'is-loading'
    @$progressIndicator.hide().css 'width', 0
    $("<img src=\"#{@profile.iconImageUrl()}\" />").on 'load', =>
      @$el.removeClass('is-loading').addClass 'has-image'
      @$profileIcon.css 'background-image', "url(#{@profile.iconImageUrl()})"

  onRemoveImage: ->
    @profile.set 'icon', null
    @$profileIcon.css 'background-image', "url(#{@profile.iconImageUrl()})"
    @$el.removeClass 'has-image'
    @model.destroy data: access_token: @accessToken

  # Since the file input is transparent over the top of the upload button,
  # it cancels the CSS hover states.
  onFileInputMouseover: ->
    @$uploadButton.addClass 'is-hover'

  onFileInputMouseleave: ->
    @$uploadButton.removeClass 'is-hover'

  onInvalid: (model, error, options) ->
    @renderError error

  # Handlers for Upload Plugin Events
  # Fat-arrow bind all of these since the scope isn't coming from the view's event hash
  onFail: (e, data) =>
    @renderError 'There was a problem uploading your file'
    @onRemoveImage() # Clean up failed file uploads

  onStop: =>
    @$progressIndicator.hide().css 'width', 0

  onImageAdd: (e, data) =>
    @model.set 'file', data.originalFiles[0]
    if @model.isValid()
      data.submit()
        .error @onError

  onUploadComplete: (e, data) =>
    data.result.profileId = @profile.id
    @profile.set 'icon', data.result
    @renderUploadedImage()

  onProgressUpdate: (e, data) =>
    @$progressIndicator.show() unless @$progressIndicator.is(':visible')
    @$progressIndicator.width parseInt(data.loaded / data.total * 140, 10)

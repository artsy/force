_ = require 'underscore'
Backbone = require 'backbone'
sd = require('sharify').data
s3UploadForm = -> require('../templates/s3_upload.jade') arguments...

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

    @$formPlaceholder = @$('.spiu-form')

    @encodedCredentials = @encode(sd.GEMINI_ACCOUNT_KEY, '') 

    $.ajax
      type: 'GET'
      dataType: 'json'
      url: "#{sd.GEMINI_APP}/uploads/new.json"
      data: 
        acl: 'private'
      headers: { 'Authorization' : "Basic #{@encodedCredentials}"}
      success: (resp) =>
        @renderForm(resp)

  renderForm: (data) ->
    key = "#{data.policy_document.conditions[1][2]}/${filename}"
    bucket = data.policy_document.conditions[0].bucket
    @$formPlaceholder.html s3UploadForm(
      acl: data.policy_document.conditions[2].acl
      successAction: data.policy_document.conditions[3].success_action_status
      base64Policy: data.policy_encoded
      signature: data.signature
      key: key
      s3Key: sd.GEMINI_S3_ACCESS_KEY
      uploadBucket: bucket
    )
    @attachFileUploadUI(bucket, key)

  makeGeminiRequest: (data) =>
    fileName = data.files[0].name
    key = data.key.replace('${filename}', fileName)
    metadata = { _type: 'ProfileIcon', id: @profile.get('id') }
    $.ajax
      type: 'POST'
      dataType: 'json'
      url: "#{sd.GEMINI_APP}/entries.json"
      data: { entry: { source_key: key, source_bucket: data.bucket, template_key: 'profile-icon', metadata: metadata } }
      headers: { 'Authorization' : "Basic #{@encodedCredentials}"}
      success: (resp) =>
        @onUploadComplete()

  attachFileUploadUI: (bucket, key) ->
    $form = @$('form')
    $form.fileupload
      type: 'POST'
      dataType: 'xml'
      done: (e, data) =>
        @makeGeminiRequest(_.extend(data, { key: key, bucket: bucket }))
      add: (e, data) =>
        fileName = data.files[0].name
        fileType = data.files[0].type
        $(@).find("form input[name='Content-Type']").val fileType  # We only know this after a file has been added.
        data.submit()
      fail: @onFail
      progress: @onProgressUpdate
      stop: @onStop

  encode: (key, secret) ->
    btoa(unescape(encodeURIComponent([ key, secret ].join(':'))))
    
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

  # Render processing message?
  onUploadComplete: =>
    @profile.set 'icon', { profileId: @profile.get('id') }
    @renderUploadedImage()

  onProgressUpdate: (e, data) =>
    @$progressIndicator.show() unless @$progressIndicator.is(':visible')
    @$progressIndicator.width parseInt(data.loaded / data.total * 140, 10)

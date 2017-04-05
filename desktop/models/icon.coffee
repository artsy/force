Backbone = require 'backbone'
_ = require 'underscore'
sd = require('sharify').data
Icon = require './icon'
{ Image } = require 'artsy-backbone-mixins'
ImageSizes = require './mixins/image_sizes'

module.exports = class Icon extends Backbone.Model
  _.extend @prototype, Image(sd.SECURE_IMAGES_URL)
  _.extend @prototype, ImageSizes

  @DefaultUserIconUrl: "/images/user_profile.png"

  # Upload validation constraints
  maxFileSize: 3000000 # 3MB
  acceptFileTypes: /(\.|\/)(gif|jpe?g|png|tiff)$/i

  url: ->
    "#{sd.API_URL}/api/v1/profile/#{@get 'profileId' }/icon"

  # Override the imageUrl for icon unique situations
  # For users:
  #   - render a default icon if there is none instead of "missing_image"
  #   - display an unprocessed original version if the image is waiting on a delayed job
  imageUrl: ->
    if @hasImage 'square140'
      @sslUrl @get('image_url').replace(':version', 'square140').replace('.jpg', '.png')
    else if @hasImage 'square'
      @sslUrl @get('image_url').replace(':version', 'square').replace('.jpg', '.png')
    else if @has('image_filename') and _.isNull(@get('versions'))
      @sslUrl @get('image_url').replace(':version', 'original')
    else
      Icon.DefaultUserIconUrl

  # Validates a client uploaded file before posting it
  # See https://github.com/blueimp/jQuery-File-Upload
  validate: (attrs, options) ->
    return unless attrs.file
    unless @acceptFileTypes.test(attrs.file.type)
      return 'Please upload a png, jpeg, gif, or tiff.'
    unless attrs.file.size <= @maxFileSize
      return 'Please upload an image smaller than 3 MB.'

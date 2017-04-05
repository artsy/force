Backbone = require 'backbone'
_ = require 'underscore'
sd = require('sharify').data
Icon = require './icon'
{ Image } = require 'artsy-backbone-mixins'

module.exports = class Icon extends Backbone.Model
  _.extend @prototype, Image(sd.SECURE_IMAGES_URL)

  @DefaultUserIconUrl: "/images/user_profile.png"

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

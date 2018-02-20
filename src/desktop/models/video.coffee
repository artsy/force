_ = require 'underscore'
sd = require('sharify').data
Backbone = require 'backbone'
FeaturedLink = require './featured_link.coffee'
{ Image, Markdown } = require 'artsy-backbone-mixins'
{ SECURE_IMAGES_URL } = require('sharify').data

module.exports = class Video extends Backbone.Model

  _.extend @prototype, Image(SECURE_IMAGES_URL)
  _.extend @prototype, Markdown

  defaultSize: 'large_rectangle'

  urlRoot: -> "#{sd.API_URL}/api/v1/video"

  posterUrl: (size = @defaultSize) ->
    @imageUrl size if @hasImage size

  # TODO: assumes a valid S3... needs http[s] treatment
  # like the additional images have
  srcUrl: (ext, res = "high") ->
    if res is "high"
      "#{@get('hr_video_url')}#{ext}"
    else
      "#{@get('lr_video_url')}#{ext}"

  layoutStyle: (size) ->
    switch size
      when 1 then "full"
      when 2 then "half"
      when 3 then "third"
      when 4 then "quarter"

_         = require 'underscore'
sd        = require('sharify').data
Backbone  = require 'backbone'

module.exports = class SearchResult extends Backbone.Model
  _.mixin(require 'underscore.string')

  initialize: ->
    @set
      display:        @trimDisplay()
      image_url:      @imageUrl()
      display_model:  @displayModel()
      location:       @location()

    @value = @get 'display'

  trimDisplay: ->
    _.trim(_.truncate(@get('display'), 75))

  location: ->
    if @get('model') is 'profile' then "/#{@id}" else "/#{@get('model')}/#{@id}"

  displayModel: ->
    _.capitalize(if @get('model') is 'gene' then 'category' else @get('model'))

  imageUrl: ->
    src = if @get('model') is 'artwork' then 'default_image.jpg' else 'image'
    url = "/api/v1/#{@get('model')}/#{@id}/#{src}"
    url = url + "?xapp_token=#{sd.GRAVITY_XAPP_TOKEN}" if sd.GRAVITY_XAPP_TOKEN?
    url

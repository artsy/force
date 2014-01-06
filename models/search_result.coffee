_         = require 'underscore'
sd        = require('sharify').data
Backbone  = require 'backbone'
Image     = require './mixins/image.coffee'

_.mixin(require 'underscore.string')

module.exports = class SearchResult extends Backbone.Model
  _.extend @prototype, Image

  initialize: (options) ->
    @set
      display:        @display()
      image_url:      @imageUrl()
      display_model:  @displayModel()
      location:       @location()
      is_human:       @isHuman()

    # Set value attribute for autocomplete usage
    @value = @display()

  display: ->
    @get('name') || @trimmedDisplay()

  trimmedDisplay: ->
    _.trim(_.truncate(@get('display'), 75))

  location: ->
    if @get('model') is 'profile' then "/#{@id}" else "/#{@get('model')}/#{@id}"

  displayModel: ->
    _.capitalize(if @get('model') is 'gene' then 'category' else @get('model'))

  highlightedDisplay: (term) ->
    text = @get('display')
    text.replace new RegExp("(#{term})", 'ig'), '<span class="is-highlighted">$1</span>'

  imageUrl: ->
    src = if @get('model') is 'artwork' then 'default_image.jpg' else 'image'
    url = "#{sd.ARTSY_URL}/api/v1/#{@get('model')}/#{@id}/#{src}"
    url = url + "?xapp_token=#{sd.ARTSY_XAPP_TOKEN}" if sd.ARTSY_XAPP_TOKEN?
    @fullyQualifiedImageUrl(url)

  isHuman: ->
    (@get('model') is 'profile') or (@get('model') is 'artist')

  humanClass: ->
    if @isHuman() then 'is-human' else 'is-not-human'

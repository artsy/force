_ = require 'underscore'
_s = require 'underscore.string'
sd = require('sharify').data
Backbone = require 'backbone'
{ Image } = require 'artsy-backbone-mixins'

module.exports = class SearchResult extends Backbone.Model
  _.extend @prototype, Image(sd.SECURE_IMAGES_URL)

  initialize: (options) ->
    @set
      display: @display()
      image_url: @imageUrl()
      display_model: @displayModel()
      location: @location()

    # Set value attribute for autocomplete usage
    @value = @display()

  display: ->
    _s.trim(@get('name') || @related().owner?.get('name') || @get('display'))

  trimmedDisplay: ->
    _s.trim(_s.truncate(@get('display'), 75))

  location: ->
    if @get('model') is 'profile'
      "/#{@get('id')}"
    else if @get('model') is 'partnershow'
      "/show/#{@get('id')}"
    else
      "/#{@get('model')}/#{@get('id')}"

  displayModel: ->
    model =
      if @get('model') is 'gene'
        'category'
      else if @get('model') is 'partnershow'
        'show'
      else @get('model')

    _s.capitalize model

  highlightedDisplay: (term) ->
    text = @get('display')
    text.replace new RegExp("(#{term})", 'ig'), '<span class="is-highlighted">$1</span>'

  imageUrl: ->
    "#{sd.APP_URL}/search/image/#{@get('model')}/#{@get('id')}"

  updateForFair: (fair) ->
    if @get('display_model') == 'Show'
      @set display_model: 'Booth'
    else
      @set location: "#{fair.href()}/browse#{@get('location')}"

  href: ->
    @get('location')

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
    _s.trim(@get('name') || @get('owner')?.name || @get('display'))

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
    src = if @get('model') in ['artwork', 'partnershow'] then 'default_image.jpg' else 'image'
    model = if @get('model') is 'partnershow' then 'partner_show' else @get('model')
    url = "#{sd.API_URL}/api/v1/#{model}/#{@get('id')}/#{src}"
    url = url + "?xapp_token=#{sd.ARTSY_XAPP_TOKEN}" if sd.ARTSY_XAPP_TOKEN?
    url

  updateForFair: (fair) ->
    if @get('display_model') == 'Show'
      @set display_model: 'Booth'
    else
      @set location: "#{fair.href()}/browse#{@get('location')}"

  href: ->
    @get('location')

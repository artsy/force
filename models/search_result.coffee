_         = require 'underscore'
sd        = require('sharify').data
Backbone  = require 'backbone'
{ Image } = require 'artsy-backbone-mixins'

_.mixin(require 'underscore.string')

module.exports = class SearchResult extends Backbone.Model
  _.extend @prototype, Image(sd.SECURE_IMAGES_URL)

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
    _.trim(@get('name') || @get('owner')?.name || @get('display'))

  trimmedDisplay: ->
    _.trim(_.truncate(@get('display'), 75))

  location: ->
    if @get('model') is 'profile'
      "/#{@id}"
    else if @get('model') is 'partnershow'
      "/show/#{@id}"
    else
      "/#{@get('model')}/#{@id}"

  displayModel: ->
    model =
      if @get('model') is 'gene'
        'category'
      else if @get('model') is 'partnershow'
        'show'
      else @get('model')

    _.capitalize model

  highlightedDisplay: (term) ->
    text = @get('display')
    text.replace new RegExp("(#{term})", 'ig'), '<span class="is-highlighted">$1</span>'

  imageUrl: ->
    src = if @get('model') in ['artwork', 'partnershow'] then 'default_image.jpg' else 'image'
    model = if @get('model') is 'partnershow' then 'partner_show' else @get('model')
    url = "#{sd.ARTSY_URL}/api/v1/#{model}/#{@id}/#{src}"
    url = url + "?xapp_token=#{sd.ARTSY_XAPP_TOKEN}" if sd.ARTSY_XAPP_TOKEN?
    url

  isHuman: ->
    (@get('model') is 'profile') or (@get('model') is 'artist')

  humanClass: ->
    if @isHuman() then 'is-human' else 'is-not-human'

  updateForFair: (fair) ->
    if @get('display_model') == 'Show'
      @set display_model: 'Booth'
    else
      @set location: "#{fair.href()}/browse#{@get('location')}"

  publishedClass: ->
    if @has 'published'
      if @get 'published'
        'published-search-result'
      else
        'unpublished-search-result'

  href: ->
    if @get('published')
      @get('location')
    else
      '#'

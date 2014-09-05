_ = require 'underscore'
_s = require 'underscore.string'
sd = require('sharify').data
Backbone = require 'backbone'

module.exports = class GooogleSearchResult extends Backbone.Model

  initialize: (options) ->
    @set
      id: @getId()
      display: @formatTitle(@get('title'))
      image_url: @imageUrl()
      display_model: @displayModel()
      location: @href()

    @set
      about: @about(@get('snippet'))

  # Gets the id out of the url
  getId: ->
    id = @href().split('?')[0]
    if id.split('/').length > 2
      id = id.split('/')[2]
    id

  href: ->
    @get('link').replace('https://artsy.net', '').replace('http://artsy.net', '').replace('#!', "")

  imageUrl: ->
    @get('pagemap')?.cse_thumbnail?[0].src or @get('pagemap')?.cse_image?[0].src

  ogType: ->
    return @get('ogType') if @get('ogType')
    ogType =
      if @href().indexOf('/show/') > -1
        # Shows have the og:type 'article'
        'show'
      else if profileType = @get('pagemap')?.metatags[0]?['profile:type']
        @set baseType: @get('pagemap')?.metatags[0]?['og:type']?.replace("#{sd.FACEBOOK_APP_NAMESPACE}:", "")
        profileType
      else
        @get('pagemap')?.metatags[0]?['og:type']?.replace("#{sd.FACEBOOK_APP_NAMESPACE}:", "")
    @set
      ogType: ogType
    ogType

  about: (text) ->
    if @get('display_model') == 'article'
      text
    else if @get('display_model') == 'show' or @href().indexOf('/feature/') > -1 or @ogType() == 'profile' or @get('baseType') == 'profile'
      @get('pagemap')?.metatags[0]?['og:description']
    else undefined

  formatTitle: (title) ->
    _s.trim(
      if @ogType() == 'artwork'
        "#{title.split(' | ')[0]}, #{title.split(' | ')[1]}"
      else
        title?.split('|')[0]
    )

  displayModel: ->
    if @ogType() == 'website'
      false
    else if @ogType() == 'gene'
      'category'
    else
      @ogType()

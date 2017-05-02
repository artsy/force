Backbone = require 'backbone'
sd = require('sharify').data
_ = require 'underscore'
_s = require 'underscore.string'
{ Markdown, Image } = require 'artsy-backbone-mixins'

module.exports = class FeaturedLink extends Backbone.Model

  _.extend @prototype, Markdown
  _.extend @prototype, Image(sd.API_URL)

  urlRoot: "#{sd.API_URL}/api/v1/featured_link"

  miniSubtitle: ->
    _s.trim @get('subtitle').split('|')[0]

  # Converts a featured link into a hash that is useable for the featured items component.
  toFeaturedItem: (collectionLength = 2) ->
    {
      href: @get('href')
      title: @mdToHtml('title')
      subtitle: @mdToHtml('subtitle').split('|')[0].trim()
      imageUrl: if @hasImage('large_rectangle') then @imageUrl() else null
    }

  layoutStyle: (collectionLength) ->
    switch
      when collectionLength == 1
        "full"
      when collectionLength == 2
        "half"
      when collectionLength == 3
        "third"
      when collectionLength > 3
        "quarter"

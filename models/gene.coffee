Backbone = require 'backbone'
sd = require('sharify').data

module.exports = class Gene extends Backbone.Model

  urlRoot: "#{sd.ARTSY_URL}/api/v1/gene"

  href: -> "#{sd.ARTSY_URL}/gene/#{@get('id')}"

  displayName: -> @get('name')

  alphaSortKey: -> @get('id')

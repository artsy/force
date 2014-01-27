_            = require 'underscore'
sd           = require('sharify').data
Backbone     = require 'backbone'
{ Markdown } = require 'artsy-backbone-mixins'

module.exports = class Page extends Backbone.Model
  _.extend @prototype, Image(sd.SECURE_IMAGES_URL)

  urlRoot: "#{sd.ARTSY_URL}/api/v1/page"

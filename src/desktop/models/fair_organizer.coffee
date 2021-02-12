sd = require('sharify').data
_ = require 'underscore'
Backbone = require 'backbone'
{ Image, Markdown } = require '@artsy/backbone-mixins'
Clock = require './mixins/clock.coffee'

module.exports = class FairOrganizer extends Backbone.Model
  _.extend @prototype, Image(sd.SECURE_IMAGES_URL)
  _.extend @prototype, Markdown
  _.extend @prototype, Clock

  urlRoot: "#{sd.API_URL}/api/v1/fair_organizer"

sd = require('sharify').data
_ = require 'underscore'
Backbone = require 'backbone'
{ Image, Markdown } = require 'artsy-backbone-mixins'

module.exports = class FairOrganizer extends Backbone.Model
  _.extend @prototype, Image(sd.SECURE_IMAGES_URL)
  _.extend @prototype, Markdown

  urlRoot: "#{sd.API_URL}/api/v1/fair_organizer"

_ = require 'underscore'
sd = require('sharify').data
Backbone = require 'backbone'
{ Image } = require 'artsy-backbone-mixins'

module.exports = class Item extends Backbone.Model
  _.extend @prototype, Image(sd.SECURE_IMAGES_URL)

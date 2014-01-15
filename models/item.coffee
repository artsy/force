_         = require 'underscore'
sd        = require('sharify').data
Backbone  = require 'backbone'
Image     = require './mixins/image.coffee'

module.exports = class Item extends Backbone.Model
  _.extend @prototype, Image

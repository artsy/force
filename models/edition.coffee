_               = require 'underscore'
Backbone        = require 'backbone'
{ Dimensions }  = require 'artsy-backbone-mixins'

module.exports = class Edition extends Backbone.Model
  _.extend @prototype, Dimensions

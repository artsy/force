_ = require 'underscore'
Backbone = require 'backbone'
sd = require('sharify').data
{ Dimensions } = require 'artsy-backbone-mixins'

module.exports = class EditionSet extends Backbone.Model

  _.extend @prototype, Dimensions

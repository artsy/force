_ = require 'underscore'
Backbone = require 'backbone'
{ Dimensions } = require '@artsy/backbone-mixins'

module.exports = class EditionSet extends Backbone.Model

  _.extend @prototype, Dimensions

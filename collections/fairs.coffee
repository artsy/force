_ = require 'underscore'
sd = require('sharify').data
Backbone = require 'backbone'
Fair = require '../models/fair.coffee'
{ API_URL } = require('sharify').data
{ Fetch } = require 'artsy-backbone-mixins'

module.exports = class Fairs extends Backbone.Collection

  _.extend @prototype, Fetch(API_URL)

  model: Fair

  url: "#{sd.API_URL}/api/v1/fairs"

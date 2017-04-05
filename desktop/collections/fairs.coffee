_ = require 'underscore'
sd = require('sharify').data
moment = require 'moment'
Backbone = require 'backbone'
Fair = require '../models/fair'
{ API_URL } = require('sharify').data
{ Fetch } = require 'artsy-backbone-mixins'

module.exports = class Fairs extends Backbone.Collection

  _.extend @prototype, Fetch(API_URL)

  model: Fair

  url: "#{sd.API_URL}/api/v1/fairs"

  # pastFairs is the array of links to the previous fairs,
  # since this should only include fairs that have microsites,
  # we filter on has_full_feature.
  # this also allows us to set a fair for the future and
  # have a countdown to the preview
  pastYearRoundFairs: ->
    @filter (fair) ->
      fair.isOver() && fair.get('has_full_feature')

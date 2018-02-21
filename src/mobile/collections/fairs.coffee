_ = require 'underscore'
sd = require('sharify').data
Backbone = require 'backbone'
moment = require 'moment'
Fair = require '../models/fair.coffee'
{ API_URL } = require('sharify').data
{ Fetch } = require 'artsy-backbone-mixins'

module.exports = class Fairs extends Backbone.Collection

  _.extend @prototype, Fetch(API_URL)

  model: Fair

  comparator: (fair) ->
    sizes =
      'x-large' : 1
      'large' : 2
      'medium' : 3
      'small' : 4
      'x-small' : 5
    sizes[fair.get('banner_size')]

  url: "#{sd.API_URL}/api/v1/fairs"

  # fairs is the array of links to the previous fairs,
  # since this should only include fairs that have microsites,
  # we filter on has_full_feature.
  # this also allows us to set a fair for the future and
  # have a countdown to the preview
  pastYearRoundFairs: ->
    @filter (model) ->
      moment(model.get('end_at')).utc().isBefore(moment().utc()) &&
      model.get('has_full_feature')

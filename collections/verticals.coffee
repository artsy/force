Backbone = require 'backbone'
sd = require('sharify').data
Vertical = require '../models/vertical.coffee'
moment = require 'moment'

module.exports = class Verticals extends Backbone.Collection

  url: "#{sd.POSITRON_URL}/api/verticals"

  model: Vertical

  parse: (data = {}) ->
    { @total, @count } = data
    data.results

  running: ->
    @select (vertical) ->
      moment().isBetween(
        moment(vertical.get('start_at'))
        moment(vertical.get('end_at'))
      )

  sync: (method, model, options) ->
    options.headers = 'X-Access-Token': ''
    super

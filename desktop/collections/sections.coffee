Backbone = require 'backbone'
sd = require('sharify').data
Section = require '../models/section'
moment = require 'moment'

module.exports = class Sections extends Backbone.Collection

  url: "#{sd.POSITRON_URL}/api/sections"

  model: Section

  parse: (data = {}) ->
    { @total, @count } = data
    data.results

  running: ->
    @select (section) ->
      moment().isBetween(
        moment(section.get('start_at'))
        moment(section.get('end_at'))
      )

  sync: (method, model, options) ->
    options.headers = 'X-Access-Token': ''
    super

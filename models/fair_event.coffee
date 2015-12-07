sd = require('sharify').data
_ = require 'underscore'
_s = require 'underscore.string'
Backbone = require 'backbone'
Profiles = require '../collections/profiles.coffee'
DateHelpers = require '../components/util/date_helpers.coffee'
Clock = require './mixins/clock.coffee'
moment = require 'moment'
Profile = require './profile.coffee'
deslugify = require '../components/deslugify/index.coffee'
Relations = require './mixins/relations/fair.coffee'

module.exports = class FairEvent extends Backbone.Model
  _.extend @prototype, Relations
  _.extend @prototype, Clock

  console.log '------ fair id: ', @fairId, '--------'

  urlRoot: "#{sd.API_URL}/api/v1/fair/#{@fairId}/fair_event"

  initialize: (attributes, options) ->
    { @fairId } = options
    console.log '******* fair id: ', @fairId, '*********'

  # url: ->
  #   if @has('fair')
  #     "#{sd.API_URL}/api/v1/fair/#{@get('fair').id}/fair_event/#{@get('id')}"


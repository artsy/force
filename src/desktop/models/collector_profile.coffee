_ = require 'underscore'
Backbone = require 'backbone'
{ API_URL } = require('sharify').data
Relations = require './mixins/relations/collector_profile.coffee'

module.exports = class CollectorProfile extends Backbone.Model
  _.extend @prototype, Relations

  url: "#{API_URL}/api/v1/me/collector_profile"

  isNew: -> false # Always use PUT

  isCollector: ->
    @get('collector_level') >= 3

  isCommercial: ->
    @get('collector_level') >= 2

  isWithProfessionalBuyerApplicationPending: ->
    @get('professional_buyer_applied_at')?

  isProfessionalBuyer: ->
    @get('professional_buyer_at')?

  findOrCreate: (options = {}) ->
    Promise.resolve(@save {}, options)

_ = require 'underscore'
Backbone = require 'backbone'
sd = require('sharify').data
Profile = require '../../models/profile.coffee'
Fair = require '../../models/fair.coffee'
SearchBar = require '../../apps/fair/client/mixins/search_bar.coffee'

module.exports.FairHeaderView = class FairHeaderView extends Backbone.View
  _.extend @prototype, SearchBar

  initialize: (options) ->
    { @fair } = options
    @setupSearch @model, @fair

module.exports.init = ->
  profile = new Profile sd.MICROSITE_PROFILE
  fair = new Fair sd.MICROSITE_FAIR

  new FairHeaderView el: $('.fair-page-header'), model: profile, fair: fair

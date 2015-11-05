_ = require 'underscore'
Backbone = require 'backbone'
sd = require('sharify').data
Profile = require '../../../models/profile.coffee'
Fair = require '../../../models/fair.coffee'
SearchBar = require './search_bar.coffee'

module.exports = class FairHeaderView extends Backbone.View
  _.extend @prototype, SearchBar

  initialize: (options) ->
    { @fair } = options
    @setupSearch @model, @fair

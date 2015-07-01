Backbone = require 'backbone'
{ API_URL } = require('sharify').data

module.exports =
  related: ->
    return @__related__ if @__related__?

    Partner = require '../../partner.coffee'

    if @get('owner_type') is 'User'
      owner = new Backbone.Model @get('owner')
      owner.urlRoot = "#{API_URL}/api/v1/user"
    else
      owner = new Partner @get('owner')

    @__related__ =
      owner: owner

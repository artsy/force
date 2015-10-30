Backbone = require 'backbone'
{ API_URL } = require('sharify').data

module.exports =
  related: ->
    return @__related__ if @__related__?

    Partner = require '../../partner.coffee'

    if @isPartner()
      owner = new Partner @get('owner')
    else if @isFairOrganizer()
      owner = new FairOrganizer @get('owner')
    else if @isFair
      owner = new Fair @get('owner')
    else if @isUser
      owner = new User @get('owner')

    @__related__ =
      owner: owner

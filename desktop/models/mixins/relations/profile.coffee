Backbone = require 'backbone'
{ API_URL } = require('sharify').data

module.exports =
  related: ->
    return @__related__ if @__related__?

    if @isPartner()
      Partner = require '../../partner'
      owner = new Partner(@get('owner'))

    if @isFairOrganizer()
      FairOrganizer = require '../../fair_organizer'
      owner = new FairOrganizer(@get('owner'))

    if @isFair()
      Fair = require '../../fair'
      owner = new Fair(@get('owner'))

    if @isUser()
      User = require '../../user'
      owner = new User(@get('owner'))

    @__related__ =
      owner: owner ?= new Backbone.Model @get('owner')

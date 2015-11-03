Backbone = require 'backbone'
{ API_URL } = require('sharify').data

module.exports =
  related: ->
    return @__related__ if @__related__?

    if @isPartner()
      Partner = require '../../partner.coffee'
      owner = new Partner(@get('owner'))

    if @isFairOrganizer()
      FairOrganizer = require '../../fair_organizer.coffee'
      owner = new FairOrganizer(@get('owner'))

    if @isFair()
      Fair = require '../../fair.coffee'
      owner = new Fair(@get('owner'))

    if @isUser()
      User = require '../../user.coffee'
      owner = new User(@get('owner'))

    @__related__ =
      owner: owner ?= new Backbone.Model @get('owner')

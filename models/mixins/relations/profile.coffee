Backbone = require 'backbone'
{ API_URL } = require('sharify').data
Fair = require '../../fair.coffee'
FairOrganizer = require '../../fair_organizer.coffee'
User = require '../../user.coffee'
Partner = require '../../partner.coffee'

module.exports =
  related: ->
    return @__related__ if @__related__?
    if @isPartner()
      owner = new Partner(@get('owner'))
    if @isFairOrganizer()
      owner = new FairOrganizer(@get('owner'))
    if @isFair()
      owner = new Fair(@get('owner'))
    if @isUser()
      owner = new User(@get('owner'))

    @__related__ =
      owner: owner

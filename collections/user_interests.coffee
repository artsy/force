_ = require 'underscore'
Backbone = require 'backbone'
{ API_URL } = require('sharify').data
UserInterest = require '../models/user_interest.coffee'

module.exports = class UserInterests extends Backbone.Collection
  model: UserInterest

  interestType: 'Artist'

  url: "#{API_URL}/api/v1/me/user_interests"

  parse: (response) ->
    _.filter response, (obj) ->
      not _.isEmpty(obj.interest)

  fetch: (options = {}) ->
    options.data = _.extend options.data or {},
      interest_type: @interestType
    super options

  interests: ->
    @map (userInterest) ->
      userInterest.related().interest

  comparator: (userInterest) ->
    Date.parse(userInterest.get 'updated_at')

  findByInterestId: (id) ->
    @find (userInterest) ->
      userInterest.related().interest.id is id

  alreadyInterested: (interest) ->
    @findByInterestId(interest.id)?

  addInterest: (interest) ->
    return if @alreadyInterested interest

    @add
      interest_type: @interestType
      interest_id: interest.id
      interest: interest.attributes

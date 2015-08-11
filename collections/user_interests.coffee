_ = require 'underscore'
Backbone = require 'backbone'
{ API_URL } = require('sharify').data
UserInterest = require '../models/user_interest.coffee'

module.exports = class UserInterests extends Backbone.Collection
  model: UserInterest

  interestType: 'Artist' # Should/will be configurable

  url: ->
    if @collectorProfile?
      "#{API_URL}/api/v1/user_interests"
    else
      "#{API_URL}/api/v1/me/user_interest/artists"

  initialize: (models, { @collectorProfile } = {}) ->
    @model::urlRoot = @urlRoot()

  urlRoot: ->
    if @collectorProfile?
      "#{API_URL}/api/v1/user_interest"
    else
      "#{API_URL}/api/v1/me/user_interest"

  parse: (response) ->
    _.filter response, (obj) ->
      not _.isEmpty(obj.interest)

  fetch: (options = {}) ->
    if @collectorProfile?
      options.data = _.extend options.data or {}, @owner(),
        interest_type: @interestType
    super options

  comparator: (userInterest) ->
    -Date.parse(userInterest.get 'updated_at')

  findByInterestId: (id) ->
    @find (userInterest) ->
      userInterest.related().interest.id is id

  alreadyInterested: (interest) ->
    @findByInterestId(interest.id)?

  owner: ->
    if @collectorProfile?
      owner_id: @collectorProfile.id, owner_type: 'CollectorProfile'

  addInterest: (interest) ->
    return if @alreadyInterested interest

    @unshift _.extend {
      interest_type: @interestType
      interest_id: interest.id
      interest: interest.attributes
    }, @owner()

_ = require 'underscore'
Backbone = require 'backbone'
{ API_URL } = require('sharify').data
UserInterest = require '../models/user_interest.coffee'

module.exports = class UserInterests extends Backbone.Collection
  model: UserInterest

  url: ->
    if (id = @collectorProfile?.id)?
      "#{API_URL}/api/v1/collector_profile/#{id}/user_interest"
    else
      "#{API_URL}/api/v1/me/user_interest"

  initialize: (models, { @collectorProfile } = {}) -> #

  parse: (response) ->
    _.filter response, (obj) ->
      not _.isEmpty(obj.interest)

  fetch: (options = {}) ->
    options.url = "#{@url()}/artists" # Temporary hack for this non-RESTful endpoint

    if @collectorProfile?
      options.data = _.extend options.data or {}, @collectorProfile.pick('anonymous_session_id')

    super options

  comparator: (userInterest) ->
    -Date.parse(userInterest.get 'updated_at')

  findByInterestId: (id) ->
    @find (userInterest) ->
      userInterest.related().interest.id is id

  alreadyInterested: (interest) ->
    @findByInterestId(interest.id)?

  addInterest: (interest) ->
    return if @alreadyInterested interest

    @unshift
      interest_id: interest.id
      interest: interest.attributes

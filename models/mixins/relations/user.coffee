_ = require 'underscore'
Backbone = require 'backbone'
{ API_URL } = require('sharify').data

module.exports =
  related: ->
    @__related__?.collectorProfile?.set({ anonymous_session_id: @id } unless @isLoggedIn())

    return @__related__ if @__related__?

    CollectorProfile = require '../../collector_profile.coffee'

    collectorProfile = new CollectorProfile({ anonymous_session_id: @id } unless @isLoggedIn())

    account = new Backbone.Model
    account.url = "#{API_URL}/api/v1/user"
    account.fetch = _.wrap account.fetch, (fetch, options = {}) =>
      options.data = @pick('email')
      fetch.call account, options

    @__related__ =
      collectorProfile: collectorProfile
      account: account

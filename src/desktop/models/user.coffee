_ = require 'underscore'
Backbone = require 'backbone'
{ SESSION_ID } = require('sharify').data
Geo = require './mixins/geo.coffee'
Relations = require './mixins/relations/user.coffee'

# Base User model for shared functionality between
# CurrentUser and LoggedOutUser
module.exports = class User extends Backbone.Model
  _.extend @prototype, Geo
  _.extend @prototype, Relations

  priceBuckets: [
    { display: 'Under $500', value: '-1:500' }
    { display: 'Under $2,500', value: '-1:2500' }
    { display: 'Under $5,000', value: '-1:5000' }
    { display: 'Under $10,000', value: '-1:10000' }
    { display: 'Under $25,000', value: '-1:25000' }
    { display: 'Under $50,000', value: '-1:50000' }
    { display: 'Under $100,000', value: '-1:100000' }
    { display: 'No budget in mind', value: '-1:1000000000000' }
  ]

  # This refreshes the user data in the session so that saved data
  # will stay in sync on reloads
  refresh: (options = {}) ->
    @fetch _.extend(url: '/user/refresh', options)

  isCollector: ->
    @get('collector_level') >= 3 or
    @related().collectorProfile.isCollector()

  isCommercial: ->
    @get('collector_level') >= 2 or
    @related().collectorProfile.isCommercial()

  isAttending: (fair) ->
    @related().collectorProfile
      .related().userFairActions.isAttending fair

  isLoggedIn: ->
    @__isLoggedIn__

  isLoggedOut: ->
    not @isLoggedIn()

  isWithAnonymousSession: ->
    @id? and not @isLoggedIn()

  isRecentlyRegistered: ->
    @__isRecentlyRegistered__

  # Be sure to fetch this before calling
  isWithAccount: ->
    @related().account.id?

  @instantiate: (attributes = {}) ->
    CurrentUser = require './current_user.coffee'
    LoggedOutUser = require './logged_out_user.coffee'

    CurrentUser.orNull() or
    new LoggedOutUser attributes

  prepareForInquiry: ->
    @findOrCreate silent: true
      .then =>
        Promise.all [
          new Promise (resolve) =>
            if @isLoggedIn()
              resolve()
            else
              @related().account.fetch
                silent: true
                success: resolve
                error: resolve

          @related().collectorProfile.findOrCreate silent: true
        ]

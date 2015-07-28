_ = require 'underscore'
Q = require 'q'
Backbone = require 'backbone'
{ SESSION_ID, API_URL } = require('sharify').data
Relations = require './mixins/relations/collector_profile.coffee'

module.exports = class CollectorProfile extends Backbone.Model
  _.extend @prototype, Relations

  url: "#{API_URL}/api/v1/me/collector_profile"

  validHashFields: [
    'owner'
    'institutional_affiliations'
    'confirmed_buyer_at'
    'collector_level'
  ]

  fetch: (options = {}) ->
    options.data = _.extend options.data or {}, @pick('anonymous_session_id'), session_id: SESSION_ID
    super options

  instantiate: (options = {}) ->
    { success, error } = options
    options = _.omit options, 'success', 'error'
    Q.promise (resolve, reject) =>
      @fetch _.extend {}, options,
        success: ->
          resolve arguments...
          success? arguments...
        error: =>
          @save {},
            success: ->
              resolve arguments...
              success? arguments...
            error: ->
              reject arguments...
              error? arguments...

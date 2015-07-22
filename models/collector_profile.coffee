_ = require 'underscore'
Q = require 'q'
Backbone = require 'backbone'
{ API_URL } = require('sharify').data
Relations = require './mixins/relations/collector_profile.coffee'

module.exports = class CollectorProfile extends Backbone.Model
  _.extend @prototype, Relations

  url: "#{API_URL}/api/v1/me/collector_profile"

  fetch: (options = {}) ->
    options.data = _.extend options.data or {}, @pick('anonymous_session_id')
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

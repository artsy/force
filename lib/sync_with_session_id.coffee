_ = require 'underscore'
Backbone = require 'backbone'
{ SESSION_ID, NODE_ENV } = require('sharify').data
IS_TEST_ENV = not _.contains(['production', 'staging', 'development'], NODE_ENV)

module.exports = ->
  unless Backbone.__SESSION_SYNC_WRAPPED__ or IS_TEST_ENV
    data = session_id: SESSION_ID

    Backbone.__SESSION_SYNC_WRAPPED__ = true

    Backbone.sync = _.wrap Backbone.sync, (sync, method, model, options = {}) ->
      switch method
        when 'read'
          options.data = _.extend options.data or {}, data
        when 'delete'
          options.processData = true
          options.data = data
        else
          @set data, silent: true

      sync method, model, options

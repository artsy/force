_ = require 'underscore'
Q = require 'q'
Backbone = require 'backbone'
{ API_URL } = require('sharify').data
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

  findOrCreate: (options = {}) ->
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

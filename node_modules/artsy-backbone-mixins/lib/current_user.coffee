_ = require 'underscore'
Backbone = require 'backbone'

ARTSY_URL = ''

module.exports = (a) ->
  ARTSY_URL = a
  module.exports.methods

module.exports.methods =

  # Unlink a Social account like Facebook or Twitter
  unlinkAccount: (provider, options) ->
    m = new Backbone.Model(id: 1)
    m.url = "#{ARTSY_URL}/api/v1/me/authentications/#{provider}"
    m.destroy options
    m.once 'sync', =>
      return unless @get('authentications')
      @set authentications: _.reject @get('authentications'), (auth) ->
        auth.provider is provider

  # Add the access token to fetches and saves
  sync: (method, model, options={}) ->
    if method in ['create', 'update', 'patch']
      # If persisting to the server overwrite attrs
      options.attrs = _.omit(@toJSON(), 'accessToken')
    else
      # Otherwise overwrite data
      _.defaults(options, { data: { access_token: @get('accessToken') } })
    Backbone.Model::sync.call this, arguments...
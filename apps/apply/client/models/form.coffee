_ = require 'underscore'
{ APP_URL } = require('sharify').data
Backbone = require 'backbone'

module.exports = class Form extends Backbone.Model
  url: "#{APP_URL}/apply/form"

  defaults:
    oid: '00DC0000000PWQJ'

  # There are others... but this is just so
  # we can validate any attributes
  # coming in over a query string
  valid: [
    'company'
    'email'
    'first_name'
    'last_name'
    'phone'
    'title'
    'URL'
    '00NC0000005RNdW' # web_referrer
  ]

  @validate: (obj) ->
    _.pick obj, @::valid

  save: (attrs, options = {}) ->
    attrs = _.extend {}, @attributes, attrs
    _.each attrs, (val, key) ->
      if _.isArray val
        attrs[key] = val.join(';') + ';'

    super

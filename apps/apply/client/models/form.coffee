_ = require 'underscore'
{ APP_URL, REFERRER, MEDIUM } = require('sharify').data
Backbone = require 'backbone'
Cookies = require '../../../../components/cookies/index.coffee'

module.exports = class Form extends Backbone.Model
  url: "#{APP_URL}/apply/form"

  defaults:
    oid: '00DC0000000PWQJ'
    '00NC0000005RNdW': REFERRER
    '00NC0000005RNfS': MEDIUM
    '00NC0000005ROPB': Cookies.get('force-referrer')

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
    '00NC0000005RNdW' # Web Referrer
    '00NC0000005RNfS' # Web Medium
    '00NC0000005ROPB' # Web Source Referrer
  ]

  @validate: (obj) ->
    _.pick obj, @::valid

  save: (attrs, options = {}) ->
    attrs = _.extend {}, @attributes, attrs
    _.each attrs, (val, key) ->
      if _.isArray val
        attrs[key] = val.join(';') + ';'

    super

_ = require 'underscore'
moment = require 'moment'
{ APP_URL, REFERRER, MEDIUM, SESSION_ID } = require('sharify').data
Backbone = require 'backbone'
Cookies = require '../../../../components/cookies/index.coffee'

module.exports = class Form extends Backbone.Model
  url: "#{APP_URL}/apply/form"

  defaults:
    oid: '00DC0000000PWQJ'
    '00NC0000005RNdW': REFERRER
    '00NC0000005RNfS': MEDIUM
    '00NC0000005ROPB': Cookies.get('force-referrer')
    '00NC0000005RRYb': SESSION_ID
    # Abbreviated Channel
    '00NC0000005R4cC': 'Inbound'
    # Date of Partnership Application
    '00NC0000005Lkol': moment().format('YYYY-MM-DD')

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
    '00NC0000005R4cC' # Abbreviated Channel
    '00NC0000005Lkol' # Date of Partnership Application
  ]

  @validate: (obj) ->
    _.pick obj, @::valid

  save: (attrs, options = {}) ->
    attrs = _.extend {}, @attributes, attrs
    _.each attrs, (val, key) ->
      if _.isArray val
        attrs[key] = val.join(';') + ';'

    super

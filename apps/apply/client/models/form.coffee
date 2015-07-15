_ = require 'underscore'
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
    '00NC0000005RUKX': CURRENT_USER?.id
    '00NC0000005R4cC': 'Inbound'
    '00NC0000004ryxp': 'artsy.net/apply'
    '00NC0000005Lkol': Date()
    '00NC0000005Lkog': 'True'
    '00NC0000005QV8S': 'Inbound'

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
    '00NC0000005RUhH' # Fair Partner ID param if applying thru CMS/Folio link
    '00NC0000005RUhM' # User ID param if applying thru CMS/Folio link
  ]

  @validate: (obj) ->
    _.pick obj, @::valid

  save: (attrs, options = {}) ->
    whitelisted = _.pick @attributes, 'email'
    analytics.identify SESSION_ID, whitelisted, { 'Salesforce': true}
    options.success()


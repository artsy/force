_ = require 'underscore'
{ APP_URL } = require('sharify').data
Backbone = require 'backbone'

module.exports = class Form extends Backbone.Model
  url: "#{APP_URL}/apply/form"

  defaults:
    oid: '00DC0000000PWQJ'

  save: (attrs, options = {}) ->
    attrs = _.extend {}, @attributes, attrs
    _.each attrs, (val, key) ->
      if _.isArray val
        attrs[key] = val.join(';') + ';'

    super

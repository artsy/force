{ APP_URL } = require('sharify').data
Backbone = require 'backbone'

module.exports = class Form extends Backbone.Model
  url: "#{APP_URL}/apply/form"

  defaults:
    oid: '00DC0000000PWQJ'

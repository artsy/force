_ = require 'underscore'
Backbone = require 'backbone'
{ API_URL } = require('sharify').data
Relations = require './mixins/relations/inquiry_outcome'


module.exports = class InquiryOutcome extends Backbone.Model
  _.extend @prototype, Relations

  urlRoot: "#{API_URL}/api/v1/inquiry_request"

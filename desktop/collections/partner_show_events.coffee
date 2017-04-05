_ = require 'underscore'
PartnerShowEvent = require '../models/partner_show_event'
Backbone = require 'backbone'

module.exports = class PartnerShowEvents extends Backbone.Collection

  model: PartnerShowEvent

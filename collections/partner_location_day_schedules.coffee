_ = require 'underscore'
PartnerShowEvent = require '../models/partner_location_day_schedule.coffee'
Backbone = require 'backbone'

module.exports = class PartnerLocationDaySchedules extends Backbone.Collection

  model: PartnerLocationDaySchedules

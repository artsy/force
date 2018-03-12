sd = require('sharify').data
_ = require 'underscore'
Backbone = require 'backbone'
{ Image, Markdown } = require 'artsy-backbone-mixins'
OrderedSets = require '../collections/ordered_sets.coffee'
DateHelpers = require '../components/util/date_helpers.coffee'
Clock = require './mixins/clock.coffee'
moment = require 'moment'
Profile = require './profile.coffee'

module.exports = class FairOrganizer extends Backbone.Model
  _.extend @prototype, Image(sd.SECURE_IMAGES_URL)
  _.extend @prototype, Markdown
  _.extend @prototype, Clock

  urlRoot: "#{sd.API_URL}/api/v1/fair_organizer"

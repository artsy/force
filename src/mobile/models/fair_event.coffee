_ = require 'underscore'
sd = require('sharify').data
Backbone = require 'backbone'
dateMixin = require './mixins/date.coffee'
querystring = require 'querystring'
moment = require 'moment'
{ Markdown, CalendarUrls } = require 'artsy-backbone-mixins'

module.exports = class FairEvent extends Backbone.Model

  _.extend @prototype, dateMixin
  _.extend @prototype, Markdown
  _.extend @prototype, CalendarUrls({address: 'venue_address', title: 'name'})

  urlRoot: ->
    "#{sd.API_URL}/api/v1/fair/#{@get('fair').id}/fair_event"

  getDate: ->
    "#{moment(@get 'start_at').utc().format('dddd, MMMM D')}"

  getTime: ->
    "#{moment(@get 'start_at').utc().format('h:mm')}&ndash;#{moment(@get 'end_at').utc().format('h:mma')}"

  getEventGroups: ->
    _.pluck(@get('fair_event_groups'), 'name').join(', ')

  href: ->
    "/#{@get('fair').default_profile_id}/info/events/#{@get('id')}"

  icsHref: ->
    "#{sd.CALENDAR_URL}/#{@get('fair').default_profile_id}/info/events/#{@get('id')}.ics"

  getDetailDescriptionHtml: ->
    if @has('extended_description')
      @mdToHtml 'extended_description'
    else
      @mdToHtml 'description'

  gmapLink: ->
    "https://maps.google.com/maps?#{querystring.stringify({ q: @get('venue_address') })}"

  getGroupDetailsHtml: ->
    details = []
    for group in @get('fair_event_groups')
      details.push group.description
    @set 'groupDetails', details.join('')
    @mdToHtml 'groupDetails'

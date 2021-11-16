_ = require 'underscore'
Backbone = require 'backbone'
PartnerShow = require '../../../../models/partner_show.coffee'
{ PartnerShows } = require '../../../../collections/partner_shows'
{ PartnerShowEvents } = require '../../../../collections/partner_show_events'
require '../../../../../lib/promiseDone'
template = -> require('./index.jade') arguments...
{ API_URL } = require('sharify').data

module.exports = class NewsView extends Backbone.View

  initialize: (options = {}) ->
    { @partner } = options

  startUp: ->
    @fetch().then((results) =>
      showEvents = results[0]
      fairBooths = results[1]
      @consolidate(showEvents, fairBooths)
    ).then(@render).done()

  fetch: ->
    showEvents = new PartnerShowEvents
    showEvents.url = "#{API_URL}/api/v1/partner_show_events"
    fairBooths = new PartnerShows
    data =
      partner_id: @partner.get('_id')
      status: 'current'
      sort: 'start_at'
      size: 3

    Promise.allSettled([
      showEvents.fetch data: data
      fairBooths.fetch data: _.extend {}, data, at_a_fair: true, displayable: true
    ])
    .then ->
      [showEvents, fairBooths]

  consolidate: (showEvents, fairBooths) =>
    _.sortBy(
      showEvents.map (e) ->
        title: e.get('partner_show')?.name
        subtitle: e.get('event_type')
        titleLink: new PartnerShow(e.get('partner_show')).href()
        start_at: e.get('start_at')
        time: e.formatDateRange('start_at', 'end_at')
      .concat fairBooths.map (b) ->
        title: b.get('name')
        subtitle: 'Fair Booth'
        titleLink: b.href()
        start_at: b.get('start_at')
        time: b.runningDates()
    , 'start_at')

  render: (news) =>
    return @remove() unless news.length > 0

    @$el.html template news: news

  remove: ->
    @$el.closest('.partner2-overview-section').remove()
    super

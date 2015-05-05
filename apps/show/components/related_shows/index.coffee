_ = require 'underscore'
{ Cities, FeaturedCities } = require 'places'
PartnerShows = require '../../../../collections/partner_shows.coffee'
RelatedShowsView = require './view.coffee'

module.exports = (type, show) ->

  city = _.findWhere(Cities, name: show.formatCity())

  el = $('.js-related-shows')

  criteria =
    sort: 'end_at'
    size: 4
    displayable: true

  relatedShows = new PartnerShows

  switch type
    when 'fair'
      data =  _.extend criteria, fair_id: show.related().fair.get('_id')
      title = "More Booths from #{show.related().fair.get('name')}"
    when 'gallery'
      data = _.extend criteria, sort: '-end_at', size: '8'
      relatedShows.url = "#{show.related().partner.url()}/shows"
      title = "Other Shows from #{show.partnerName()}"
    when 'featured'
      data = _.extend criteria, featured: true, status: 'running'
      el = $('.js-featured-shows')
      title = "Featured Shows"
    when 'city'
      data = _.extend criteria, near: city.coords.toString(), sort: '-start_at'
      title = "Current Shows in #{show.formatCity()}"

  new RelatedShowsView
    collection: relatedShows
    title: title
    el: el

  relatedShows.fetch
    data: data
    success: ->
      relatedShows.getShowsRelatedImages()


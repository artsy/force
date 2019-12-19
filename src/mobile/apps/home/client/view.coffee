_ = require 'underscore'
Backbone = require 'backbone'
FeaturedLinks = require '../../../collections/featured_links.coffee'
ShowsFeed = require '../../../collections/shows_feed.coffee'
PoliteInfiniteScrollView = require '../../../components/polite_infinite_scroll/client/view.coffee'
Flickity = require 'flickity'
{ seeMoreArtworks } = require '../../../components/show_more_works/index.coffee'

featuredItemsTemplate = -> require('../../../components/featured_items/template.jade') arguments...
currentShowsTemplate = -> require('../templates/current_shows.jade') arguments...
artworkColumnsTemplate = -> require('../../../components/artwork_columns/template.jade') arguments...

module.exports = class HomePageView extends PoliteInfiniteScrollView

  el: 'body'
  heroDelay: 10000   # 10s

  events: 
    'click .show-more-works__artworks-slider' : seeMoreArtworks

  initialize: ->
    @collection = new ShowsFeed

    @slideshow = new Flickity '#carousel-track',
      cellAlign: 'left'
      contain: true
      prevNextButtons: false
      wrapAround: true
      autoPlay: @heroDelay

    super

  onSync: =>
    @$('#home-page-current-shows').html currentShowsTemplate(
      shows: @collection.models
      artworkColumnsTemplate: artworkColumnsTemplate
    )

  onInfiniteScroll: -> @collection.nextPage()

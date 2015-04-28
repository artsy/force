Q = require 'q'
_ = require 'underscore'
sd = require('sharify').data
Backbone = require 'backbone'
{ resize } = require '../../../../components/resizer/index.coffee'
PartnerShow = require '../../../../models/partner_show.coffee'
PartnerShows = require '../../../../collections/partner_shows.coffee'

RelatedImages = require './related_images.coffee'
template = -> require('./template.jade') arguments...

SHOW_INFO_WIDTH = 320

module.exports = class RelatedShowsView extends Backbone.View

  className: 'show-related-shows-container'

  initialize: ( options ) ->
    @title = options.title
    @shows = options.collection
    @listenTo @shows, 'sync', @getShowsImages
    return this

  getShowsImages: ->
    @shows.models.map (show) =>
      show.related().relatedImages = new RelatedImages [],
        show: show
        containerWidth: $('.main-layout-container').width()
        showInfoWidth: SHOW_INFO_WIDTH
      @listenTo show.related().relatedImages, 'reset', @render
      show.related().relatedImages.fetch()

  render: ->
    @$el.html template
      title: @title
      shows: @shows.models
    console.log @$el.html()
    this

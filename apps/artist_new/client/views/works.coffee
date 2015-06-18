_ = require 'underscore'
_s = require 'underscore.string'
sd = require('sharify').data
qs = require 'qs'
Backbone = require 'backbone'
mediator = require '../../../../lib/mediator.coffee'
FilterArtworks = require '../../../../collections/filter_artworks.coffee'
FilterView = require '../../../../components/filter2/view.coffee'
FilterRouter = require '../../../../components/filter2/router/index.coffee'
aggregationParams = require '../../aggregations.coffee'

template = -> require('../../templates/sections/works.jade') arguments...

module.exports = class WorksView extends Backbone.View

  initialize: (options)->
    @collection = new FilterArtworks []

    queryParams =  qs.parse(location.search.replace(/^\?/, ''))

    @params = new Backbone.Model _.extend queryParams,
      artist_id: @model.id
      aggregations: aggregationParams

  setupArtworkFilter: ->
    @params.set page: 1

    view = new FilterView
      el: @$ '#artist-filter'
      collection: @collection
      params: @params
      stuckFacet: @model
      includeFixedHeader: false
      facets: aggregationParams

    view.on 'state:finished-paging', @showFooter

    @collection.fetch
      data: @params.toJSON()
      success: =>
        @collection.trigger 'initial:fetch'

    router = new FilterRouter
      params: @params
      urlRoot: window.location.pathname
      stuckParam: 'artist_id'

  render: ->
    @$el.html template
      artist: @model
      filterRoot: sd.FILTER_ROOT
      counts: sd.FILTER_COUNTS
      numberFormat: _s.numberFormat
      params: @params
      activeText: ''
    _.defer => @postRender()
    this

  postRender: ->
    @setupArtworkFilter()
    @hideFooter()

  hideFooter: ->
    $('#main-layout-footer').hide()

  showFooter: ->
    $('#main-layout-footer').show()

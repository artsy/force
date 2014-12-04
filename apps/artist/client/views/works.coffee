_ = require 'underscore'
sd = require('sharify').data
Backbone = require 'backbone'
mediator = require '../../../../lib/mediator.coffee'
Sticky = require '../../../../components/sticky/index.coffee'
Artworks = require '../../../../collections/artworks.coffee'
ArtworkFilter = require '../../../../components/artwork_filter/index.coffee'
BorderedPulldown = require '../../../../components/bordered_pulldown/view.coffee'
template = -> require('../../templates/sections/works.jade') arguments...

module.exports = class WorksView extends Backbone.View
  subViews: []

  initialize: ({ @user }) ->
    @sticky = new Sticky

  fadeInSection: ($el) ->
    $el.show()
    _.defer -> $el.addClass 'is-fade-in'
    $el

  setupArtworkFilter: ->
    filterRouter = ArtworkFilter.init el: @$('#artwork-section'), model: @model, mode: 'infinite'
    @subViews.push filterRouter.view
    $.onInfiniteScroll ->
      filterRouter.view.loadNextPage()

  postRender: ->
    @setupArtworkFilter()

  render: ->
    @$el.html template(artist: @model)
    _.defer => @postRender()
    this

  remove: ->
    $(window).off 'infiniteScroll'
    _.invoke @subViews, 'remove'

_ = require 'underscore'
Backbone = require 'backbone'
initCarousel = require '../../../../components/merry_go_round/bottom_nav_mgr.coffee'
require '../../../../../lib/promiseDone'

module.exports = class FixedCellsCountCarousel extends Backbone.View
  defaults:
    cellsCountPerPage: 3
    pagesCount: 3

  # @param [Object] options - the initialization options
  # @option options [Object] collection - the Backbone collection to fetch data
  # @option options [Object, Array] fetchOptions - the fetch options used to fetch the collection.
  #   It can be an object for a single fetch or an array for multiple fetch requests. All the
  #   fetched data will be added to the same collection.
  # @option options [Function] template - the templating function to render the view.
  initialize: (options = {}) ->
    { @partner, @collection, @cellsCountPerPage, @pagesCount,
      @fetchOptions, @template } = _.defaults options, @defaults

    throw new Error 'no collection provided' unless @collection?
    @fetchOptions = [@fetchOptions] unless _.isArray @fetchOptions

  startUp: ->
    @fetch().then(@consolidate).then(@initCarousel).done()

  fetch: ->
    Promise.allSettled(
      _.map @fetchOptions, (options) =>
        @collection.fetch data: options, remove: false
    ).then (values) =>
      objects = _(values).chain().pluck('value')
      if objects.first().has('results').value() # For articles wrapped in results
        objects = objects.pluck('results')
      @collection.reset objects.flatten().value()
      @collection

  # Only keep the first cellsCountPerPage * pagesCount items.
  consolidate: (collection) =>
    collection.reset collection.first(@cellsCountPerPage * @pagesCount)
    collection

  initCarousel: (collection) =>
    return @remove() unless collection?.length > 0

    carouselDisplayable = collection.length > @cellsCountPerPage
    @$el.html @template? collection: collection, displayNav: carouselDisplayable

    return unless carouselDisplayable
    initCarousel @$el, wrapAround: true, imagesLoaded: true, cellAlign: 'left', (carousel) =>
      fky = carousel.cells.flickity
      @$('.js-mgr-prev').on 'click', => fky.select fky.selectedIndex - @cellsCountPerPage
      @$('.js-mgr-next').on 'click', => fky.select fky.selectedIndex + @cellsCountPerPage

  remove: ->
    @$el.closest('.partner2-overview-section').remove()
    super

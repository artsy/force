_ = require 'underscore'
_s = require 'underscore.string'
Backbone = require 'backbone'
FilterArtworks = require '../../../collections/filter_artworks.coffee'

module.exports = class DropdownView extends Backbone.View

  events:
    'click a[data-attr]': 'handleSelect'
    'mouseenter .filter-dropdown': 'adjustMenu'

  initialize: ({@collection, @params, @facet, @el, @facets}) ->
    @renderActiveParam()

    @listenTo @collection, 'initial:fetch', @updateCounts
    @listenTo @params, "change:#{@facet}", @renderActiveParam
    @listenTo @params, 'change', @updateCounts

  updateCounts: ->
    # we need a copy of the params without this facet and
    # we don't need results, just counts
    clonedParams = @params.clone().unset(@facet).set { size: 0, page: 1 }
    updatedCounts = new FilterArtworks
    updatedCounts.fetch
      data: clonedParams.toJSON()
      success: @renderCounts

  renderCounts: (collection, response) =>
    counts = collection.counts[@facet]

    for k, v of counts
      $criterion = @$("a[data-attr='#{@facet}'][data-val='#{k}']")
      $criterion.find('.filter-dropdown-count').text "(#{_s.numberFormat(v.count)})"
      if v.count > 0
        $criterion.removeClass('is-disabled')
      else
        $criterion.addClass('is-disabled')

  removeActive: ->
    @$el.removeClass('is-active')
    @$('a.is-active').removeClass('is-active')

  renderActiveParam: ->
    $a = @$("a[data-attr='#{@facet}'][data-val='#{@params.get(@facet)}']")
    if $a.length
      $a.addClass('is-active')
        .closest('.filter-dropdown')
        .addClass('is-active')
        .children('.filter-nav-active-text')
        .text $a.children('.filter-dropdown-text').text()

  adjustMenu: (e) ->
    $dropdown = $(e.currentTarget)
    $menu = $dropdown.find('nav')
    $world = $(document)

    if $dropdown.offset().left + $menu.width() > $world.width()
      $menu.css left: 'auto', right: 0

  handleSelect: (e) ->
    val = $(e.currentTarget).data 'val'

    if val is ''
      @params.unset @facet
      @removeActive()
    else
      @params.set @facet, val

    @renderActive e
    _.defer => @hideMenu e

    false

  renderActive: (e) ->
    _.defer =>
      @$('a.is-active').removeClass('is-active')
      $(e.currentTarget).addClass('is-active')

  hideMenu: (e) ->
    unless navigator.userAgent.match('iPad')
      $(e.currentTarget).closest('nav').hidehover()




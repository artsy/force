_ = require 'underscore'
Backbone = require 'backbone'

module.exports = class FilterArtworksNav extends Backbone.View

  initialize: (options) ->
    _.extend @, options
    @counts.on 'sync', @renderCounts
    @params.on 'change', @highlightAllWorks
    @setupForceMouseOut()

  renderCounts: =>
    for attr, counts of @counts.toJSON()
      for val, count of counts
        @$("a[data-attr='#{attr}'][data-val='#{val}'] .filter-dropdown-count").html '(' + count + ')'

  highlightAllWorks: =>
    if _.intersection(['price_range', 'dimension', 'medium'], @params.keys()).length is 0
      @$('.filter-artworks-nav-allworks').addClass('is-active')

  events:
    'click .filter-artworks-nav-allworks': 'allWorks'
    'click a[data-attr]': 'filterAttr'
    'click .filter-dropdown a': 'hideMenu'

  allWorks: ->
    @params.clear().trigger('change')

  filterAttr: (e) ->
    attr = $(e.currentTarget).data 'attr'
    val = $(e.currentTarget).data 'val'
    return @params.unset attr if val is ''
    @params.set attr, val

  hideMenu: (e) ->
    $(e.currentTarget).parent().hidehover() unless navigator.userAgent.match('iPad')

  #
  # Force mouseout event of dropdowns to be triggered on mobile Safaris.
  #
  # NOTE: The dropdown menu shows on hover. However, on iOS touch deveices 
  # it's not trivial to "unhover" it, since the `mouseout` event won't
  # be triggered until the user taps on another clickable item. 
  # This makes the entire document (sort of, see NOTE2) clickable, 
  # so when the `click` event bubbles up it will trigger the dropdown's 
  # mouseout event and dismiss the menu.
  #
  # NOTE2: The click events will bubble up the DOM tree, but they simply
  # never reach the body or the document on iOS. :(
  # 
  # https://developer.apple.com/library/safari/documentation/appleapplications/reference/safariwebcontent/HandlingEvents/HandlingEvents.html#//apple_ref/doc/uid/TP40006511-SW7
  setupForceMouseOut: ->
    @$el.closest('body > div').attr "onclick", "void(0)"

_ = require 'underscore'
Backbone = require 'backbone'

module.exports = class FilterArtworksNav extends Backbone.View

  initialize: (options) ->
    _.extend @, options
    @counts.on 'sync', @renderCounts
    @params.on 'change', @renderActive
    @renderActive()
    @setupForceMouseOut()

  renderCounts: =>
    for attr, counts of @counts.toJSON()
      for val, count of counts
        @$("a[data-attr='#{attr}'][data-val='#{val}'] .filter-dropdown-count").html '(' + count + ')'

  renderActive: =>
    attrs = ['price_range', 'dimension', 'medium']
    @$('.is-active').removeClass('is-active')
    if _.intersection(attrs, @params.keys()).length is 0
      @$('.filter-artworks-nav-allworks').addClass('is-active')
    else
      for attr in attrs
        return unless $a = @$("a[data-attr='#{attr}'][data-val='#{@params.get(attr)}']")
        $a.addClass('is-active')
          .closest('.filter-dropdown')
          .addClass('is-active')
          .children('.filter-nav-active-text')
          .text $a.children('.filter-dropdown-text').text()

  events:
    'click .filter-artworks-nav-allworks': 'allWorks'
    'click a[data-attr]': 'filterAttr'
    'click .filter-dropdown a': 'hideMenu'
    'click .filter-dropdown': 'toggleMenuIpad'

  allWorks: ->
    @params.clear().trigger('change')

  filterAttr: (e) ->
    attr = $(e.currentTarget).data 'attr'
    val = $(e.currentTarget).data 'val'
    return @params.unset attr if val is ''
    @params.set attr, val

  hideMenu: (e) ->
    $(e.currentTarget).parent().hidehover()

  toggleMenuIpad: (e) ->
    $(e.currentTarget).toggleClass('is-hover') if navigator.userAgent.match('iPad')
    false

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
    # Heuristic to select the "document" without coupling with the outside world.
    @$el.closest('body > div').attr "onclick", "void(0)"

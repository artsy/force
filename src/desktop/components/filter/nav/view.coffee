_ = require 'underscore'
Backbone = require 'backbone'

module.exports = class FilterNav extends Backbone.View

  initialize: (options) ->
    _.extend @, options
    @params.on 'change', @clearActive
    @params.on 'change', @renderActiveParams
    @params.on 'change', @highlightAll
    @params.on 'change', @highlightDropdownAlls
    @setupForceMouseOut()

  clearActive: =>
    @$('.filter-button, .filter-dropdown a, .filter-dropdown').removeClass('is-active')

  renderActiveParams: =>
    for attr in @params.keys()
      continue unless ($a = @$("a[data-attr='#{attr}'][data-val='#{@params.get(attr)}']")).length
      $a.addClass('is-active')
        .closest('.filter-dropdown')
        .addClass('is-active')
        .children('.filter-nav-active-text')
        .text $a.children('.filter-dropdown-text').text()

  highlightAll: =>
    return unless _.intersection(@highlightAllAttrs, @params.keys()).length is 0
    @$('.filter-nav-all').addClass('is-active')

  highlightDropdownAlls: =>
    @$("a[data-attr][data-val='']").each (i, el) =>
      $(el).addClass('is-active') unless @params.get $(el).data('attr')

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
  # never reach the body or the document on iOS.:(
  #
  # https://developer.apple.com/library/safari/documentation/appleapplications/reference/safariwebcontent/HandlingEvents/HandlingEvents.html#//apple_ref/doc/uid/TP40006511-SW7
  setupForceMouseOut: ->
    @$el.closest('body > div').attr "onclick", "void(0)"

  events:
    'click a[data-attr]': 'filterAttr'
    'click .filter-dropdown a': 'hideMenu'
    'click .filter-button, .filter-dropdown a': 'renderActive'
    'click .filter-nav-all': 'all'
    'mouseenter .filter-dropdown': 'adjustMenu'

  adjustMenu: (e) ->
    $dropdown = $(e.currentTarget)
    $menu = $dropdown.find('nav')
    $world = $(document)

    if $dropdown.offset().left + $menu.width() > $world.width()
      $menu.css left: 'auto', right: 0

  filterAttr: (e) ->
    attr = $(e.currentTarget).data 'attr'
    val = $(e.currentTarget).data 'val'
    if val is ''
      @params.unset attr
    else
      @params.set attr, val
    false

  hideMenu: (e) ->
    $(e.currentTarget).parent().hidehover()

  renderActive: (e) ->
    _.defer -> $(e.currentTarget).addClass('is-active')

  all: ->
    @params.clear().trigger('reset')

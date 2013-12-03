# jQuery.fillwidth
#
# A plugin that given a `ul` with images inside their `lis` will do some things to line them up so
# that everything fits inside their container nice and flush to the edges while retaining the
# integrity of the original images (no cropping or skewing).
#
# Markup should be something like:
# <ul>
#   <li>
#     <img>
#
$ = jQuery

# Plugin globals
totalPlugins = 0
callQueue = []

# In memory row and li objects
# ----------------------------
class Li

  constructor: (el, settings) ->
    $el = $(el)
    @originalWidth = @width = $el.outerWidth(false)
    @originalHeight = @height = $el.height()
    @originalMargin = @margin = $el.outerWidth(true) - $el.outerWidth(false)
    $img = $el.find('img')
    @imgRatio = $img.width() / $img.height()
    @$el = $el
    @settings = settings

  setHeight: (h) ->
    @width = Math.round(h * (@width / @height))
    @height = h unless @settings.lockedHeight # comment if locked height

  setWidth: (w) ->
    @height = Math.round(w * (@height / @width))
    @width = w

  decWidth: -> @setWidth @width - 1

  decHeight: -> @setHeight @height - 1

  incWidth: -> @setWidth @width + 1

  incHeight: -> @setHeight @height + 1

  updateDOM: ->
    @$el.css
      width          : @width
      height         : @height
      'margin-right' : @margin
    @$el.find('img').height 'auto'

  reset: ->
    @width = @originalWidth
    @height = @originalHeight
    @margin = @originalMargin
    @$el.css
      width          : @width
      height         : @height
      'margin-right' : @margin

class Row

  constructor: (@frameWidth, @settings) ->
    @lis = []

  width: ->
    width = 0
    width += (li.width + li.margin) for li in @lis
    width

  updateDOM: ->
    li.updateDOM() for li in @lis

  # Resets the styling of the lis to be able to run calculations on a clean slate
  reset: -> li.reset() for li in @lis

  # Get an array of groups of landscapes in order of @settings.landscapeRatios
  # e.g. [[li,li],[li,li,li]]
  landscapeGroups: ->
    landscapeGroups = []
    for i, ratio of @settings.landscapeRatios
      landscapes = (li for li in @lis when li.imgRatio >= ratio)
      landscapeGroups.push landscapes
    landscapeGroups

  # Resize the landscape's height so that it fits the frame
  resizeLandscapes: ->
    for landscapes in @landscapeGroups(@settings.landscapeRatios) when landscapes.length isnt 0

      # Reduce the landscapes until we are within the frame or beyond our threshold
      for i in [0..@settings.resizeLandscapesBy]
        li.decHeight() for li in landscapes
        break if @width() <= @frameWidth
      break if @width() <= @frameWidth
    @

  # Adjust the margins between list items to try an reach the frame
  adjustMargins: ->
    for i in [0..@settings.adjustMarginsBy]
      for li in @lis[0..@lis.length - 2]
        li.margin--
        break if @width() <= @frameWidth
      break if @width() <= @frameWidth

  # Resize the entire row height by a maximum ammount in an attempt make the margins
  resizeHeight: ->
    i = 0
    while @width() > @frameWidth and i < @settings.resizeRowBy
      i++
      li.decHeight() for li in @lis

  # Round off all of the li's width
  roundOff: ->
    li.setWidth(Math.floor li.width) for li in @lis

  # Arbitrarily extend lis to fill in any pixels that got rounded off
  fillLeftoverPixels: ->
    @roundOff()
    diff = => @frameWidth - @width()

    while diff() isnt 0
      randIndex = Math.round Math.random() * (@lis.length - 1)
      if diff() < 0
        @lis[randIndex].decWidth()
      else
        @lis[randIndex].incWidth()

  # Removes the right margin from the last row element
  removeMargin: ->
    lastLi = @lis[@lis.length - 1]
    lastLi.margin = 0

  # Make sure all of the lis are the same height (the tallest li in the group)
  lockHeight: ->
    tallestLi = (@lis.sort (a, b) -> b.height - a.height)[0]
    tallestHeight = Math.ceil tallestLi.height
    li.height = tallestHeight for li in @lis

  # Go through the lis and hide them
  hide: -> li.$el.hide() for li in @lis

  # Go through the lis and show them
  show: -> li.$el.show() for li in @lis

# Debounce stolen from underscore.js
# ----------------------------------
debounce = (func, wait) ->
  timeout = 0
  return ->
    args = arguments
    throttler = =>
      timeout = null
      func args

    clearTimeout timeout
    timeout = setTimeout(throttler, wait)

# Methods
# -------
methods =

  # Called on initialization of the plugin
  init: (settings) ->

    # Settings
    _defaults =
      resizeLandscapesBy: 200
      resizeRowBy: 30
      landscapeRatios: (i / 10 for i in [10..50] by 3).reverse()
      fillLastRow: false
      beforeFillWidth: null
      afterFillWidth: null
    @settings = $.extend _defaults, settings

    @each (i, el) =>
      $el = $(el)
      methods.initStyling.call @, $el

      # Decide to run fillWidth after all of the child images have loaded, or before hand depending
      # on whether the @settings to do the latter have been specified.
      initFillWidth = =>
        methods.fillWidth.call @, $el
        # work around for iOS and IE8 continuous resize bug
        # Cause: in iOS changing document height triggers a resize event
        unless navigator.userAgent.match(/iPhone/i) or
               navigator.userAgent.match(/iPad/i) or
               navigator.userAgent.match(/iPod/i) or
               navigator.userAgent.match(/MSIE 8\.0/i)
          $(window).bind 'resize.fillwidth', debounce (=>
            callQueue.push (=> methods.fillWidth.call @, $el)
            if callQueue.length is totalPlugins
              fn() for fn in callQueue
              callQueue = []
          ), 300
        totalPlugins++

      $imgs = $el.find('img')

      if @settings.imageDimensions?
        initFillWidth()
      else
        imagesToLoad = $imgs.length
        $imgs.load ->
          imagesToLoad--
          initFillWidth() if imagesToLoad is 0

  # Initial styling applied to the element to get lis to line up horizontally and images to be
  # contained well in them.
  initStyling: (el) ->
    $el = $ el
    $el.css
      'list-style': 'none'
      padding: 0
      margin: 0
      overflow: 'hidden'
    $el.css @settings.initStyling if @settings.initStyling?
    $el.children('li').css
      'float': 'left'
      'margin-left': 0

    $el.find('*').css
      'max-width': '100%'
      'max-height': '100%'

    # Set the initial width and height of the lis if passed in
    if @settings and @settings.imageDimensions?
      $el.children('li').each (i, el) =>
        $img = $(el).find('img').first()
        $img.width @settings.imageDimensions[i].width
        $img.height @settings.imageDimensions[i].height

  # Removes the fillwidth functionality completely. Returns the element back to it's state
  destroy: ->
    $(window).unbind 'resize.fillwidth'
    @each ->
      row.reset() for row in $(@).fillwidth('rowObjs')
      $(@).removeData('fillwidth.rows')

  # Combines all of the magic and lines the lis up
  fillWidth: (el) ->
    $el = $ el
    $el.trigger 'fillwidth.beforeFillWidth'
    @settings.beforeFillWidth() if @settings.beforeFillWidth?

    # Reset the list items & unfreeze the container
    if @fillwidthRows
      row.reset() for row in @fillwidthRows #$el.data 'fillwidth.rows'
    $el.width 'auto'

    $el.trigger 'fillwidth.beforeNewRows'
    @settings.beforeNewRows() if @settings.beforeNewRows?

    # Store the new row in-memory objects and re-freeze the container
    @frameWidth = $el.width()
    rows = methods.breakUpIntoRows.call @, $el
    @fillwidthRows = rows
    $el.width @frameWidth

    $el.trigger 'fillwidth.afterNewRows'
    @settings.afterNewRows() if @settings.afterNewRows?

    # Go through each row and try various things to line up
    for row in rows
      continue unless row.lis.length > 1
      row.removeMargin()
      row.resizeHeight()
      row.adjustMargins() if @settings.adjustMarginsBy?
      row.resizeLandscapes()
      row.fillLeftoverPixels() unless row is rows[rows.length - 1] and not @settings.fillLastRow
      row.lockHeight()
      row.updateDOM()

    $el.trigger 'fillwidth.afterFillWidth'
    @settings.afterFillWidth() if @settings.afterFillWidth?

  # Returns the current in-memory row objects
  rowObjs: ->
    arr = []
    rows = @fillwidthRows
    @each ->
      arr.push rows
    arr = arr[0] if arr.length is 1
    arr

  # Returns an array of groups of li elements that make up a row
  rows: ->
    rows = methods.rowObjs.call @
    arr = []
    for row in rows
      arr.push (li.$el for li in row.lis)
    arr = arr[0] if arr.length is 1
    arr

  # Determine which set of lis go over the edge of the container, and store their
  # { width, height, el, etc.. } in an array. Storing the width and height in objects helps run
  # calculations without waiting for render reflows.
  breakUpIntoRows: (el) ->
    $el = $ el
    i = 0
    rows = [new Row(@frameWidth, @settings)]
    $el.children('li').each (j, li) =>
      return if $(li).is(':hidden')
      rows[i].lis.push new Li li, @settings
      if rows[i].width() >= $el.width() and j isnt $el.children('li').length - 1
        rows.push new Row(@frameWidth, @settings)
        i++
    rows

# Either call a method if passed a string, or call init if passed an object
$.fn.fillwidth = (method) ->
  if methods[method]?
    methods[method].apply @, Array::slice.call(arguments, 1)
  else if typeof method is "object" or not method?
    methods.init.apply @, arguments
  else
    $.error "Method #{method} does not exist on jQuery.fillwidth"

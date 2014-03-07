# jquery.popLockIt
# https://github.com/zamiang/jquery.popLockIt
#
# A jQuery plugin for 'locking' short content in place as the user
# scrolls by longer content. For example, it will lock metadata and
# share buttons in place as the user scrolls by a long essay or series
# of images.
#
# Copyright (c) 2013 Brennan Moore, Artsy
# Licensed under the MIT license.
#
# DOM STRUCTURE:
# Feed
# -- FeedItem
# ---- Column
# ---- Column
# ---- Column
# -- FeedItem
# ---- Column
# ...

(($, window, document) ->

  pluginName = "popLockIt"

  class Base

    requires: []

    constructor: (@$el, @settings) ->
      for require in @requires
        throw "You must pass #{require}" unless @settings[require]?


  class Column extends Base

    requires: ['height', 'marginTop', 'marginLeft', 'marginBottom']
    cssProperties: ['position', 'top', 'bottom', 'left']

    # defaults
    marginTop: 0
    marginBottom: 0
    marginLeft: 0
    parentHeight: 0

    height: 0
    top: 0
    bottom: 0
    left: 0

    constructor: (@$el, @settings) ->
      @

    setMargins: (settings) ->
      @parentHeight = settings.parentHeight if settings.parentHeight
      @marginTop = settings.marginTop if settings.marginTop
      @marginBottom = settings.marginBottom if settings.marginBottom
      @marginLeft = settings.marginLeft if settings.marginLeft

    setDimensions: ->
      @height = Math.floor Number(@$el.css('height').replace('px',""))
      @top = Math.floor(@$el.offset().top - @marginTop)
      @left = Math.floor(@$el.offset().left)
      @bottom = Math.floor(@top + @parentHeight - @height)
      @top = 1 if @top < 1

    setPosition: (pos = 'absolute', direction = 'north') ->
      newState =
        position : pos
        left     : Math.round(@getLeftForPosition(pos))

      if pos == 'absolute'
        newState.top = if direction == 'north' then @marginTop else 'auto'
        newState.bottom = if direction == 'south' then @marginBottom else 'auto'
      else
        newState.top = if direction == 'north' then @marginTop else 'auto'
        newState.bottom = if direction == 'south' then 0 else 'auto'

      # first time around we have nothing to diff and want to apply the entire changeset
      unless @oldState
        @$el.css newState
        return @oldState = newState

      diff = {}
      changed = false
      for prop in @cssProperties
        if newState[prop] != @oldState[prop]
          diff[prop] = newState[prop]
          changed = true

      if changed
        @$el.css diff
        @oldState = newState

    getLeftForPosition: (pos) ->
      if pos == 'fixed'
        @left
      else if pos == 'static'
        0
      else
        @left - @marginLeft

    onScroll: (scrollTop, viewportHeight, preventFixed=false, scrollDirection) ->
      if !preventFixed
        if @height == viewportHeight
          if (scrollTop < @top + @parentHeight - @height)
            return @setPosition('fixed', 'north')
          return @setPosition('absolute', 'south')
        else if @height < viewportHeight
          return @setPosition('fixed', 'north') if scrollTop >= @top and scrollTop < @top + @parentHeight - @height
          return @setPosition('absolute', 'south')
        return @setPosition('fixed', 'south') if @height > viewportHeight and @height < @parentHeight and (scrollTop + viewportHeight) >= (@top + @height) and (scrollTop + viewportHeight) < (@parentHeight + @top)

      if @height >= viewportHeight
        if scrollTop >= @top + @height
          return @setPosition('absolute', 'south')
      @setPosition('absolute', 'north')

    # return to default state on destroy
    destroy: -> @setPosition()





  class FeedItem extends Base

    requires: ['columnSelector']
    active: false
    columns: []

    constructor: (@$el, @settings, @index, @parent) ->
      super
      @$columns = @$el.find @settings.columnSelector
      if @hasColumns()
        @setDimensions()
        @createColumns()

      @settings.additionalFeedItemInit(@$el, @index) if @settings.additionalFeedItemInit
      @

    createColumns: ->
      @columns = @$columns.map -> new Column($(this))
      @setColumnMargins(column) for column in @columns
      column.setDimensions() for column in @columns

    setDimensions: ->
      # accomodate for when feed items have different padding
      @marginTop = Number(@$el.css('padding-top').replace('px', ''))
      @marginBottom = Number(@$el.css('padding-bottom').replace('px', ''))

      @resetColumnPositioning()
      @$el.css height: 'auto'

      height = @$el.css('height')
      @height = Number(height.replace('px',""))

      @$el.css
        height: height

      @left = @$el.offset().left
      @top = @$el.offset().top
      @bottom = @top + @height

    onScroll: (scrollTop, viewportHeight, forceOnScroll) ->
      # only trigger onscroll for columns if the feeditem is visible in the viewport
      if viewportHeight >= @height
        @active = false
      else if scrollTop >= @top and scrollTop < @bottom
        @active = true
        column.onScroll(scrollTop, viewportHeight, @parent.settings.preventFixed) for column in @columns
      else if @active
        column.onScroll(scrollTop, viewportHeight, true) for column in @columns
        @active = false
      else if forceOnScroll
        column.onScroll(scrollTop, viewportHeight, true) for column in @columns

    recompute: ->
      @setDimensions()
      @setColumnMargins(column) for column in @columns
      column.setDimensions() for column in @columns

    setColumnMargins: (column) ->
      column.setMargins
        parentHeight : @height
        marginTop    : @marginTop
        marginBottom : @marginBottom
        marginLeft   : @left

    recomputeColumn: (index) ->
      return unless !@columns[index]
      @setColumnMargins @columns[index]

    resetColumnPositioning: -> column.setPosition('static') for column in @columns

    destroy: -> column.destroy() for column in @columns

    hasColumns: -> @$columns?.length > 1



  class Feed extends Base

    feedItems: []
    requires: ['feedItems']
    hasFocus: true
    scrollSpeedThreshold: 500

    defaults:
      active: true
      rendered: false
      preventFixed: false

    constructor: (@el, @settings) ->
      @$el = $(@el)
      throw "You must pass settings" unless @settings?
      throw "PopLockIt must be called on one element" unless @$el?.length == 1
      super(@$el, @settings)

      @$window = $(window)
      @settings = $.extend @defaults, @settings
      @settings.active = true
      @initRequestAnimationFrame()
      @viewportHeight = @$window.outerHeight(true)
      @$el.css
        'box-sizing': 'border-box' # to make dimensions measurements consistent across different sites
        overflow    : 'hidden'

      @addFeedItems @settings.feedItems
      @requestAnimationFrame()
      @

    onScroll: ->
      return unless @settings.active
      scrollTop = @$window.scrollTop()

      if scrollTop == @previousScrollTop
        return @requestedAnimationFrame = window.requestAnimationFrame (=> @onScroll())

      for item in @feedItems
        # run onscroll for all feeditems if scrolltop is very different from prev scroll top (user scrolled very fast)
        item.onScroll(scrollTop, @viewportHeight, Math.abs(scrollTop - @previousScrollTop) > @scrollSpeedThreshold)

      @previousScrollTop = scrollTop

      # run onscroll cont
      @settings.onScroll(scrollTop) if @settings.onScroll?

      @requestAnimationFrame()

    # recomputes height / top / bottom etc of each feed item and its columns
    recompute: ->
      @settings.active = true
      feedItem.recompute() for feedItem in @feedItems

      scrollTop = @$window.scrollTop()

      for item in @feedItems
        item.onScroll scrollTop, @viewportHeight, false

    recomputeItem: (index) ->
      return unless @feedItems[index]
      @feedItems[index].recompute()

    recomputeItemColumn: (index, columnIndex) ->
      return unless @feedItems[index]
      @feedItems[index].recomputeColumn columnIndex

    destroy: ->
      @settings.rendered = false
      @settings.active = false
      $.data @$el, "plugin_#{pluginName}", false

      if feedItems?.length
        item.destroy() for item in @feedItems

      @feedItems = []

    stop: ->
      @settings.active = false
      window.cancelAnimationFrame @requestedAnimationFrame

    start: ->
      @settings.active = true
      window.cancelAnimationFrame @requestedAnimationFrame
      @requestedAnimationFrame = window.requestAnimationFrame (=> @onScroll())


    addFeedItems: ($feedItems) ->
      throw "You must pass $feedItems" unless $feedItems? and $feedItems.length
      # jQuery map - returns a $(array) instead of a real array
      $feedItems.map (index, el) =>
        @feedItems.push(new FeedItem $(el), @settings, index, @)

    requestAnimationFrame: -> @requestedAnimationFrame = window.requestAnimationFrame (=> @onScroll())

    # from underscore.js
    debounce: (func, wait) ->
      timeout = 0
      return ->
        args = arguments
        throttler = =>
          timeout = null
          func args

        clearTimeout timeout
        timeout = setTimeout(throttler, wait)

    # http://paulirish.com/2011/requestanimationframe-for-smart-animating/
    # requestAnimationFrame polyfill by Erik Moller
    # fixes from Paul Irish and Tino Zijdel
    initRequestAnimationFrame: ->
      return if window.requestAnimationFrame

      lastTime = 0
      vendors = ['ms', 'moz', 'webkit', 'o']
      for vendor in vendors when not window.requestAnimationFrame
        window.requestAnimationFrame = window["#{vendor}RequestAnimationFrame"]
        window.cancelAnimationFrame = window["{vendor}CancelAnimationFrame"] or window["{vendors}CancelRequestAnimationFrame"]

      unless window.requestAnimationFrame
        window.requestAnimationFrame = (callback, element) ->
          currTime = new Date().getTime()
          timeToCall = Math.max(0, 16 - (currTime - lastTime))
          id = window.setTimeout((-> callback(currTime + timeToCall)), timeToCall)
          lastTime = currTime + timeToCall
          id

      unless window.cancelAnimationFrame
        window.cancelAnimationFrame = (id) -> clearTimeout(id)



  $.fn[pluginName] = (options) ->
    if !$.data(@, "plugin_#{pluginName}")
      throw "You must pass settings" unless options?
      $.data(@, "plugin_#{pluginName}", new Feed(@, options))
    else if $.data(@, "plugin_#{pluginName}")[options]?
      $.data(@, "plugin_#{pluginName}")[options] Array::slice.call(arguments, 1)[0], Array::slice.call(arguments, 1)[1]
    else
      throw "Method '#{options}' does not exist on jQuery.popLockIt"

)(jQuery, window, document)

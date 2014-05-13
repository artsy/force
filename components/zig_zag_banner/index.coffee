_         = require 'underscore'
Backbone  = require 'backbone'
template  = -> require('./template.jade') arguments...
Cookies   = require 'cookies-js'

module.exports = class ZigZagBanner extends Backbone.View
  className: 'zig-zag-banner'

  segmentTransitionLength: 300

  events:
    'click .zzb-close' : 'close'

  template: template

  initialize: (options = {}) ->
    { @name, @$target, @message, @persist } = _.defaults(options, persist: true)

    unless @name and @$target and @message
      throw new Error('You must pass a name, $target, and message')

    if @persist
      if Cookies.get("zig_zag_#{@name}")?
        # Has already seen this... ignore
        return @remove()
      else
        # Will see this once until cookie expires
        oneYearFromNow = new Date()
        oneYearFromNow.setYear oneYearFromNow.getFullYear + 1
        Cookies.set "zig_zag_#{@name}", true, expires: oneYearFromNow

    @transitionIn()

  render: ->
    @$el.html @template(message: @message)
    @$target.css('position', 'relative') if @$target.css('position') is 'static'
    @$target.append @$el

    @$one     = @$('.zzb-one')
    @$two     = @$('.zzb-two')
    @$three   = @$('.zzb-three')

    @verticallyCenter()

  verticallyCenter: ->
    existingMargin  = parseInt(@$el.css 'marginTop')
    offset          = @$target.outerHeight() / 2
    newMargin       = offset + existingMargin

    @$el.css marginTop: newMargin

  transitionIn: ->
    @render()
    _.defer =>
      @$one.addClass 'is-in'
      _.delay =>
        @$two.addClass 'is-in'
        _.delay =>
          @$three.addClass 'is-in'
        , @segmentTransitionLength
      , @segmentTransitionLength

  transitionOut: ->
    dfd = $.Deferred()
    @$three.removeClass 'is-in'
    _.delay =>
      @$two.removeClass 'is-in'
      _.delay =>
        @$one.removeClass 'is-in'
        _.delay =>
          dfd.resolve()
        , @segmentTransitionLength
      , @segmentTransitionLength
    , @segmentTransitionLength
    dfd.promise()

  close: (e) ->
    e.preventDefault()
    e.stopPropagation()
    @transitionOut().then =>
      @remove()

_ = require 'underscore'
Backbone = require 'backbone'
template = -> require('./template.jade') arguments...
Cookies = require 'cookies-js'

module.exports = class ZigZagBanner extends Backbone.View
  className: 'zig-zag-banner'

  segmentTransitionLength: 300

  events:
    'click .zzb-close': 'close'

  template: template

  initialize: (options = {}) ->
    { @name, @$target, @message, @persist, @backwards } = _.defaults(options, persist: true)

    unless @name and @$target and @message
      throw new Error('You must pass a name, $target, and message')

    if @backwards
      @$el.addClass('zig-zag-backwards').css "margin-left": @$target.width()

    if @persist
      if Cookies.get("zig_zag_#{@name}")?
        # Has already seen this... ignore
        return @remove()
      else
        # Will see this once until cookie expires
        Cookies.set "zig_zag_#{@name}", true, expires: 60 * 60 * 24 * 365

    @transitionIn()

  render: ->
    @$el.html @template(message: @message)
    @$target.css('position', 'relative') if @$target.css('position') is 'static'
    @$target.append @$el

    @$one = @$('.zzb-one')
    @$two = @$('.zzb-two')
    @$three = @$('.zzb-three')

    @verticallyCenter()

  verticallyCenter: ->
    existingMargin = parseInt(@$el.css 'marginTop')
    offset = @$target.outerHeight() / 2
    newMargin = offset + existingMargin
    @$el.css marginTop: newMargin

  sequence: (arr) ->
    _.map arr, (fn, i) =>
      dfd = $.Deferred()
      _.delay =>
        dfd.resolve fn()
      , (@segmentTransitionLength * (i + 1))
      dfd.promise()

  transitionIn: ->
    @render()
    _.defer =>
      @sequence [
        => @$one.addClass 'is-in'
        => @$two.addClass 'is-in'
        => @$three.addClass 'is-in'
        => @$el.addClass 'is-done'
      ]

  transitionOut: ->
    dfd = $.Deferred()
    @sequence([
      => @$el.removeClass 'is-done'
      => @$three.removeClass 'is-in'
      => @$two.removeClass 'is-in'
      => @$one.removeClass 'is-in'
    ]).then dfd.resolve
    dfd.promise()

  close: (e) ->
    e?.preventDefault()
    e?.stopPropagation()
    @transitionOut().then =>
      @remove()

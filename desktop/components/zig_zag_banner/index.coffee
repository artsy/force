_ = require 'underscore'
Backbone = require 'backbone'
Cookies = require 'cookies-js'
template = -> require('./template.jade') arguments...

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
      @$el.addClass('zig-zag-backwards').css marginLeft: @$target.outerWidth()

    if @persist
      if Cookies.get(@cookieName())?
        # Has already seen this... ignore
        return @remove()
      else
        # Will see this once until cookie expires
        Cookies.set @cookieName(), true, expires: 60 * 60 * 24 * 365

    @transitionIn()

  cookieName: ->
    "zig_zag_#{@name}"

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

  delay: (cb) ->
    _.delay cb, @segmentTransitionLength

  transitionIn: (cb) ->
    @render()
    _.defer =>
      @delay =>
        @$one.addClass 'is-in'
        @delay =>
          @$two.addClass 'is-in'
          @delay =>
            @$three.addClass 'is-in'
            @delay =>
              @$el.addClass 'is-done'
              @delay(cb) if cb?

  transitionOut: (cb) ->
    @delay =>
      @$el.removeClass 'is-done'
      @delay =>
        @$three.removeClass 'is-in'
        @delay =>
          @$two.removeClass 'is-in'
          @delay =>
            @$one.removeClass 'is-in'
            @delay(cb) if cb?

  close: (e) ->
    e?.preventDefault()
    e?.stopPropagation()
    @transitionOut =>
      @remove()

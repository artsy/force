module.exports = class MobileDropdownMenu
  active: false

  constructor: ->
    @$el = $('#main-header-menu-small-screen')
    @height = @$el.outerHeight()

  enable: ->
    @$el.css 'transform', "translate3d(0, 0, 0)"
    @$el.addClass 'is-active'
    @active = true

  disable: ->
    @$el.css 'transform', 'translate3d(0, -100%, 0)'
    setTimeout (=> @$el.removeClass 'is-active'), 200
    @active = false

  toggle: ->
    if @active then @disable() else @enable()

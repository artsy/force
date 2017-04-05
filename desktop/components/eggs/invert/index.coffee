Cookies = require '../../cookies/index'

class Inverter
  key: 'is-inverted'
  i: 73

  constructor: ->
    $(document).keydown (e) =>
      if e.ctrlKey and e.shiftKey and e.which is @i
        @toggle()

  init: ->
    @enable() if @enabled()

  enabled: (state) ->
    Cookies.get(@key) is '1'

  enable: ->
    (@$el ?= $('html')).addClass @key
    Cookies.set @key, '1'

  disable: ->
    (@$el ?= $('html')).removeClass @key
    Cookies.set @key, '0'

  toggle: ->
    if @enabled() then @disable() else @enable()

module.exports = ->
  new Inverter().init()

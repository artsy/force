Cookies = require '../cookies/index'
open = require './client/index'

module.exports =
  key: key = 'confirmation_modal'

  register: (data) ->
    Cookies.set key, JSON.stringify data
    data

  clear: clear = ->
    Cookies.expire key

  isRegistered: ->
    Cookies.get(key)?

  check: ->
    data = Cookies.get key
    return unless data?
    open JSON.parse data
    clear()

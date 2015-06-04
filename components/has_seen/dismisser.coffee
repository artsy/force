_ = require 'underscore'
Cookies = require '../cookies/index.coffee'

module.exports = class Dismisser
  defaults:
    limit: 5
    expires: 31536000 # 1 Year

  constructor: (options = {}) ->
    { @name, @limit, @expires } = _.defaults options, @defaults

  tick: =>
    return if @dismissed()
    @persist @get() + 1

  persist: (n) ->
    Cookies.set @name, n, expires: @expires

  get: ->
    parseInt(Cookies.get @name) or 0

  dismiss: =>
    @persist @limit

  dismissed: ->
    @get() >= @limit

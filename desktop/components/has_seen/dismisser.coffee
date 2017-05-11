_ = require 'underscore'
Cookies = require '../cookies/index.coffee'

# Get around inabilty to stub `document`
domain = document.domain if typeof document isnt 'undefined'

module.exports = class Dismisser
  defaults:
    limit: 5
    expires: 31536000 # 1 Year
    domain: domain

  constructor: (options = {}) ->
    { @name, @limit, @expires, @domain } = _.defaults options, @defaults

  tick: =>
    return if @dismissed()
    @persist @get() + 1

  persist: (n) ->
    Cookies.set @name, n, expires: @expires, domain: @domain

  get: ->
    parseInt(Cookies.get @name) or 0

  dismiss: =>
    @persist @limit

  dismissed: ->
    @get() >= @limit

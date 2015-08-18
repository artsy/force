_ = require 'underscore'
Cookies = require '../cookies/index.coffee'

module.exports = class Logger
  name: 'inquiry-questionnaire-log'

  expires: 31536000

  constructor: ->
    unless (logged = @get())?
      @reset()

  reset: ->
    @set []

  log: (step) ->
    logged = @get()
    logged.push step
    @set(_.uniq logged)

  get: ->
    JSON.parse(Cookies.get(@name) or '[]')

  set: (value) ->
    Cookies.set @name, JSON.stringify(value), expires: @expires

  hasLogged: (step) ->
    _.contains @get(), step

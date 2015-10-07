_ = require 'underscore'
Cookies = require '../cookies/index.coffee'

module.exports = class Logger
  expires: 31536000

  session: []

  constructor: (name) ->
    throw new Error 'requires name' unless name?

    @name = name

    unless (logged = @get())?
      @reset()

  reset: ->
    @set []

  log: (step) ->
    logged = @get()
    logged.push step
    @session.push step
    @session = _.uniq @session
    @set(_.uniq logged)

  unlog: (steps...) ->
    @set _.without(@get(), steps...)

  get: ->
    JSON.parse(Cookies.get(@name) or '[]')

  set: (value) ->
    Cookies.set @name, JSON.stringify(value), expires: @expires

  __hasLogged__: (arr, steps...) ->
    _.every _.map steps, (step) ->
      _.contains arr, step

  hasLogged: (steps...) ->
    @__hasLogged__ @get(), steps...

  hasLoggedThisSession: (steps...) ->
    @__hasLogged__ @session, steps...

  hasLoggedAnythingThisSession: ->
    @session.length > 0

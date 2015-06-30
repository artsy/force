_ = require 'underscore'
Backbone = require 'backbone'

module.exports = class State extends Backbone.Model
  defaults:
    moves: 0
    position: 0
    steps: null
    views: null
    decisions: null

  current: ->
    return unless @has('steps') and _.isArray(@get 'steps')

    current = @get('steps')[@get 'position']

    if _.isObject current
      [key, outcomes] = @split current
      decision = @decide key
      steps = outcomes[decision]

      @set steps: steps, position: 0
      @current()
    else
      current

  split: (obj) ->
    [_.first(_.keys obj), _.first(_.values obj)]

  inject: ->
    @__inject__ = arguments

  decide: (key) ->
    @get('decisions')[key](@__inject__...)

  next: ->
    @set('moves', (@get('moves') + 1))
    @set('position', @get('position') + 1) unless @isEnd()
    @trigger 'next'
    @current()

  total: ->
    offset = @get('moves') - @get('position')
    @get('steps').length + offset

  position: ->
    @get('moves') + 1

  isEnd: ->
    @get('position') is @end()

  end: ->
    @get('steps').length - 1

  view: ->
    views = @get('views')
    new views[@current()] arguments...

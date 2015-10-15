_ = require 'underscore'
Backbone = require 'backbone'

module.exports = class State extends Backbone.Model
  defaults:
    moves: 0
    position: 0
    steps: null
    views: null
    decisions: null

  initialize: (attributes, options = {}) ->
    @inject state: this
    super

  current: ->
    return unless @has('steps') and _.isArray(@get 'steps')

    current = @get('steps')[@get 'position']

    if _.isObject current
      [key, outcomes] = @split current

      rest = @get('steps')[@get('position') + 1...]
      decision = @decide key
      steps = (outcomes[decision] or []).concat(rest or [])

      @set steps: steps, position: 0
      @current()
    else
      current

  split: (obj) ->
    [_.first(_.keys obj), _.first(_.values obj)]

  context: {}

  inject: (context) ->
    _.extend @context, context

  decide: (key) ->
    @get('decisions')[key](@context)

  next: ->
    @set('moves', (@get('moves') + 1))
    @set('position', @get('position') + 1) unless @isEnd()
    current = @current()
    @trigger 'next', current
    current

  total: ->
    offset = @get('moves') - @get('position')
    @get('steps').length + offset

  position: ->
    @get('moves') + 1

  isEnd: ->
    @get('position') is @end()

  end: ->
    @get('steps').length - 1

_ = require 'underscore'
Backbone = require 'backbone'

module.exports = class State extends Backbone.Model
  defaults:
    position: 0
    steps: null
    views: null
    predicates: null

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

  objectify: (key, value) ->
    _.tap({}, (hsh) -> hsh[key] = value)

  decide: (key) ->
    @get('predicates')[key]()

  next: ->
    @set('position', @get('position') + 1) unless @isEnd()
    @current()

  isEnd: ->
    @get('position') is @end()

  end: ->
    @get('steps').length - 1

  inject: (decision, deps...) ->
    fn = @get('predicates')[decision]
    predicate = @objectify decision, _.partial(fn, deps...)
    @set 'predicates', _.extend {}, @get('predicates'), predicate

  view: ->
    views = @get('views')
    new views[@current()] arguments...

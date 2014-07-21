Backbone = require 'backbone'
_ = require 'underscore'
mediator = require '../../../lib/mediator.coffee'
require 'annyang'

module.exports = class AnnyangView extends Backbone.View

  initialize: (options) ->
    if annyang
      { @artwork } = options
      events = {
        'skrillex': @triggerSkrillex
        'go to *term': @onPath
        'go back': @goBack
      }
      annyang.addCommands(events)
      annyang.start()

  goBack: ->
    window.history.back()

  triggerSkrillex: ->
    mediator.trigger 'search:skrillex'

  onPath: (term) ->
    words = term.split(' ')
    route = words[0]
    slug = _.slugify(words.slice(1, words.length).join(' '))
    if route is 'profile'
      window.location = "/#{slug}"
    else
      window.location = "/#{route}/#{slug}"

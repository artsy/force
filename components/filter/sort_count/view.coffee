_ = require 'underscore'
Backbone = require 'backbone'
template = -> require('./template.jade') arguments...
mediator = require '../mediator.coffee'

module.exports = class FilterSortCount extends Backbone.View

  initialize: (options) ->
    _.extend @, options
    @locals ?= {}
    mediator.on 'counts', (counts) =>
      @locals.total = counts.total
      @render()
    @render()

  render: ->
    @$el.html template(@locals)

  events:
    'click .bordered-pulldown-options a': 'sort'

  sort: (e) ->
    mediator.trigger 'filter', { sort: $(e.target).data('sort') }
    @locals.pulldownVal = $(e.target).text()
    @render()
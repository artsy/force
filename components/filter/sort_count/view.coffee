_ = require 'underscore'
Backbone = require 'backbone'
template = -> require('./template.jade') arguments...

module.exports = class FilterSortCount extends Backbone.View

  initialize: (options) ->
    _.extend @, options
    @locals ?= {}
    @counts.on 'sync', =>
      @locals.total = @counts.get('total')
      @render()
    @render()

  render: ->
    @$el.html template(@locals)

  events:
    'click .bordered-pulldown-options a': 'sort'

  sort: (e) ->
    @params.set sort: $(e.target).data('sort')
    @locals.pulldownVal = $(e.target).text()
    @render()
_ = require 'underscore'
Backbone = require 'backbone'
mediator = require '../../../lib/mediator'
template = -> require('../templates/select.jade') arguments...

module.exports = class SelectView extends Backbone.View
  className: 'garamond-select select-group'
  tagName: 'label'
  events:
    'change select': 'onSelectChange'

  #
  # @$container - where this view will be appended
  # @name - used to the $el id
  # @label - e.g. 'Medium' or 'Price'
  # @filterOptions - an array of options for the select box
  # @filterParam - what value this will update, e.g. price_range
  # @sort - the option to be selected by default, e.g. All
  #
  initialize: ({ @$container, @name, @label, @filterOptions, @filterParam, @sort }) -> #

  render: ->
    @$el.html template
      options: @filterOptions
      label: @label
      sort: @sort
    this

  onSelectChange: (e) ->
    value = @$('select').val()
    label = @$('option:selected').text()
    mediator.trigger 'select:changed',
      value: value
      label: label
      name: @name
      filterParam: @filterParam

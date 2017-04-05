_ = require 'underscore'
Backbone = require 'backbone'
mediator = require '../../../lib/mediator'
SelectView = require '../../select/client/select_view'
template = -> require('./template.jade') arguments...

module.exports = class DropdownView extends SelectView
  render: ->
    @$el.html template
      options: @filterOptions
      label: @label
      sort: @sort
    this

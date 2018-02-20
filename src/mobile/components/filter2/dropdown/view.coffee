_ = require 'underscore'
Backbone = require 'backbone'
mediator = require '../../../lib/mediator.coffee'
SelectView = require '../../select/client/select_view.coffee'
template = -> require('./template.jade') arguments...

module.exports = class DropdownView extends SelectView
  render: ->
    @$el.html template
      options: @filterOptions
      label: @label
      sort: @sort
    this

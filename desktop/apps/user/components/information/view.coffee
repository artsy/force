{ extend } = require 'underscore'
GenericFormView = require '../generic_form/view'
template = -> require('./index.jade') arguments...

module.exports = class InformationView extends GenericFormView
  className: 'settings-information'

  render: ->
    @$el.html template
      user: @user
    this

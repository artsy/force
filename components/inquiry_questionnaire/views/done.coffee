StepView = require './step.coffee'

module.exports = class Done extends StepView
  className: 'iq-loadable is-loading'

  template: -> ''

  initialize: ({ @state }) ->
    @state.trigger 'done'
